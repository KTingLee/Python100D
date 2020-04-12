/*
與超級使用者有關的模組
*/

var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var xlsx = require("node-xlsx");
var Student = require("../models/Student.js")
var url = require("url")


// 超級使用者首頁 (路徑是相對 views)
exports.showAdmin = function(req, res){
    res.render("admin/index", {
        "page"  : "index",
        "level" : "admin"
    })
}

// 超級使用者學生清單頁面(主頁面)
exports.showAdminStudents = function(req, res){
    // 分析學生清單的接口是 所有學生資料 還是 分批的學生資料
    var AjaxImport = '';
    if(url.parse(req.url, true).query.Ajax){
        AjaxImport = url.parse(req.url, true).query.Ajax;
    }else{
        AjaxImport = false;
    }
    res.render("admin/adminStudents", {
        // 分析是否為 Ajax 
        "AjaxImport" : AjaxImport,
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
            return;
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

// 超級使用者學生清單頁面的接口 (一口氣導出所有學生)
exports.showAdminAllStudents = function(req, res){
    Student.find({}, function(err, results){
        res.send(results)
    })
}

// 超級使用者學生清單頁面的接口 (依照前端請求的數量導出學生)
// 前端傳遞GET請求，路由例如 admin/students/partExport?_search=false&nd=1586593334266&rows=10&page=1&sidx=initpassword&sord=desc
// 解析此路由，以獲得對應的學生資料，再將其傳至 Ajax 接口
exports.showAdminPartStudents = function(req, res){
    // 解析GET請求
    var page = url.parse(req.url, true).query.page;  // 目前讀取的是第幾頁
    var rows = url.parse(req.url, true).query.rows; // 每頁要顯示幾筆資料
    var sidx = url.parse(req.url, true).query.sidx; // 以哪個 index 排序
    var sord = url.parse(req.url, true).query.sord; // 排序方式

    // 若採用升冪排序，則 sordNumber 為 1
    var sordNumber = sord == 'asc' ? 1 : -1;

    // 因為不能確定以哪個 index 排序，所以建立一個 JSON 物件，並附上屬性
    var sordObj = {};
    sordObj[sidx] = sordNumber;
    console.log(sordObj);

    // 依照前端要求，輸出對應的學生資料
    Student.count({}, function(err, count){
        var total = Math.ceil(count / rows);  // jqGrid 的總頁數(會根據 rows 而有所改變)

        // 輸出學生資料，格式必須依照 jqGrid 的 API 要求
        Student.find({}).sort(sordObj).limit(parseInt(rows)).skip(rows * (page-1)).exec(function(err, results){
            res.json({
                "page"    : page,
                "total"   : total,
                "records" : count,
                "rows"    : results
            });
        });
    });
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


