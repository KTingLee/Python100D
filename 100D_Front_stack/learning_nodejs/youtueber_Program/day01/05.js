/*
證明 Node.js 的異步 I/O 特性

當使用者連線至 localhost:3000 時，
伺服器會先讀取 ./public 文件夾中的 05.html
再將該html的內容傳遞給使用者

當許多使用者同時連線時，會發現程式並不是
    "A使用者連線後，將畫面輸出給A；再等下一位使用者連線"
而是
    "A、B兩位使用者同時連線，假設A先到，就先輸出給A；若要輸出給B前，又有C使用者連線，那這是會先建立C的連線"
看圖片(05.png)會比較有感覺
*/

var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
    // 獲取使用者的 ip 地址
    var ip = req.connection.remoteAddress;
    console.log(ip + "來了，開始讀取文件...")
    
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