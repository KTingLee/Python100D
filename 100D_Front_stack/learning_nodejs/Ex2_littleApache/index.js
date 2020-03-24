/*
2020/03/24  建立 Apache
PHP建立的網頁。其網址都對應一個真實資料
例如網址是 dir1/figure1.jpg 那網頁資料夾必包含該檔案

但 Node.js 不一定，因為 Node.js 可以自訂路由
所以網址可以是任意形式，只要讀取檔案的路徑正確即可，例如 Node.js 的網址可為
dir1/figure1.mp3
以 Apache 來看這應該是一個音樂檔，但這只是 Node.js 自定義的路由，真正指向的內容還是可以為 figure.jpg

這個程式碼主要在介紹，當用戶輸入 local:3000/dir1/figure1.jpg 時，會去尋找 figure1.jpg 
並將其呈現出來

也就是依照使用者的請求建立路由，而不是先自定義路由；而路由成立與否則必須依照伺服端是否有對應資料
*/

var http = require("http");
var url = require("url");
var path = require("path");
var querystring = require("querystring");
var fs = require("fs");

// 建立網頁回應header內容
var mime = {
    ".jpg"  : "image/jpeg",
    ".jpeg" : "image/jpeg",
    ".html" : "text/html;charset=UTF-8",
    ".css"  : "text/css",
    ".js"   : "text/javascript"

};


var server = http.createServer((req, res) => {

    // req.url 可得到使用者提出的請求
    // url.parse(req.url) 可將 req.url 解析成 json 格式
    // 裡面包含許多屬性，例如 query、pathname、path
    var urljson = url.parse(req.url);

    // 透過 url.parse() 的屬性 pathname 取得使用者請求的檔案
    var pathname = url.parse(req.url).pathname;

    // 取得使用者請求的檔案副檔名
    var extname = path.extname(pathname);

    // 透過 url.parse() 的屬性 query 取得 query 內容
    var qs = urljson.query;

    // querystring.parse(query) 可將一般的 query 形式轉成 json 格式
    var qsjson = querystring.parse(qs);

    // 觀察變數內容
    console.log("使用者請求網址:", req.url);
    console.log("解析使用者請求網址內容:", urljson);
    console.log("解析使用者請求的檔案:", pathname);
    console.log("解析使用者請求的檔案副檔名:", extname);
    console.log("查詢內容:", qs);
    console.log("查詢內容轉為 json 格式:", qsjson);

    // 當 extname 為空的時候，表示使用者將請求至一個資料夾，所以修改成"請求至該資料夾中的首頁"
    if (!extname) {
        // 注意 http://localhost:3000/a 與 http://localhost:3000/a/ 不同
        // 假設資料夾 a 中有其首頁 index.html，而此 html 使用了一張 "位於 a 資料夾中的圖片"
        // 此時採用 http://localhost:3000/a 會載入失敗
        // 所以將 http://localhost:3000/a 直接導向(跳轉至) http://localhost:3000/a/
        if (pathname.substr(-1) != '/') {
            res.writeHead(302, {"location" : pathname + "/"})
        }
        pathname += '/index.html'  // 請求至該資料夾中的首頁
    }

    // 確認網頁根目錄中是否有該資料
    fs.readFile("./" + pathname, (err, data) => {
        // 如果沒有文件
        if (err) {
            res.end("沒有此文件！");
            return;
        }
        // 如果有該文件，則回傳讀取資訊
        else {
            if (mime.hasOwnProperty(extname)) {
                // 提供正確編碼，以免亂碼
                res.setHeader("content-type", mime[extname])
            }
            res.end(data);
        }

    });
}).listen(3000, () => {console.log("server is running at port: 3000")});







