/*
學習 node-xlsx 模組 - 寫入

Node.js 中，若要讀取 excel 文件，可使用該模組
*/

// ES6 的引入方法
// import xlsx from 'node-xlsx';

var xlsx = require('node-xlsx');
var fs = require("fs")

// 數據資料
var data1 = [
    ["姓名", "年齡"],
    ["A", "18"],
    ["B", "20"],
    ["C", "31"]
];

var data2 = [
    ["姓名", "年齡"],
    ["D", "28"],
    ["E", "40"],
    ["F", "51"]
];


/* 轉成 2 進制(xlsx.build)，再以 fs 生成文件 */
// Returns a buffer
var buffer = xlsx.build([
    {name: "sheet1", data: data1},  // 第一份 sheet 的數據
    {name: "sheet2", data: data2}   // 第二份 sheet 的數據
]);

// 生成 excel 文件
fs.writeFile("./02.xlsx", buffer, function(){ console.log("excel 文件已生成。") })