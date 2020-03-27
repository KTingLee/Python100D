/*
證明 Node.js 為單線程
進入 localhost:3000 後會看到 a 的值
且重新整理會發現 a 不斷增加，也就是伺服器不會因為重新整理而被重置

如果不是單線程，那每個用戶看到的 a 應該都會從 1 開始
*/

var http = require("http");

// 建立一個全域變數
var a = 0;

var server = http.createServer(function(req, res) {
    // 每增加一次連線就讓 a+1
    a++;

    // 設定 response 的 Header，也就是給定編碼
    res.setHeader("Conent-Type", "text/html;charset=UTF-8")
    
    // 顯示 a 的結果，透過 toString 轉成字串
    res.end(a.toString());
})

// 監聽 port: 3000
server.listen(3000)
console.log("Server running.")

