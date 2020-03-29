/*
學習使用 express 來處理請求

express 起手式
//
var express = reqiure("express");
var app = express();
    ...  中間內容最後插入(middle layer)
app.listen(3000, ()=>{console.log("Server running at 3000")});
//

express 在路由處理上比較方便，例如
  請求包含 query、hash 也不用新增路由
  e.g localhost:3000/music?id=456&name=788#546
  在 express 中會自動判斷路由為 localhost:3000/music

  之前要用正規表達式過濾路由，用 express 較簡單，用冒號
  e.g localhost:3000/student/:stu_id
  student/ 後面的內容會被放在 req.params.stu_id 中

express 靜態化也方便，還能為靜態化的文件夾做路由

如果讀取某路由後要呈現特定內容，例如 Day01 - 07.js，要讀取特定 html
我們會先讀取該 html 檔案: fs.readFile("**.html", function(){...})
透過 express 的話，就不需 readFile 直接用 sendFile 即可
(只是 sendFile 必須使用絕對路徑，用 __dirname 可以直接得到執行程式文件的絕對路徑)
sendFile 表示呈現一個檔案給前端


注意，express 向前端發送是用 res.send 而不是 end
而且 send 好像會自動轉成 utf-8 編碼

*/

// 引入 express 模組
var express = require("express");
// 建立 express 物件
var app = express();


// 建立路由，
// 表示前端用 get 請求
app.get("/", function(req, res){
    // 該路由會直接呈現一個 html，該 html 在靜態資料夾中
    // 注意 sendFile 要用絕對路徑
    res.sendFile(__dirname + "/public/07_a.html")
});

// 呈現一個不在靜態資料夾的 html
app.get("/notStatic", function(req, res){
    res.sendFile(__dirname + "/07_b.html")
});

app.get("/news", function(req, res){
    res.send("新聞頻道")
});

// express 過濾路由方便
app.get("/student/:stu_id", function(req, res){
    if (/^[\d]{6}$/.test(req.params.stu_id)){
        res.send("學生頻道，學號是: " + req.params.stu_id)    
    }else{
        res.send("學號不正確")
    }

    
});


// express 簡單處理要靜態化的資料夾(注意路徑)
// 一般會放在最後，因為當使用者請求的路由不在上面的路由清單時才會到靜態資料夾尋找
// 例如 public 中的 07_a.jpg
// 方法一： localhost:3000/07_a.jpg
app.use(express.static("./public"));

// 又或者要建立有路由的靜態路徑(注意public路徑)
// 方法二： localhost:3000/fakeStatic/07_a.jpg
app.use("/fakeStatic", express.static("public"));

app.listen(3000, ()=>{console.log("Server running at 3000")});

