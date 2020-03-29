/*
使用 express 模組 2

採用 ejs 模板
ejs 不是模組，是模板，可以讓 html 使用變得更靈活

流程是
伺服端提供能使用的變數，並往 ejs 檔案傳，ejs 獲得變數後，使用之並呈現給前端。
*/


var express = require("express");
var app = express();

// 設置預設模板，透過 express 引入的
// ejs 是模板不是模組，但仍然透過 npm install 安裝的
app.set("view engine", "ejs");


// 設置首頁
app.get("/", function(req, res){
    // 因為引用的頁面搭配 ejs 語法，所以要用 render，將 ejs 語法部分做渲染
    // 這個頁面必須放在 views 資料夾，且副檔名為 ejs。引入時有沒有副檔名都沒關係
    res.render("08_a", {
        use_times : 1
    })
});


app.listen(3000, ()=>{console.log("Server running at 3000.")});

