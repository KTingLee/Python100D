// 說明 GET 請求如何解析

var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var url = require("url")
var fs = require("fs")
 
// 建立靜態資源伺服器，可以決定要將哪個路徑做靜態化，
// 這樣用到那些文件時，就不用再放入到路由清單
// 以下表示 public 資料夾作為靜態資源資料夾，且初始頁為 index.html
var serve = serveStatic('public', { 'index': ['index.html', 'index.htm'] })
 
// Create server
var server = http.createServer(function onRequest (req, res) {


    // 建立路由
    var pathname = url.parse(req.url).pathname;
    if (pathname === "/addStudent"){
        // 獲得GET請求的資料
        var queryJSON = url.parse(req.url, true).query;
        console.log(queryJSON.name);
        console.log(queryJSON.age);
        console.log(queryJSON.sex);

        // 將資料寫入資料夾中
        var data = "姓名:" + queryJSON.name + "\n"
        data += "年齡:" + queryJSON.age + "\n"
        data += "性別:" + queryJSON.sex + "\n"
        console.log(data)
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
    serve(req, res, finalhandler(req, res))    
})
 
// Listen
server.listen(3000, ()=> {console.log("Server running.")})