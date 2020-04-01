/*
mongoDB 學習，如何插入數據 2

mongodb 中，每一筆數據都稱為 document
*/

const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'school';
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the server
client.connect(function(err) {
    console.log("Connected successfully to server");

    // 切換至某個資料庫，即 use dbName
    const db = client.db(dbName);

    // 選擇要操作的 collection
    const collecName = 'colleges';
    
    // 在某個 collection 中插入一條數據 insertOne 插入的數據內容以 JSON 表示
    // 插入後要執行匿名函數
    db.collection(collecName).insertOne({
        "Name" : "small Pig",
        "Age"  : "35",
        "gender" : "男"
    },
    // result 是資料庫變動訊息
    function(err, result){
        if(err){
            console.log("插入數據失敗...");
            return;
        }
        console.log("成功插入" + result.insertedCount + "筆數據至" + collecName);
        client.close();
    })
});
