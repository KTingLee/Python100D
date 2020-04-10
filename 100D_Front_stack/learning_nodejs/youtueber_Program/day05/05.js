/*
本篇要介紹 session

記得先安裝 express-session 模組。

session 實際上就是另一種形式的 cookie，在 04.js 中，我們利用 cookie-parser
讓後端回應前端時，順便夾帶 cookie，而這個 cookie 的內容是由後端以明確的方式提供(不論是 key 或 value)
例如  res.cookie("cookie_key", cookie_value)

而 session 則是透過 express-session 模組來操作，其中，session 只會是 req 物件的屬性，與 res 無關。

例如後端要為前端設定一個 session，可寫為
req.session.session_key = session_value;
在這段範例中，session，的操作都是發生在 req 物件，而 session_key 與 session_value可自定義。

而這個 session 就會暫存在伺服端的記憶體中。

此外，在為前端設定 session 的同時，伺服器也會回傳一組亂數產生的 cookie 給前端，這樣未來使用者拿著這組 cookie 訪問
伺服器時，伺服器就知道他的 session 為何
*/

var express = require("express");
var app = express();

// 設定 session 會引用 express-session 模組
var session = require("express-session");

// 一樣採用 app.use() 使用 express-session，只是要加上一些設定值
app.use(session({
    secret : "mySession",  // session 的名稱
    cookie : { maxAge : 60000 },  // 設定 session 同時會給前端 cookie，未來依此 cookie 存取該 session，所以要設定 cookie 過期時間
    resave : false,
    saveUninitialized : true
}));


// 路由清單
app.get("/", function(req, res){
    console.log(req.session)

    res.write("在發出請求後(連線至localhost:3000)，查看開發者模式 -> Network 中，可以看到請求表單中，Response Headers 會丟出一長串的 cookie")
    res.write("此時，你的 session 已經設定完成，例如可以看終端機，應該會跳出 session 物件的資料")
    res.write("未來再次進入這個頁面時，只要 cookie 還沒過期，那就只會看到相同的隨機數字(因為這組隨機數字被綁在 session 中了)")
    res.write("登入頁面的處理也是相同，你的資料會被寫在 session 中，而當登入成功後，短時間內不用再重新登入，也可以看到登入成功，這是因為你的 cookie 能找到對應的 session")

    // 判斷前端的 session 中是否有 a 屬性
    if(!req.session.a){
        req.session.a = parseInt(Math.random() * 1000);
    }

    res.send("隨機數字為" + req.session.a)
});



app.listen(3000, ()=>{ console.log("伺服器運行囉！") });