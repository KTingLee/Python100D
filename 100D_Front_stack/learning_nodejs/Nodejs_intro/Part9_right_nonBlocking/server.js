/* 
我們利用 requestHandlers.js，讓不同頁面有不同的回應

在 part9 前，回應內容是在 server.js 中載入
但為了做出真正的 non-Blocking，所以我們把 response物件 傳遞出去
而不是等內容傳過來之後才丟進 response

也就是說，這次我們讓 response 可以在其他回呼函數中被改寫
*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // 把 response 傳遞，可以看到在這行後面就沒有使用 response 了
    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;