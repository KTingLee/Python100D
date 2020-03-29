/*
說明 POST 請求如何解析

與 GET 請求不一樣，POST 請求是放在 http message body 中
所以 URL 並不會顯示出使用者要傳遞的內容
且 POST 方法並不會有容量限制，也可以是二進制內容
所以可以傳遞多媒體文件

而接收 POST 請求時，習慣會將使用者傳遞的請求分成多個 chunk
分批次接收，並將每次的 chunk 做累加，當累加完成後就會是完整的請求
此時在對請求做解析。
*/

var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')
var http = require('http')
var url = require("url")
var fs = require("fs")
var querystring = require("querystring")
 
// 建立靜態資源伺服器，可以決定要將哪個路徑做靜態化，
// 這樣用到那些文件時，就不用再放入到路由清單
// 以下表示 public 資料夾作為靜態資源資料夾，且初始頁為 05.html
var serve = serveStatic('public', { 'index': ['05.html', '05.htm'] })
 
// Create server
var server = http.createServer(function onRequest (req, res) {


    // 建立路由
    var pathname = url.parse(req.url).pathname;
    console.log('請求路由: ' + req.url);
    console.log('請求路徑:' + pathname);
    if (pathname === "/addStudent"){

        // post 請求一般會被分成多個 chunk 傳送，好處就是不用等待完全接收後才能做其他事
        // 定義一變數 content 用來接收所有 chunk
        var content = '';

        // 監聽 data 事件，每接收到一次 chunk 就觸發一次 data 事件
        req.on('data', function(chunk){
            // 把 chunk 累加到 content 中
            content += chunk;
        });

        // 監聽 end 事件，當 chunk 全部接收完後，會觸發 end 事件
        // 此時使用者的 POST 請求便全部接收完畢，所以可以準備解析並回傳至前端
        req.on('end', function(){
            // 透過 querystring.parse(query字串) 將 query 字串解析成 JSON 格式
            content = querystring.parse(content);
            console.log(content)

            // 整理資料
            var data = "姓名:" + content.name + "\n"
            data += "年齡:" + content.age + "\n"
            data += "性別:" + content.sex + "\n"
            console.log(data)

            // 把前端傳來的資料寫入文件
            fs.writeFile("./student_data/" + content.name + ".txt", data, function(err, data){
                if(err) {
                    res.end("Error when writing data.")
                }else {
                    res.end("Writing data success.")
                }
            })


        });

        // 要做 return 不然進到路由項目後，會再用到靜態資源的文件(?)
        return;
    }

    // 使用靜態資源，這段要放在路由清單後面，因為要先判斷網址是否前往路由清單的項目
    serve(req, res, finalhandler(req, res))    
})
 
// Listen
server.listen(3000, ()=> {console.log("Server running.")})