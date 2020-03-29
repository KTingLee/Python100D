/*
說明 GET 請求如何解析

這邊引用了兩個額外模組 finalhandler 與 serve-static
這兩個一起使用時，就可以得到 day01 的 09.js 效果(且更好)

就是可以把文件靜態化，就不用再對 "那些會被使用到的文件" 都做路由。

而 GET 請求的解析相當容易，因為使用者的請求內容都會在網址列
所以者要分析網址列即可

而網址列會是一串 query 字串，所以可以簡單分析。
*/

var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')
var http = require('http')
var url = require("url")
var fs = require("fs")
 
// 建立靜態資源伺服器，可以決定要將哪個路徑做靜態化，
// 這樣用到那些文件時，就不用再放入到路由清單
// 以下表示 public 資料夾作為靜態資源資料夾，且初始頁為 04.html
var serve = serveStatic('public', { 'index': ['04.html', '04.htm'] })
 
// Create server
var server = http.createServer(function onRequest (req, res) {

    // 建立路由
    var pathname = url.parse(req.url).pathname;
    console.log('請求路由: ' + req.url);
    console.log('請求路徑:' + pathname);
    if (pathname === "/addStudent"){
        // 分析前端傳來的GET請求
        var queryJSON = url.parse(req.url, true).query;
        console.log(queryJSON.name);
        console.log(queryJSON.age);
        console.log(queryJSON.sex);

        // 整理資料
        var data = "姓名:" + queryJSON.name + "\n"
        data += "年齡:" + queryJSON.age + "\n"
        data += "性別:" + queryJSON.sex + "\n"
        console.log(data)

        // 把前端傳來的資料寫入文件
        fs.writeFile("./student_data/" + queryJSON.name + ".txt", data, function(err, data){
            if(err) {
                res.end("Error when writing data.")
            }else {
                res.end("Writing data success.")
            }
        })

        // 要做 return 不然進到路由項目後，會再用到靜態資源的文件(?)
        return;
    }

    // 使用靜態資源，這段要放在路由清單後面，因為要先判斷網址是否前往路由清單的項目
    // 在開頭時有建立 serve 物件，將 public 資料夾做靜態化，該資料夾內的文件不需要寫路由
    serve(req, res, finalhandler(req, res))    
})
 
// Listen
server.listen(3000, ()=> {console.log("Server running.")})