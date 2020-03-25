var server = require("./server");
// 引入新製作的模組
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// 建立現有的請求陣列(JSON格式)
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

// 注意，是 router 物件中的 route 函數
server.start(router.route, handle);