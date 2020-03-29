var fs = require("fs");

// 儲存結果
function save(number, resultsArr){
    // fs 寫入檔案是相對於主程式執行位置
    // 記得 writeFile 也會用到回呼函數
    fs.writeFile('./factorData/' + number + '.txt', JSON.stringify(resultsArr), function(err){
        if(err){
            return console.log(err);
        }
    });
    console.log(resultsArr)
};


// 讀取結果(讀取是異步函數，所以不能用 return 回傳，而是用回呼函數傳)
// 所以有多一個參數 callback，表示使用該函數的方法必須提供一個參數接收 callback 的結果
function load(number, callback){
    // fs 讀取檔案是相對於主程式執行位置
    // 當讀取成功後執行匿名函數
    fs.readFile('./factorData/' + number + '.txt', function(err, data){
        if(err){
            callback(-1);  // 用回呼函數把結果以參數方式傳出
            return;  // 用 return 就不會往下做
        }
        callback(JSON.parse(data));
    })
};



exports.save = save;
exports.load = load;
