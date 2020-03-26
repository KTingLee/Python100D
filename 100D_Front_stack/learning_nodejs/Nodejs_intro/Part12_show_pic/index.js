/* 
part12 要建立一個用來呈現圖片的新頁面(在 part11 中，僅傳遞文字而已)

我們會用到 Node.js 中著名的模組 formidable
該模組主要用來處理檔案的傳遞，要使用者個模組前，必須透過 npm 安裝
在 part12 的資料夾下，開啟終端機，並輸入
    npm install formidable
即可安裝

而這個 part 主要是學習怎麼把上傳檔案的內容顯示在瀏覽器中

連線至 http://localhost:3000/show 便可看到 tmp 中的 test.png
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