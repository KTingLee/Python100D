/* 
學習建立伺服端 Server 
與 Part1 不同的是，createServer() 傳遞的參數改成有名字的函數而不是匿名函數
*/



// 引入 Node.js 內建的 http 模組
const http = require('http');


// 建立要傳入 createServer() 的函數原型
function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

// 使用 http 的物件方法 createServer() 以產生 Server
// 這次傳遞有名稱的參數
http.createServer(onRequest).listen(3000, function() {
    console.log('伺服器在 port: 3000 運作中！');
});

