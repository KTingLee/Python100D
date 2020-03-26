/* 
當函數 start() 被執行的時候，Node.js 會先等待5秒，
之後才會回傳 "Hello Start" 。

而執行 upload() 的時候，會和原本一樣立即回傳。
*/

function start() {
  console.log("Request handler 'start' was called.");
  // 自訂一個 sleep 函數，讓程式可以等待一段時間
  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }
  sleep(5000);
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;