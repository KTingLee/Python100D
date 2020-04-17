/*
一般操作的模組
*/
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var xlsx = require("node-xlsx");
var url = require("url");
var mongoose = require("mongoose");
var Student = require("../models/Student.js");
var crypto = require("crypto");

// 顯示 404 頁面
exports.show404 = function(req, res){
    res.send("404 你的網頁不存在")
}


// 顯示首頁
exports.showIndex = function(req, res){
    // 檢查使用者身上是否有 session，若沒有就跳轉至登入頁面
    if(req.session.login != true){
        // 重定向
        res.redirect("/login");
        return;
    }else{
        // 從 session 中獲得使用者帳號、名稱以及是否為初始密碼
        var userID   = req.session.userID;
        var userName = req.session.userName;
        var initpassword = req.session.initpassword;

        // 若為初始密碼，則仍無法讀取首頁，必須強制跳轉到更改密碼頁面
        if(initpassword){
            res.redirect("/changePWD");
        }else{
            res.render("index", {
                "userID"   : userID,
                "userName" : userName
            })
        }
    }
}

// 顯示登入頁面
exports.showLogin = function(req, res){
    res.render("login",{})
}

// 登入內容會以 post 方式提交，所以用 formidable 處理
// 先驗證帳號是否存在，若有，則檢查密碼是否為初始密碼(initPassword 為 true 表示為初始密碼)
// 初始密碼直接比對即可
// 若為使用者設定之密碼，則將表單的密碼做加密後，在與資料庫比對(因為資料庫只會放加密過的)
exports.doLogin = function(req, res){
    const form  = formidable({ multiples: true , keepExtensions: true});
    form.parse(req, (err, fields, files) => {
        if(err){
            res.json({"results" : -1});  // -1 表示伺服器錯誤
            return;
        }
        var id  = fields.userID;
        var pwd = fields.userPassword;

        // 這邊應該可以放管理員密碼

        // 從學生資料庫檢查
        Student.find({"stu_id" : id}, function(err, results){
            if(err){
                res.json({"results" : -1});  // -1 表示伺服器錯誤
                return;
            }

            if(results.length == 0){
                res.json({"results" : -2});  // -2 表示沒有此學生
                return;
            }

            // 學生存在，則先檢查是否修改過密碼
            var thisStudent = results[0];
            var initpassword = thisStudent.initpassword;

            // 若為初始密碼，則直接比對
            if(initpassword){
                if(pwd === thisStudent.password){
                    // 密碼正確，下發一個 cookie 並保存其 session
                    req.session.login = true;
                    // 也可以再發其他東西至 session 中
                    req.session.userID = id;
                    req.session.userName = thisStudent.Name;
                    req.session.initpassword = initpassword;
                    // 記得要先發完 cooki 後才 res.send 或 res.json
                    res.json({"results" : 1});
                    return;
                }
                res.json({"results" : -3});  // -3 表示密碼錯誤
                return;
            }else{
                // 若不為初始密碼，則要進行加密驗證
                var secretPWD = crypto.createHash("sha256").update(pwd).digest("hex");
                if(secretPWD === thisStudent.password){
                    // 密碼正確，下發一個 cookie 並保存其 session
                    req.session.login = true;
                    // 也可以再發其他東西至 session 中
                    req.session.userID = id;
                    req.session.userName = thisStudent.Name;
                    req.session.initpassword = initpassword;
                    // 記得要先發完 cooki 後才 res.send 或 res.json
                    res.json({"results" : 1});
                    return;
                }
                res.json({"results" : -3});  // -3 表示密碼錯誤
                return;
            }
        })
    })
}


// 登出的方式就是將 session 拿掉
exports.doLogout = function(req, res){
    req.session.login = false;
    req.session.userID = '';

    res.redirect("/login")
    return;
}


// 顯示密碼更改頁面
exports.showChangePWD = function(req, res){
    var userID = req.session.userID;
    var userName = req.session.userName;
    var initpassword = req.session.initpassword;

    res.render("changePWD",{
        "userID"   : userID,
        "userName" : userName,
        "initpassword" : initpassword
    })
}


// 修改密碼的話，前端會發送新的密碼表單，後端也驗證完兩者一致後，才寫入資料庫(記得要加密寫入！)
// session 本身就帶著學號了，所以前端不需要再傳遞學號過來
exports.doChangePWD = function(req, res){
    const form  = formidable({ multiples: true , keepExtensions: true});
    form.parse(req, (err, fields, files) => {
        if(err){
            res.json({"results" : -1});  // -1 表示伺服器錯誤
            return;
        }
        var userID = req.session.userID;
        var pwd1 = fields.pwd1;
        var pwd2 = fields.pwd2;

        // 檢查密碼是否一致
        if(pwd1 === pwd2){
            Student.find({"stu_id" : userID}, function(err, data){
                if(err){
                    res.json({"results" : -1});  // -1 表示伺服器錯誤
                    return;
                }

                if(data.length == 0){
                    res.json({"results" : -2});  // -2 表示資料庫中沒有此帳號
                    return;
                }

                var thisStudent = data[0];
                // 對使用者輸入的密碼加密
                thisStudent.password = crypto.createHash("sha256").update(pwd1).digest("hex");
                // 將 initpassword 設置為 false，表示該使用者已經修改過密碼
                thisStudent.initpassword = false;
                // 寫入資料庫
                thisStudent.save();

                // 改一下 session.initpassword
                req.session.initpassword = thisStudent.initpassword;

                res.json({"results" : 1});  // 1 表示修改成功
                return;
            })
        }else{
            res.json({"results" : -3});  // -3 表示密碼不一致
            return;
        }
    })
}

