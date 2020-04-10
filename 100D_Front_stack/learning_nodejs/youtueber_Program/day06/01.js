/*
學習 node-xlsx 模組 - 讀取

Node.js 中，若要讀取 excel 文件，可使用該模組
*/

// ES6 的引入方法
// import xlsx from 'node-xlsx';

var xlsx = require('node-xlsx');

/* 讀取文件(xlsx.parse) */
// Parse a buffer(2進制讀取，採用 fs 模組，並同步Sync讀取)
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));

// Parse a file(讀取一般文件，同步語句讀取直接寫，沒有回呼函數)
const workSheetsFromFile = xlsx.parse( __dirname + "/01.xlsx");

// 讀取結果
console.log(typeof workSheetsFromFile);  // 讀取後為物件
console.log(Array.isArray(workSheetsFromFile));  // 且亦為矩陣

console.log(workSheetsFromFile.length);  // 該 excel 文件的 sheet 數量
console.log(workSheetsFromFile[0]);  // 第一張 sheet
console.log(workSheetsFromFile[0].name);  // 第一張 sheet 的名稱
console.log(workSheetsFromFile[0].data);  // 第一張 sheet 的內容
console.log(workSheetsFromFile[0].data.length);  // 第一張 sheet 的內容筆數
