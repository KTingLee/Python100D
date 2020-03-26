/* 
網頁的呈現一樣交給 requestHandlers.js


*/

var fs = require("fs")

function start(response) {
  console.log("Request handler 'start' was called.");

  // 這邊建立了一個主頁面 index.html，所以先讀取它，再把它輸出
  fs.readFile('./index.html', (err, data)=>{
    if (err) {
      response.end('Server Error!')
      return;
    }
    else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data.toString());
      response.end();      
    }
  })
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;