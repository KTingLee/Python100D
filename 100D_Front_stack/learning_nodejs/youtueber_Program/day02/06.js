/*
學習使用 formidable 來處理請求

在 05.js 中，學習了如何使用 POST 傳遞資料，雖然傳遞的只是文字檔

這邊介紹 formidable 模組，該模組也是用於 POST 請求，
但比 05.js 介紹的方法來得有效率
並不需要像 05.js，還要透過監聽 data、end 事件，也沒有看到蒐集 chunk 的過程

而是透過 formidable 的表單物件(form)
來放置前端傳遞的內容，而 form 裡面又包含 fileds 與 files 物件

前端傳遞的文字內容會放在 fileds
前端傳遞的檔案會放在 files

而 fileds 與 files 都是 json 物件，
物件中的 key 與 前端提供的對應，而 value 自然就是前端傳遞的內容

例如在 06.html 中，前端傳遞的文字會放在 fileName 的 value (fileName 是 key)
而傳遞的檔案會放在 uploadFile 的 value (uploadFile 是 key)
注意，fileName 與 uploadFile 都是自訂的，不是說 fileds 與 files 物件本身包含這些 key

*/
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')
var http = require('http')
var path = require("path")
var url = require("url")
var fs = require("fs")
var querystring = require("querystring")
const formidable = require('formidable');
 
// 將 public 資料夾靜態化，並以 06.html 作為起始頁
var serve = serveStatic('public', { 'index': ['06.html', '06.htm'] })
 
// 建立伺服器，並監聽請求
var server = http.createServer(function onRequest (req, res) {


    // 建立路由
    var pathname = url.parse(req.url).pathname;
    console.log('請求路由: ' + req.url);
    console.log('請求路徑:' + pathname);
    if (pathname === "/takePicture"){

        // 透過 formidable 必須先建立 formidable 文件，用該文件來接收前端的請求內容
        const form = new formidable.IncomingForm();
        // 如果是使用者傳遞檔案，且伺服端要儲存檔案，則要先提供檔案存放位置(這個資料夾要先建立好哦)
        form.uploadDir = "./public/uploadDir";

        // 分析使用者傳遞給伺服器的請求
        // 因為請求內容包在 formidable 的文件中，所以是用 form.parse
        // 傳輸內容的字串會放在 fields，而 files 則是檔案(例如多媒體檔案、文件)
        // 舉例：要上傳檔案，且要輸入文件名稱，則前者是在 files 後者放在是 fields
        form.parse(req, (err, fields, files) => {
            if(err){
                res.end("Error");
            }
            // 若沒有提供文件名稱或是檔案，則向前端輸出 noName, noFile.
            // 注意，這邊的 fields 與 files 是JSON物件，
            // 而 fields.fileName 的 fileName 與 files.uploadFile 的 uploadFile 都是 key
            // 兩者都是在 06.html 中定義的！
            else if(fields.fileName === ''){
                res.end('noName')
                return;
            }
            else if(files.uploadFile.name === ''){
                res.end('noFile')
            }
            else{
                // 可將 fields 與 files 輸出來查看兩物件的 key 與 06.html 的關係
                // console.log(fields)
                // console.log(files)

                // 獲得副檔名，因為 formidable 本身不會提供上傳檔案的副檔名
                // 在 rename 中使用回呼函數，表示改完名稱後執行匿名函數
                var extname = path.extname(files.uploadFile.name);
                var file_name = fields.fileName;
                fs.rename(files.uploadFile.path, files.uploadFile.path+ "\\..\\" + file_name +extname, function(){
                    console.log(files.uploadFile.path+ "..\\" + file_name +extname)
                    res.end('Success')
                });
            }
        });


        // 要做 return 不然進到路由項目後，會再用到靜態資源的文件(?)
        return;
    }

    // 使用靜態資源，這段要放在路由清單後面，因為要先判斷網址是否前往路由清單的項目
    serve(req, res, finalhandler(req, res))    
})
 
// Listen
server.listen(3000, ()=> {console.log("Server running.")})




