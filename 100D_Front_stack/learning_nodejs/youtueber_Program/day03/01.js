/*
mongoDB 學習，先學習怎麼連線至 mongoDB server

# 要先開啟 mongoDB server #
在 cmd 中輸入 mongod --dbpath 自己的database路徑

# 還有下載 mongodb 的模組 #
在資料夾中 npm install --save mongodb

*/

// 引入 mongodb 模組
const MongoClient = require('mongodb').MongoClient;

// 連線的位址
const url = 'mongodb://localhost:27017';

// 要操作的資料庫名稱
const dbName = 'school';

// 建立 MongoClient 物件，等等用來連線
const client = new MongoClient(url);

// 連接至 mongodb server
client.connect(function(err) {
    if (err){
        console.log("連線失敗...")
        return;
    }
  console.log("Connected successfully to server and connect to database:" + dbName);

  const db = client.db(dbName);

  client.close();
});

