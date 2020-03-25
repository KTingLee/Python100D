/* 學習建立伺服端 Server */


// 引入 Node.js 內建的 http 模組
const http = require('http');

// 使用 http 的物件方法 createServer() 以產生 Server
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(3000, function() {
    console.log('伺服器在 port: 3000 運作中！');
});

