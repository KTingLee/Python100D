/* 
已經由伺服端接收完 使用者傳遞的資料(postData)
為了將資料呈現在 upload 頁面，所以 upload() 要修改如下

之所以要加入 querystring 模組，是因為使用者傳遞的資訊是以 query 字串組成
例如使用者輸入 Hey! Nice to meet you.

則會接收到
text=Hey%21+Nice+to+meet+you.
這就是 query 字串

而經過 querystring.parse(query字串) 會把上述字串轉成json物件
{ text: 'Hey! Nice to meet you.' }

若只想得到文字就可以提取 text 屬性，即
querystring.parse(query字串).text
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

exports.start = start;
exports.upload = upload;