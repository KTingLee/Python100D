// 引入 file system 模組
var fs = require('fs')

// 使用 fs 的函數 readFile
// 可以解讀為 讀取About_Asynchronous.txt後，執行function
fs.readFile("./About_Asynchronous.txt", function(err, data){
    console.log(data.toString());
});

// 作計算
var sum = 0;
for (let i = 0; i <= 100; i++) {
    sum += i;
};
console.log(sum);

/*
最後會先輸出計算結果，才是文檔內容，說明 node.js 是以異步I/O 的方式處理
*/