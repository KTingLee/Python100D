/* 
我們利用 requestHandlers.js，讓不同頁面有不同的回應

並且回應內容是在 server.js 中載入
*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    // 建立 content 來接收 requestHandlers.js 的回傳結果
    var content = route(handle, pathname)
    // 讓頁面呈現結果
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;