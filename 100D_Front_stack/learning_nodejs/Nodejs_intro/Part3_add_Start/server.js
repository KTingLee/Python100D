/* 
將 Server.js 做成模組(module)
一般而言，JS 的主程式稱為 index.js，
這邊我們學習如何將 Server.js 做成模組，也就是怎麼匯出建立 Server 的功能
*/



// 引入 Node.js 內建的 http 模組
const http = require('http');


// 建立一個函數 start() 將啟動伺服器的流程包起來
function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

// 在 exports 物件中，新增屬性 start(即 exports.start)
// 該屬性內容為 start 函數(不用加小括號)
exports.start = start;