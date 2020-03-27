/*
證明 Node.js 為單線程 2

當數字刷出為 6666 時，伺服器主動拋出錯誤，且會停止執行
這個時候會發現所有人都不能在連線至伺服器了
*/

var http = require("http");

var server = http.createServer(function(req, res) {
    
    res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    
    // 提供使用者隨機數字
    var num = parseInt(Math.random() * 10000);

    // 如果遇到6666，則主動拋出錯誤，且程式停止
    if (num === 6666){
        throw new Error('Error! 6666 出現了')
    }

    res.end('你的數字: ' + num);
});

// 監聽埠號3000
server.listen(3000);
console.log('Server is runnung at port 3000.')