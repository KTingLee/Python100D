/* 
index.js 為主程式
Part7 我們基於 part6 的設置，要使用 non-Blocking 操作
所謂 Blocking 可以想做，程式遇到大量請求的時候，可能要處理一段時間
如果這段時間會使得其他程式無法順利運作，那就是 Blocking

例如我們在 requestHandlers.js 的 start() 中，加入 5 秒的等待

測試 Blocking 的方法就是，"同時" 並先開啟 
http://localhost:3000/start 再開啟 http://localhost:3000/upload
其中 start 頁面我們設置了等待5秒才輸出，而 upload 頁面是立即輸出

但結果會發現，start 要等待 5 秒，然而 upload 也會等待 5 秒。

原因是 start 頁面所要執行的 start() 必須等待 5 秒才會 return
因為採用 return 所以程式必須等待 start() 結束，若是用 call back 的方式，就不用
*/

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// 有效頁面存放在 handle 物件中，此物件為 json 格式
// 例如 key="/" 其 value=requestHandlers.start
// 也就是使用 requestHandlers.start()
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
