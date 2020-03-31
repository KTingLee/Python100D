/*
這是 MVC 的第二個專案，點餐系統
主頁面，用戶可以輸入電話、餐點
同時，有一個管理者畫面選項，點入後要輸入帳號密碼，輸入完成可以瀏覽所有點餐內容
*/

var controllers = require("./controllers/mainCtrl.js")
var express = require("express");
var app = express();

// 設置 ejs 模板
app.set("view engine", "ejs")

// 路由清單
app.get('/', controllers.showIndex);  // 首頁
app.post('/newOrder', controllers.newOrder);  // 處理訂單的路由
app.get('/superPage', controllers.showSuper);  // 管理員視窗
app.get('/allOrders', controllers.showAllOrders);  // 顯示所有訂單內容
app.get('/allOrders/:phoneNum', controllers.showOneOrder);  // 顯示其中一份訂單

// 建立靜態資源文件夾
app.use(express.static('./public'))

app.listen(3000, ()=>{console.log('訂餐系統啟動啦！')})