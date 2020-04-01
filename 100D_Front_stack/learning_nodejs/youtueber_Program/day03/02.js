/*
mongoDB 學習，如何插入數據

mongodb 中，每一筆數據都稱為 document
*/

const MongoClient = require('mongodb').MongoClient;

// 定義插入數據的函數
const insertDocuments = function(db, callback) {
    // 要操作的 collection 名稱
    collecName = 'colleges';
    // 選擇要操作的 collection
    const collection = db.collection(collecName);
  
    // 插入多條數據(每筆數據都是 JSON，且用逗號隔開)
    // 插入以下數據後會執行匿名函數
    collection.insertMany([
        {
            "Name" : "小王",
            "Age"  : 35,
            "gender" : "男"
        },
        {
            "Name" : "小名",
            "Age"  : 25,
            "gender" : "男"
        },
        {
            "Name" : "小A",
            "Age"  : 18,
            "gender" : "男"
        },
        {
            "Name" : "AAA",
            "Age"  : 18,
            "gender" : "女"
        },
        {
            "Name" : "BBB",
            "Age"  : 25,
            "gender" : "女"
        }
    ], 
    // result 是資料庫變動訊息
    function(err, result) {
        if (err){
            console.log("插入數據失敗...");
            return;
        }
        console.log("成功插入" + result.insertedCount + "筆數據至" + collecName);
        callback(result);
  });
}


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'school';
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the server
client.connect(function(err) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function(r) {
        console.log(r)
        client.close();
    });
});
