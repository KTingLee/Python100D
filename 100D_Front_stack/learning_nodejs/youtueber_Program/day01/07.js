/*
介紹靜態資源

在 day01 - 06.js 中，介紹了如何建立路由
我們已經知道，使用者請求的網址必須在路由清單中才能得到正確結果

例如使用者的請求為 localhost:3000/news 表示其請求的路由為 news，
所以我們有寫一段 if(req.url === "news"){ ... } 來做為該請求的回應
但當有許多路由的時候，不就要寫一大串的 if 判斷？

而該範例在說明，當我們以這種方式建立路由的時候，假設
localhost:3000/haha.html 引入 ./public/07_a.html

若 07_a.html 又引用了許多文件，不論是 css、img 或是 js 文件
這些文件都要出現在路由清單中！

例如 07_a.html 引用了圖片，寫成 <img src="0.mp3">
雖然我副檔名寫 mp3 但這只是路由的路徑，也就是說，只要我 localhost:3000/0.mp3 會顯示圖片
那這樣圖片還是可以被引入的！
*/

var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
    console.log('顯示請求路由' + req.url);

    // 07_a.html 相關路由
    if (req.url === "/haha.html"){
        fs.readFile("./public/07_a.html", function(err, data){
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.end(data);
        });
    }else if(req.url === "/css.css"){
        fs.readFile("./public/css.css", function(err, data){
            res.end(data);
        });

    // 07_b.html 相關路由(07_b的圖片沒有放路由，所以無法顯示)
    }else if (req.url === "/GG.html"){
        fs.readFile("./public/07_b.html", function(err, data){
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.end(data);
        });

    // 07_c.html 的相關路由
    }else if (req.url === "/GG2.html"){
        fs.readFile("./public/07_c.html", function(err, data){
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.end(data);
        });
    }else if (req.url === "/07_subdir/07_picb.jpg"){
        fs.readFile("./public/07_subdir/07_picb.jpg", function(err, data){
            res.end(data);
        });

    // 07_d.html 的相關路由，第一種
    }else if (req.url === "/07d.html"){
        fs.readFile("./public/07_subdir/07_d.html", function(err, data){
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.end(data);
        });
    }else if (req.url === "/07_picb.jpg"){
        fs.readFile("./public/07_subdir/07_picb.jpg", function(err, data){
            res.end(data);
        });
    }else if (req.url === "/07_pic.jpg"){
        fs.readFile("./public/07_pic.jpg", function(err, data){
            res.end(data);
        });
    // 07_d.html 的第二種路由
    }else if (req.url === "/fakedir/07dd.html"){
        fs.readFile("./public/07_subdir/07_d.html", function(err, data){
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.end(data);
        });
    }else if (req.url === "/fakedir/07_picb.jpg"){
        fs.readFile("./public/07_subdir/07_picb.jpg", function(err, data){
            res.end(data);
        });
    }


    else{
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        res.end("頁面不存在")
    }
});


server.listen(3000);
console.log('Server is runnung at port 3000.')