/*
這個範例中，會學習如何讀取使用者的 cookie

這邊使用的框架為 express，而要透過 Node.js 讀取前端的 cookie，必須先安裝模組  cookie-parser

*/

var express = require("express");
var app = express();

var cookieParser = require("cookie-parser");

// 使用 cookie-parser 的方式，就像使用靜態資料夾一樣
// 是採用 app.use()
app.use(cookieParser());

// 路由清單
app.get("/", function(req, res){
    // 使用者連至 localhost:3000 後，伺服端回應，在回應中會夾帶 cookie 資料
    // 傳回給使用者的 cookie 內容，包含一個 "a" 屬性，其值為 100。 且有效時間為 900000 毫秒
    res.cookie("a", 100, { maxAge: 900000, httpOnly: true});

    // 使用 cookie-parser 後就可獲得 req.cookies
    console.log(req.cookies)

    res.write("打開開發者模式，會看到伺服端在 Response Headers 中，傳遞了 set-cookie 給瀏覽器。 日後，使用者在登入這個頁面時，都會帶著這份 cookie (前提是 cookie 還沒過期)")
    res.write("<br>")
    res.write("重新整理後，一樣打開開發者模式，會在 Requset Headers 中，看到自己身上會帶著一份 cookie，這就是剛剛伺服器傳遞過來的。")
});


app.listen(3000, ()=>{ console.log("伺服器運行囉！") })