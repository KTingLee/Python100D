/*
選課系統 - CourseSystem
*/

var express = require("express");
var app = express();
var mongoose = require('mongoose');
var session = require("express-session");
var adminCtrl = require("./controllers/adminCtrl.js");
var mainCtrl = require("./controllers/mainCtrl.js");

// 連結資料庫 - CourseSystem  (記得先打開數據庫)
mongoose.connect('mongodb://localhost/CourseSystem', {useNewUrlParser: true});

// 設定 session
app.use(session({
    secret : "yourSession",  // session 的名稱
    cookie : { maxAge : 60000 },  // 設定 session 同時會給前端 cookie，未來依此 cookie 存取該 session，所以要設定 cookie 過期時間
    resave : false,
    saveUninitialized : true
}));


// 設定模板
app.set("view engine", "ejs")

// 路由清單，同一個路由可以使用不同請求(這也叫 RESTful 風格)
// 若有 /student/add:var 這種用法，盡量放後面
app.get("/admin", adminCtrl.showAdmin);                   // 管理員頁面 - 首頁
app.get("/admin/students", adminCtrl.showAdminStudents);  // 管理員頁面 - 學生頁面(主頁面)
app.get("/admin/students/allExport",  adminCtrl.showAdminAllStudents);  // Ajax 接口 - 獲取所有學生資料
app.get("/admin/students/partExport", adminCtrl.showAdminPartStudents); // Ajax 接口 - 獲取部分學生資料
app.get("/admin/students/import", adminCtrl.showAdminStudentsImport);  // 管理員頁面 - 學生頁面(導入學生頁面)
app.post("/admin/students/import", adminCtrl.uploadStudentsExcel);     // 管理員頁面 - 學生頁面(導入學生頁面 - 上傳學生資料，並生成學生密碼)
app.get("/admin/courses",  adminCtrl.showAdminCourses);   // 管理員頁面 - 課程管理頁面
app.get("/admin/reports",  adminCtrl.showAdminReports);   // 管理員頁面 - 課程報表頁面










// 提供靜態資料夾，這樣 public 資料夾就等同於根目路(/)
app.use(express.static("public"))

// 設置 404 頁面，如果請求的路由沒有在路由清單也不在靜態資料夾，就會執行這段
app.use(mainCtrl.show404)


app.listen(3000, ()=>{console.log("選課系統啟動囉！")})

