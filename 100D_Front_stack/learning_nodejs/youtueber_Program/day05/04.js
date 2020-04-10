/*
這篇與 03.js 相同，都是建立一個頁面，用來記錄前一次造訪過的頁面

只是這篇是採用 cookie 的方式儲存紀錄。

localStorage 與 cookie 使用上的差異在於，
cookie 是透過後端，在回應前端請求時，順便夾帶一個 cookie 給前端，但 cookie 一樣是由前端保存(關閉也會失效)。

兩種方式都是，先讀取 前端的資料 -> 插入新的數據 -> 再儲存給前端
因為不論是 localStorage 或是 cookie 都會覆蓋前一次的值，所以只能用 讀取->插入->儲存 的方式。

唯一的不同在於，localStorage 是由前端 js 執行(也就是在使用者的電腦上執行)，
而 cookie 會透過伺服端執行。
*/

var express = require("express");
var app = express();

// 解析 cookie 會引用 cookie-parser 模組，方便將 cookie 格式化
var cookieParser = require("cookie-parser");

// 採用 app.use() 使用 cookie-parser
app.use(cookieParser());

app.set("view engine", "ejs")

// 路由清單
app.get("/", function(req, res){
    // 讀取 cookie 內容
    var arr = req.cookies.cityHistory;
    console.log(arr)

    res.render("04_index", {
        "cityHistory" : arr
    })
});

app.get("/:goCity", function(req, res){
    // 讀取 cookie 內容
    // 以 cookie-parser 讀取 cookie，就不用像 localStorage 還要透過 JSON.parse() 轉成陣列
    var arr = req.cookies.cityHistory;
    if(!arr){
        arr = [];
    }

    // 插入新的 cookie
    var city = req.params.goCity;
    arr.push(req.params.goCity);

    // 傳遞新的 cookie 給前端
    // 以 cookie-parser 就不用再透過 JSON.stringify() 將陣列轉成 JSON 字串
    res.cookie("cityHistory", arr)

    res.render("04_b", {
        "cityName" : city
    })
});


app.listen(3000, ()=>{ console.log("伺服器運行囉！") })