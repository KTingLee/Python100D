/*
介紹 Node.js 採用異步 I/O
雖然以下程式碼先讀取文件，再計算，最後輸出計算結果
但執行結果是 計算結果比文件內容先輸出

因為採用異步I/O，所以讀取的時候CPU還是可以做計算
*/

// 引入 Node.js 內建模組: file system 模組
var fs = require('fs')

// 使用 fs 的函數 readFile。這段是 I/O 工作
// 可以解讀為 讀取About_Asynchronous.txt後，執行function
fs.readFile("./About_Asynchronous.txt", function(err, data){
    console.log(data.toString());
});

// 作計算，這段是CPU計算，且與I/O任務無關
var sum = 0;
for (let i = 0; i <= 100; i++) {
    sum += i;
};
console.log(sum);