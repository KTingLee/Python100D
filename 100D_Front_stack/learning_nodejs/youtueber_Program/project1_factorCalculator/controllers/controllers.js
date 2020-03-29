/*
controller 主要用來指揮、執行封裝好的函數
*/
var factorCalculator = require("../models/factorCalculator.js");
var fileMethod = require("../models/fileMethod.js");



// 設置首頁的回呼函數，只是是用 ejs 文件做為首頁
// 所以要用 render，而不是 send
function showIndex(req, res){
    // render 的參數為 ejs 文件，預設是放在 views 資料夾，
    // ejs 副檔名可不加。大括號內放入要傳入 ejs 的變數名稱與值。
    res.render("index", {

    });
};


// 顯示結果頁面
// 計算結果會儲存在 public/factorResults
// 如果有計算過會直接讀取之前儲存的計算結果；若沒有計算過，則直接計算
function showResults(req, res){
    // getNumber 是因為 get 路由是用 getNumber 取 URL 的值
    var number = req.params.getNumber

    // 紀錄時間 t1
    var t1 = new Date();

    // 檢查是否有算過(看能不能讀取到)
    // load 定義時有一個參數 callback，也就是要傳入回呼函數
    // 所以傳入 number 後，匿名函數(下面的function(resultsArr))會等待 load 函數中的 callback 結果
    fileMethod.load(number, function(resultsArr){
        if (resultsArr == -1){
            // 表示沒有計算過，所以計算並儲存
            // 計算因數(此為同步語句)
            var resultsArr = factorCalculator.factorCalc(number);
            // 儲存
            fileMethod.save(number, resultsArr)
        }
        // 不用寫讀取的步驟，因為是先讀取，即 fileMethod.load(number, function(resultsArr){...}
        // 表示讀取 number 後，結果會傳入 resultsArr 中，在依據 resultsArr 的值決定是否要計算

        // 紀錄時間 t2
        var t2 = new Date();

        // 呈現結果
        res.render("results", {
            "number" : number,
            "resultsArr" : resultsArr,
            "useTime" : t2-t1
        });
    });


};


exports.showIndex = showIndex;
exports.showResults = showResults;