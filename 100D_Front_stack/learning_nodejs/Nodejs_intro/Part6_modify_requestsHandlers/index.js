/* 
index.js 為主程式
Part6 我們將修改 requestHandlers.js
因為它掌控了不同頁面該做出的行為，所以將透過它，
讓不同頁面有不同的顯示(在Part5的時候各頁面都是 Hello World)
呈現畫面的工作在這個 part 是交給 server.js

但這樣的方式違反了 non-Blocking 的想法，在 part7 中可以看到
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
