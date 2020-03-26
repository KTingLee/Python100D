/* 
我們利用 requestHandlers.js，讓不同頁面有不同的回應
這邊用 return 將結果回傳
*/

function start() {
  console.log("Request handler 'start' was called.");
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;