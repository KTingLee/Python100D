/*
簡單建立一個 Server
打開瀏覽器進入 localhost:3000 後可以看到頁面
但若用開發程式人員檢查網頁原始碼，會發現只能看到結果

就是只會直接看到 2 被輸出在網頁原始碼
而不是 (1+1)

因為程式碼是在後端(伺服器)執行，前端(瀏覽器)拿到的是執行後的結果
*/

// 引用 Node.js 內建的 http 模組
var http = require("http");

// 建立一個 Server
var server = http.createServer(function(req, res) {
    res.end("<h1>這是範例" + (1+1) + "透過 Node.js 建立 Server。</h1>")
})

// 監聽 port: 3000
server.listen(3000)
console.log("Server running.")
