/*
mongoDB 學習，如何查詢數據

mongodb 中，每一筆數據都稱為 document
*/

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

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
    
    // 在某個 collection 中查詢數據 find，要查詢的條件以 JSON 表示，若要查看所有則不需要輸入條件
    // 條件中，且用 逗號  、大於要用 $gt  、$lt 表示小於  、$or:[條件] 表示或
    // 例如 $or : [{"gender":"女", "Age":{$lt:20}} , {"gender":"男", "Age":{$gt:30}}]
    // 上述條件為：  "女性且年齡小於20" 或 "男性且年齡大於30"
    // 記得要 toArray()
    db.collection(collecName).find({
        "gender" : "男",
        "Age" : {$gt : 18}
    }).toArray(
        function(err, result){  
            if(err){
                console.log("查詢數據失敗...");
                return;
            }
            // 顯示結果
            console.log(result);
            client.close();
    });
});
