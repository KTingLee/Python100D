/* 
requestHandlers.js 說明了不同請求應該做出什麼樣的處理
例如 localhost/start 就觸發 start()、 localhost/upload 就觸發 upload()

而這邊把 response 作為參數傳入 start() 與 upload()

以實現真正的 non-Blocking 設計

也就是真正影響網頁輸出的是在這裡

而我們不將 exec("ls -lah"...) 的結果用 return 的方式後，可以看到
即使同時開啟 start 與 upload 頁面，後者也不會因為前者 Blocking 的操作而無法開啟
*/

var exec = require("child_process").exec;

// 把 response 物件作為參數傳入
function start(response) {
  console.log("Request handler 'start' was called.");

  // 尋找 D 槽下，副檔名為 abc 的檔案(連同子目錄也搜尋)，藉此來增加尋找時間
  exec('dir "D:\*.abc" /s', function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain;charset=big5"});
    response.write(stdout);
    response.end();
  });
}


function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;