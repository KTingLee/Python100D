/*
本篇來簡單應用 session
*/

var express = require("express");
var app = express();
var formidable = require("formidable");

// 設定 session 會引用 express-session 模組
var session = require("express-session");

app.set("view engine", "ejs")


// 一樣採用 app.use() 使用 express-session，只是要加上一些設定值
app.use(session({
    secret : "mySession",  // session 的名稱
    cookie : { maxAge : 60000 },  // 設定 session 同時會給前端 cookie，未來依此 cookie 存取該 session，所以要設定 cookie 過期時間
    resave : false,
    saveUninitialized : true
}));


// 路由清單
app.get("/", function(req, res){
    // 判斷前端的 session 是否有 login 屬性
    if(!req.session.login){
        res.render("06_index", {})
    }else{
        res.send("登入成功")
    }
});

// 帳密表單提交是以 post 請求進行，所以用 formidable 處理表單
app.post("/login", function(req, res){
    // 帳密為文本，所以存放在 fileds 中
    const form = formidable({ multiples: true });     
        form.parse(req, (err, fields, files) => {
        // 檢驗是否符合登入帳密
        if(fields.userName == "root" && fields.password == "1234"){
            // 登入成功，為使用者設定 session(同時也會自動提供一組亂數產生的 cookie)
            req.session.login = true;
            res.send("登入成功，已記住你的 session，也發送一個 cookie 給你了！<a href='/'>回到上一頁</a>")
        }else{
            res.set('Content-Type', 'text/html')
            res.write("登入失敗，<a href='/'>回到上一頁</a>")
            res.end("")
        }
    })
})


app.listen(3000, ()=>{ console.log("伺服器運行囉！") });