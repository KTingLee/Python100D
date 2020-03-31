// 讀寫資料的 model

var fs = require("fs");

// 寫入訂單
exports.saveOrder = function(userNum, userMeal){
    fs.writeFile('./orderData/' + userNum + ".txt", JSON.stringify(userMeal), function(err){
        if(err){
            console.log('寫入文件失敗！')
        }
    })
}

// 讀取某份訂單
// readFile 為異步函數，所以不能用 return，因此在 readOrder 的參數中加上 callback
// 當 readFile 後，就會把結果放進 callback
exports.readOrder = function(userNum, callback){
    fs.readFile('./orderData/' + userNum + ".txt", function(err, orderData){
        if(err){
            callback(-1)
            return;
        }
        // 讀取若成功，就將訂單內容放進 callback 中
        callback(orderData.toString())
    })
}

// 獲得文件夾中所有訂單名稱，一樣用異步語句
var all = exports.getAllOrderName = function(callback){
    fs.readdir('./orderData/', function(err, allNameArr){
        if(err){
            throw new Error("獲取所有文件名稱失敗了...")
        }
        else{
            // 去掉檔案副檔名(去掉.txt)，用 substr 擷取
            var resultArr = [];
            for (let i = 0; i < allNameArr.length; i++){
                // push 就像 Python 的 append
                resultArr.push(allNameArr[i].substr(0, allNameArr[i].length - 4))
            }

            callback(resultArr)        
        }
    })
    
}

// 單元測試(例如 getAllOrderName 前方做了變數宣告)
// 在欲測試的函數前方加上變數宣告，例如 var save = exports.saveOrder = ...
// save('55688', '我愛大屁屁')
// read('55688', function(Info){console.log(Info)})
// all(function(allName){console.log(allName)})
