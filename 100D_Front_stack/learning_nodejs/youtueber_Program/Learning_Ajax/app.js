/*
學習甚麼叫 Ajax

Ajax 簡單的說就是讓頁面維持在原本的狀態，
並向後端發送消息

理如網頁有表單需要填入，並提交給後端，
使後端可以將資料放入資料庫，輸入完後會向前端發送訊息。

傳統的方式可能是按下 "發送" 後，頁面跳轉至發送成功的頁面。
而 Ajax 則是，按下發送後，仍在同一個畫面，但跳提示說已經發送完畢。

Ajax 的優點在於異步處理，也就是後端接收資料的同時，使用者仍可繼續使用畫面。
若是傳統方法，因為頁面會跳轉，所以當網路不好的時候就會轉特別慢。

而 Ajax 主要是利用 javascript 的技術達成。
傳統方式必需透過 
    <form action="跳轉頁面" method="GET/POST"> 
以及 
    <input type="submit"> 
來達成

而 Ajax 則不需要 <form>，但按鈕形式要改為
    <iuput type="button" id="按鈕id">
搭配 js
    $('#按鈕id').get (... , function(data){...})
    $('#按鈕id').post(... , function(data){...})
其中，data 是後端處理完回傳的內容

*/

var express = require("express");
var app = express();

var controller = require("./controllers/controllers.js");

// 設置模板引擎
app.set("view engine", "ejs");

// 路由清單
// 首頁
app.get('/', controller.showIndex);
// 顯示 Ajax 首頁
app.get('/Ajax', controller.showAjax);

// GET結果頁面(傳統方式會跳轉到這個頁面)
app.get('/GetResult', controller.showGetResult)
// POST結果頁面
app.post('/PostResult', controller.showPostResult)

// Ajax 使用 GET 請求
app.get('/AjaxGet', controller.AjaxResult);




// 設置靜態資源資料夾
app.use(express.static("./public"));

app.listen(3000, ()=>{console.log("Server running!")});
