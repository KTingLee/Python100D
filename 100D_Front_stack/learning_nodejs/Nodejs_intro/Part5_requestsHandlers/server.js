/* 
新增分析使用者提出的請求(request)
request 物件中包含 url 屬性，即使用者要前往的網址
可透過 url 模組的方法 url.parse() 分析網址

新增的部分，主用意是為了建立路由功能，所以先將資訊整理好
*/

var http = require("http");
var url = require("url");

// 新增需要傳入的參數 handle
function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // route 函數也新增傳入參數 handle
    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;