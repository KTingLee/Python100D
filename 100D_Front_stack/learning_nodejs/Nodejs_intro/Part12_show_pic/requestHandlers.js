/* 
新增一個顯示檔案(圖片)的函數 show

先試用這個函數

這邊我們新建一個資料夾 tmp，並放入一張名為 test.png 的圖片
*/

var fs = require("fs")
var querystring = require("querystring");

function start(response, postData) {
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

// 新接收一個參數 postData，這個參數是使用者傳遞的"完整"資料
function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent: " + postData.toString());
  console.log(postData);
  response.write("You've sent: " + querystring.parse(postData).text);
  response.end();
}

// 接收到使用者提出的請求 postData (其實這邊用不到，只是在 route.js 的時候傳入的參數有 postData)
// 並藉由網頁回應 response 物件做輸出
// 可以讀取 tmp/ 中的 test.png
function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;