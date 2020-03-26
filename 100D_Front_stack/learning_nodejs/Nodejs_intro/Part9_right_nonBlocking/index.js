/* 
index.js 為主程式
Part9 這次就來進行正確的 non-Blocking 設計
在 part8 使用了不正確的 non-Blocking 設計，但我們已經知道要用
non-Blocking 就會使用回呼函數的設計

而要做出真正的 non-Blocking 設計，就要好好利用回呼函數以及函數傳遞

我們已經知道伺服器的回應是放在 response 物件，所以我們就把這個物件 一層一層傳遞
而不是用 var content 再把結果 retern content

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
