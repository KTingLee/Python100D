/* 
index.js 為主程式
建立路由清單，也就是使用者有效連線頁面清單
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
