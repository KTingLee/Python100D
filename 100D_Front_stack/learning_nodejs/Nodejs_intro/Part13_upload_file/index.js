/* 
part13 學習如何上傳檔案(在 part11 中，僅傳遞文字而已)

在 /start 頁面中，增加一個檔案上傳元素
並將 formidable 整合到我們的 upload 請求處理程序中，藉此將上傳的圖片儲存到 /tmp/test.png
最後將上傳的圖片內嵌到 /uploadURL 輸出的 HTML 中
*/

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// 新增一個路由 "/show"，該頁面會執行 requestHandlers.js 的 show()
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);