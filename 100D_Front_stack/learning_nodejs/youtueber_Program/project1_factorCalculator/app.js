/*
這個程式碼是拿來計算因數的。

主要是用來練習MVC設計概念。
*/

// 引入 express 框架，方便設置路由
var express = require("express");
var app = express();

// 引入 controllers.js
var controllers = require("./controllers/controllers.js")

// 設置 ejs 模板，用來跟畫面 view 做溝通
app.set("view engine", "ejs");

// 路由清單
// 這邊只設置路由清單，路由清單的執行函數交給 controller 處理
// 首頁
app.get('/', controllers.showIndex);
// 顯示結果頁面，express 可設定冒號後方為變數名稱，並獲得其內容
// 例如 /123456，則 req.params.getNumber 的值為 123456
app.get('/:getNumber', controllers.showResults);





// 提供要做為靜態資料夾的路徑
app.use(express.static("public"));

app.listen(3000, ()=>{console.log("Server running!")})


