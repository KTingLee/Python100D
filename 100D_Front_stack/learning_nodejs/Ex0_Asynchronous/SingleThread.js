/*
2020/03/23
Node.js 為單進程、單線程，也就是所有使用者共享一條線程
*/

// 引入 http 模組
var http = require("http");

var server = http.createServer(function(req, res) {
    // 防止亂碼
    res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    
    // 提供使用者隨機數字
    var num = parseInt(Math.random() * 10000);

    // 如果遇到6666，則主動拋出錯誤，且程式停止
    if (num === 6666){
        throw new Error('Error! 6666 出現了')
    }

    res.end('你的數字: ' + num);
});

server.listen(3000);
console.log('Server is runnung at port 3000.')

/*
當多人使用時，大家共用單一條線程
因此每個人都會得到不同數字，當數字為 6666 時，會中斷程式
此時所有人便無法成功連線。
*/
