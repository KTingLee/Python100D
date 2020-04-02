/*
第三個 MVC 專案，學生管理系統

增加學生一定是用 Ajax
*/

var ejs = require("ejs")
var express = require("express");
var controller = require("./controllers/mainCtrl.js")
var app = express();

// 指定模板
app.set("view engine", "ejs");


// 路由清單
app.get('/', controller.showIndex);  // 首頁
app.get('/allStudentData', controller.Ajax_allStudent)  // Ajax 的接口，前往 /allStudentData 就可以看到 Ajax 要使用的資料

app.get( '/addStudent', controller.showAdd)  // 增加學生頁面
app.post('/addStudent', controller.addStudent)  // 增加學生的 post 請求，同一個路由可供不同請求使用！



// 指定靜態資源資料夾
app.use(express.static('public'));

app.listen(3000, console.log("學生管理系統已經執行了！"))

