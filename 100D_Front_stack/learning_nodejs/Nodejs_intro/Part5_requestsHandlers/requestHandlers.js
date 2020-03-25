/* 
requestHandlers 用來說明伺服端接收到使用者哪種請求
一般我們會設定路由清單，也就是使用者能夠有效連線的網頁
每個網頁都有對應的執行函數，也可以多個頁面使用同一種執行函數
也就是多個頁面會做相同的動作
例如我們設定 / 與 /start 導向同一個頁面
*/

function start() {
  console.log("Request handler 'start' was called.");
}

function upload() {
  console.log("Request handler 'upload' was called.");
}

exports.start = start;
exports.upload = upload;