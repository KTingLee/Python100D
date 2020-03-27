/*
證明 Node.js 的異步 I/O 特性 2

這次加入一次大量運算，再讀取文件
當大量運算時，表示 CPU 無法抽身，這個時候使用者連線就會造成堵塞

也就是
"A連線成功時，因為需要大量運算，所以CPU都在處理A連線，當運算完的瞬間，接著讀取文件時便會處理其他使用者的連線"
可以看 05_ver2.png。

所以 Node.js 適用於 I/O 多的，而不是需要計算的任務。
*/

var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
    // 獲取使用者的 ip 地址
    var ip = req.connection.remoteAddress;
    console.log(ip + "來了，開始計算...")

    // 先做一次大量計算
    var result = 0;
    for (var i = 0; i <= 10000000; i++) {
        result += i + Math.pow(i,2) +Math.pow(i,3)

        if (i % 2500000 === 0){
            console.log(ip + "計算出" + result)
        }
    }
    console.log(ip + "算完所有迴圈囉！")
    
    // 使用者連線後，伺服器先讀取文件
    fs.readFile("./public/05.html", function(err, data){
        // 設置 header 以防亂碼
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        // 將 05.html 的內容輸出到前端
        res.end(data);

        // 終端機顯示
        console.log(ip + "讀取文件結束！");
    });
});

// 監聽埠號3000
server.listen(3000);
console.log('Server is runnung at port 3000.')