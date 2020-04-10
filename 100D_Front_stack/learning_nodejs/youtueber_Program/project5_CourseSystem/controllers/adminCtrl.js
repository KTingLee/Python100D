/*
與超級使用者有關的模組
*/

var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var xlsx = require("node-xlsx");
var Student = require("../models/Student.js")


// 超級使用者首頁 (路徑是相對 views)
exports.showAdmin = function(req, res){
    res.render("admin/index", {
        "page"  : "index",
        "level" : "admin"
    })
}

// 超級使用者學生清單頁面(主頁面)
exports.showAdminStudents = function(req, res){
    res.render("admin/adminStudents", {
        "page"  : "students",
        "level" : "admin"
    })
}

// 超級使用者學生清單頁面(導入學生頁面)
exports.showAdminStudentsImport = function(req, res){
    res.render("admin/adminStudentsImport", {
        "page"  : "students",
        "level" : "admin"
    })
}

// 超級使用者學生清單頁面(導入學生頁面 - 上傳學生資料)
// 上傳檔案記得要設置 存放文件的資料夾
exports.uploadStudentsExcel = function(req, res){
    // 這邊直接保留副檔名，就不需要像之前還要用 path.extname() 過濾
    const form = formidable({ multiples: true , keepExtensions: true});
    form.uploadDir = "./uploads"

    form.parse(req, (err, fields, files) => {
        if(!files.studentExcel){
            res.send("請上傳文件！")
        };

        // 檢查檔案是否為 excel，仍採用 path.extname 過濾
        if(path.extname(files.studentExcel.name) != ".xlsx"){
            // 但此時已經上傳至 upload 文件夾，所以再將其刪除(fs.unlink(path, callback))
            // 記住，fs 是根據終端機執行時的路徑
            fs.unlink("./" + files.studentExcel.path, function(){
                res.send("錯誤格式之文件已刪除，請上傳 excel 檔案！請重新整理")
            })
            return;
        }

        // 讀取該 excel 表格(同步語句，沒有回呼函數)
        var studentsData = xlsx.parse("./" + files.studentExcel.path)
        // 檢查是否含有六個年級的 sheet
        if(studentsData.length != 6){
            res.send("你上傳的 Excel 檔案，sheet 數量不正確。請重新整理")
            return;
        };
        // 檢查資料格式是否正確 學號、姓名、性別
        for(let i = 0; i < 6; i++){
            if(studentsData[i].data[0][0] != "學號" || studentsData[i].data[0][1] != "姓名"){
                res.send("第" + (i+1) + "張 sheet 的第一列錯了，格式必須為 學號、姓名。請重新整理")
                return;
            };
        }

        // 至此，Excel 資料已通過驗證，接下來就是將資料加入至資料庫
        // 但這項行為應該是徹底覆寫資料庫
        Student.importStudents(studentsData, function(mes){
            if(mes != 1){
                res.send("上傳失敗，請檢查學生格式、筆數是否無誤！請重新整理");
            }else{
                res.send("上傳成功，學生資料庫已改寫！")
            }
        })
    });
}

// 超級使用者學生清單頁面(導出學生頁面)
exports.showAdminStudentsExport = function(req, res){
    res.render("admin/adminStudentsExport", {
        "page"  : "students",
        "level" : "admin"
    })
}

// 超級使用者課程管理頁面
exports.showAdminCourses = function(req, res){
    res.render("admin/adminCourse", {
        "page"  : "courses",
        "level" : "admin"
    })
}

// 超級使用者報表頁面
exports.showAdminReports = function(req, res){
    res.render("admin/adminReports", {
        "page"  : "reports",
        "level" : "admin"
    })
}


