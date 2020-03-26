/* 
重新命名不能跨磁碟執行哦！
因為 圖片的站存路徑是 C 槽
但我的檔案是在 F 槽執行

*/

var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");

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

// 接收使用者提出的 request
function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  // 建立一個 formidable 的 IncomingForm 物件
  var form = new formidable.IncomingForm();
  
  // 解析使用者提出的 request 內容
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    // console.log(__dirname);
    // console.log(files.upload);

    // 把使用者傳遞的檔案重新命名，因為 fs.rename 是採用絕對路徑
    // 所以透過 __dirname 來獲得當前路徑
    fs.renameSync(files.upload.path, __dirname + "\\tmp\\test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    
    // img 的連結為 根目錄(localhost) 加上 /show
    // 也就是會跳轉至 show 頁面，因此 show 頁面必須存在於路由清單，不然會無法顯示
    response.write("<img src='/show' />");
    response.end();
  });
}

// 參數為網頁回應 response 物件
// 顯示 tmp/ 中的 test.png
function show(response) {
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