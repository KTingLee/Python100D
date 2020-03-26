/* 
在 start() 中，採用了 non-Blocking 的寫法，但實際上還是有個錯誤

所謂 non-Blocking 寫法，可以看到 start() 中定義了回呼函數

從 exec("ls -lah", function ...); 的執行
到 return content;

這個流程就是 non-Blocking 的寫法，也就是程式執行 exec 時，不會等待 exec 的結束，就去執行 return content

然而錯誤的部分也就在這，因為 exec 還沒執行完就執行 return content 了，
所以 content 只會拿到初始值 empty
*/

// 引入這個模組只是想輸出一些結果而已
var exec = require("child_process").exec;

function start() {
  console.log("Request handler 'start' was called.");
  // 初始化網頁回傳內容為 empty
  var content = "empty";

  // 執行 exec 函數，用 linux 指令 ls -lah 來查詢當前目錄(但我是用 Windows 所以用 dir)
  // 這段的用意是為了進行一個 Blocking 動作，若是把指令改成 find / 會更明顯
  // 並把查詢結果放入 content 變數中
  exec("dir", function (error, stdout, stderr) {
    content = stdout;
  });

  // 回傳 content
  return content;
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;