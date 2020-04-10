/*
這篇與 04.js 類似，都是建立一個頁面，用來記錄前一次造訪過的頁面

只是這篇是採用 localStorage 的方式儲存紀錄；04.js 是採用 cookie 的方式儲存紀錄。

localStorage 與 cookie 使用上的差異在於，
localStorage 是直接在前端的 js 執行，將資料直接儲存在使用者的瀏覽器中(所以關閉就失效了)，與後端無關。
cookie 則是透過後端，發送 cookie 給前端，但 cookie 一樣是由前端保存(關閉也會失效)。

兩種方式都是，先讀取 前端的資料 -> 插入新的數據 -> 再儲存給前端
因為不論是 localStorage 或是 cookie 都會覆蓋前一次的值，所以只能用 讀取->插入->儲存 的方式。

唯一的不同在於，localStorage 是由前端 js 執行(也就是在使用者的電腦上執行)，
而 cookie 會透過伺服端執行。
*/


// 使用 localStorage 方式記錄使用者痕跡，與 cookie 無關

var express = require("express");
var app = express();

app.set("view engine", "ejs")

// 路由清單
// 首頁，顯示使用者瀏覽過的資料
app.get("/", function(req, res){
    res.render("03_a", {
    })
});

app.get("/:goCity", function(req, res){
    // 抓取 goCity 的內容
    var city = req.params.goCity;

    res.render("03_b", {
        "cityName" : city
    })

});


app.listen(3000, ()=>{ console.log("伺服器運行囉！") })


