/* 
index.js 為主程式
Part8 在 part7 中說過，如果要減少 Blocking 問題，那就要採用 non-Blocking 方式編寫
在這部分，先來介紹錯誤的 non-Blocking 設計

在 requestHandlers.js 中，我們讓 start 頁面可以呈現搜尋結果，但不管怎麼搜尋都呈現 empty
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
