/* 
part10 來將網頁的功能完善，也就是使用者可以上傳圖片
而後端接收到圖片後，將其回應到網頁中。

這邊將會學習 POST 請求，用以傳遞私密資訊或是多媒體檔案。
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
