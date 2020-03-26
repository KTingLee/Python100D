/* 
要接收使用者傳遞的資訊(圖片)，這邊採用 post 的方式

因為不能預知使用者提出的 post 大小，所以如果用一次接收才處理的會容易造成阻塞(Blocking)
為了不讓Blocking發生，所以會用"陸續接收post資料"的方式，也就是把一個大的data分成數個較小的chunk

而接收使用者提出的請求，應該是由伺服器來做，所以才會寫在 server.js 中。
------
這邊當然也是用回呼函數來接收 chunk，也就是監聽 data 事件
而當 post 內容完全接收完畢後，會觸發 end 事件，所以也要監聽 end 事件

要監聽上述兩個事件，可以透過"註冊監聽器"的方式，也就是addListener("event", callbackFunction)
------
因為 chunk 是一塊一塊傳遞，所以要把所有 chunk 蒐集完才能獲得完整資料
因此才會 postData += chunk
*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var count = 0
    // 用來存放使用者傳遞的資料
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // 設定了接收資料的編碼格式為UTF-8
    request.setEncoding("utf8");

    // 新增的監聽動作放在 onRequest() 中
    // 監聽 data 事件，每收到 chunk 時就會觸發
    request.addListener("data", function(postDataChunk) {
      // 累積 chunk 以獲得完整資訊
      postData += postDataChunk;
      count++;
      // console.log("Received POST data chunk '"+ postDataChunk + "'.\n\n\n");
    });

    // 監聽 end 事件，當接收完所有 chumk 時才觸發
    request.addListener("end", function() {
      console.log('資料總共分成:', count, '次接收')
      route(handle, pathname, response, postData);
    });

  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;