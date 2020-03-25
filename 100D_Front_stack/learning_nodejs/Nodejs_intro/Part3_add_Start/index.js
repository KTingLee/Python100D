/* 
index.js 為主程式
*/

// 引入 當前目錄下的 server.js 文件
// 並把該文件 export 的物件傳進變數 server
var server = require("./server.js");

// start() 來自 "./server.js"
server.start();