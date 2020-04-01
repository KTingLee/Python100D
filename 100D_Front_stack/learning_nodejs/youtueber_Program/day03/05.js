/*
mongoDB 學習，如何修改數據

通常只會一條一條改 updateOne

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
    
    // 更新某筆資料，以下為部分修改，記得修改的部分要加 $set
    // 意思是把 Name 為小王的資料，將 Name 的部分修改成 小乾
    // 又例如 updateOne( {"Name":"小王"}, {$set:{"gender":"第三性"}}
    // 就是單純將 Name 為小王的資料，gender 改成 第三性
    db.collection(collecName).updateOne({"Name":"小王"}, 
        {$set:{"Name":"小乾"}}, function(err, result){
            if(err){
                console.log("修改數據失敗...");
                return;
            }
            // 顯示結果
            console.log(result);
            client.close();
    });
});
