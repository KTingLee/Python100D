// 調派、使用函數的模組

var db = require("../models/db.js")
var formidable = require("formidable")


// 首頁
function showIndex(req, res){
    // 從資料庫中讀取學生資料
    db.getStudent(function(allStudent){
        if(allStudent == -1){
            console.log("讀取失敗")
            return;
        }
        // 將學生資料傳至 ejs 模板
        res.render("index",{
            "allStudent" : allStudent
        });
    });
};


// 為了讓前端使用 Ajax 讀取數據，所以要做一個接口
function Ajax_allStudent(req, res){
    // 從資料庫中讀取學生資料
    db.getStudent(function(allStudent){
        // res.json 是 express 框架的一個語句，能在頁面上輸出 json 資料
        // 輸出的資料放在 allStudent 屬性
        res.json({"allStudent":allStudent})
    });
}


// 增加學生頁面
function showAdd(req, res){
    res.render("addPage")
}


// 前端藉由 Ajax 將學生資料以 post 請求傳給後端。
// 此處將資料傳入數據庫
function addStudent(req, res){
    // 使用 formidable 獲得 post 表單內容
    const form = formidable({ multiples: true });

    // 學生資料屬於文本資料，所以放在 fileds
    form.parse(req, function(err,fields,files){
        // 因為 Ajax 傳來的年齡會變成字串，所以將其轉為整數
        fields.Age = parseInt(fields.Age)
        // 將數據傳入資料庫。 addStudent 函數會以回呼函數回傳 1 或 -1 以說明添加成功與否
        db.addStudent(fields, function(result){
            if (result == 1){
                res.send("1")
            }else{
                res.send("-1")
            }

        })

    });

}


exports.showIndex = showIndex;
exports.Ajax_allStudent = Ajax_allStudent
exports.showAdd = showAdd
exports.addStudent = addStudent