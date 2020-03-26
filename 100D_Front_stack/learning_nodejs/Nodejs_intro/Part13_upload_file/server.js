/* 
因為我們要在 upload() 中對上傳的檔案進行處理
這樣的話，我們就需要將 request 物件傳遞給 formidable的form.parse函數。

但在 part10 之後，我們傳遞至 requestHandler.js 的主要參數只有 response 與 postData 物件
所以若要在 requestHandler.js 的函數中，處理上傳的檔案，就只能連 request 物件也一起傳入

到這裡，我們將postData從 server.js 以及 requestHandler.js 中移除

我們從 server.js 開始 —— 移除對postData的處理以及request.setEncoding (這部分 formidable 自身會處理)，
轉而採用將 request 物件傳遞給請求路由的方式
*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;