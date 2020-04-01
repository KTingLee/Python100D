/*
mongoDB 學習，如何刪除數據

mongodb 中，每一筆數據都稱為 document
*/

const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'school';
const client = new MongoClient(url, {useNewUrlParser: true});

// 選擇要操作的 collection
const collecName = 'colleges';

// Use connect method to connect to the server
client.connect(function(err) {
    if(err){
        console.log("連線至mongoedb server失敗...");
        return;
    }
    console.log("Connected successfully to server");

    // 切換至某個資料庫，即 use dbName
    const db = client.db(dbName);
    
    // 在某個 collection 中刪除一條數據 deleteOne
    // 要刪除的數據"條件"以 JSON 表示
    db.collection(collecName).deleteOne({
        "Name" : "small Pig"
    },
    // result 是資料庫變動訊息
    function(err, result){
        if(err){
            console.log("刪除數據失敗...");
            return;
        }
        console.log("成功刪除" + result.deletedCount + "筆數據至" + collecName);
        client.close();
    })
});
