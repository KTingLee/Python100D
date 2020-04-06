/*
學習使用 mongoose 模組 - 將 collections 模組化

mongoose 模組本身帶有 mongodb，所以不需再安裝 mongodb 模組
在使用前，要先連上 mongodb 數據庫：mongod --dbpath 資料庫路徑

在前幾篇，有學過如何使用 mongoose，也知道說 mongoose 的語法看不見 mongodb 的痕跡
而之前都只有使用一個 collection，若是有多個 collection 呢？

這邊我們建立 models 資料夾，並將各個 collection 的應用獨立出來。

未來會練習選課系統，所以至少要有學生與課程 collection。
*/

// 引入模組
var mongoose = require("mongoose");
var Student = require("./models/Student.js");
var Course = require("./models/Course.js");
var tools = require("./models/tools.js")


// 資料庫的連線是讓主程式負責，最後的反斜線內容為"資料庫名稱"
mongoose.connect('mongodb://localhost/colleges', {useNewUrlParser: true});

/*
// 產生學生，先不考慮選擇的課程
var student_1 = new Student({
    "stu_id" : 123456,
    "Name" : "五百"
});

// 儲存學生資料至資料庫
student_1.save();

// 產生課程，先不考慮多少學生選擇
var course_1 = new Course({
    "c_id" : 2,
    "Name" : "微積分"
});

// 儲存課程資料至資料庫
course_1.save();
*/

tools.sign_course("123456", "1", function(info){console.log("info顯示:"+info)})
