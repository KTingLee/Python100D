/* 
新增分析使用者提出的請求(request)
request 物件中包含 url 屬性，即使用者要前往的網址
可透過 url 模組的方法 url.parse() 分析網址

新增的部分，主用意是為了建立路由功能，所以先將資訊整理好
*/


var http = require("http");
var url = require("url");

// start() 多傳入函數 route()
function start(route) {
  function onRequest(request, response) {
    // 使用者向伺服端提出 request 物件，url 為其中一個屬性
    // 透過 url.parse(url字串).pathname 來獲取使用者要連到的頁面路徑
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // 利用 route 函數，說明要使用的路由
    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;