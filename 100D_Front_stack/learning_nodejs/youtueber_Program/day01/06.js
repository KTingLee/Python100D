/*
建立簡單路由

之前的範例，不管網址長怎麼樣，例如 localhost:3000/asd、localhost:3000/asklqer
都只能看到同樣的結果，因為沒有做路由機制

路由機制就是讓使用者的請求(e.g 網址)能有對應的回應(e.g 頁面)

假設使用者連線至 localhost:3000/news 則我們必須提供 news 的路由，
才能夠針對 news 頁面做出特定的回應

且 Node.js 的路由屬於 頂層路由設計
所以即使路由寫 localhost:3000/music.html 不代表有 music.html 這個文件
而 localhost:3000/picture.mp3 也可以不是音樂檔，而是一個網頁內容

如果是 PHP、Apache，那 localhost:3000/music.html 就必須真的有 music.html 這個文件
也就是說，PHP、Apache 這種的設計，路由就必須有實際存在的文件與其對應

而 Node.js 的這種路由設計風格又稱做 RESTful 風格
*/

var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
    
    if(req.url === "/"){
        res.end("首頁");

    }else if(req.url === "music.html"){  // 其實沒有 music.html 文件
        res.end("音樂頻道，其實我沒有 .html 文件");

    }else if(req.url === "news"){
        res.end("新聞頻道");

    }else if(req.url === "picture.mp3"){  // 其實 picture.mp3 這個路由不是音樂而是網頁
        res.end("圖片頻道，不要被網址的 .mp3 給騙了");

    }else if(/^\/student\/[\d]{6}$/.test(req.url)){  // 以正規表達式匹配使用者請求
        // 獲取學號的樣板
        var reg = /^\/student\/([\d]{6})$/;
        // 獲取學號
        var stu_id = reg.exec(req.url)[1];
        // 讀取文件(模擬數據庫的方式)
        fs.readFile("./06db.json", function(err, data){
            if(err){
                res.end("文件讀取失敗！");
                return;
            }
            
            // 資料庫是 json 格式，所以用 JSON.parse 解析；別忘了把 data 轉成字串
            var dataObj = JSON.parse(data.toString());
            console.log(dataObj);

            if (dataObj.hasOwnProperty(stu_id)){  // 判斷學號是否存在於資料庫中
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                
                res.write("<h1>學生頻道，你的學號是:" + stu_id + "</h1>");  // write 表示還要繼續輸出
                res.write("<h2>姓名:" + dataObj[stu_id]["Name"] + "</h2>");
                res.write("<h2>數學:" + dataObj[stu_id]["Math"] + "</h2>");
                res.write("<h2>英文:" + dataObj[stu_id]["English"] + "</h2>");
                
                res.end("")  // end 表示伺服器已經沒有要輸出了，之後不能再用 write                

            }else{
                res.setHeader('Content-Type', 'text/html;charset=UTF-8');
                console.log(stu_id);
                res.end("沒有這個學生");
            }
        })

    }else{
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        console.log(req.url);
        res.end("頁面不存在");
    }

    

});


server.listen(3000);
console.log('Server is runnung at port 3000.')




