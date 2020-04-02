// 存取資料庫的模組


const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'colleges';

// 獲取所有學生資料，屬於異步語句
function getStudent(callback){
    const client = new MongoClient(url, {useNewUrlParser: true});

    // 連結至 mongodb Server
    client.connect(function(err) {
        if(err){
            console.log('連結資料庫失敗...')
            return;
        }

        // 切換至某個資料庫，即 use dbName
        const db = client.db(dbName);

        // 選擇要操作的 collection
        const collecName = 'student';
        
        // 抓取學生資料，記得 toArray
        db.collection(collecName).find({}).toArray(function(err, result){
            if(err){
                console.log("讀取數據失敗...");
                callback("-1");
                return;
            }
            // 透過 callback 回傳結果
            callback(result)
            client.close();
        });
    });
}


// 向資料庫添加學生資料(json格式)
// 添加成功就利用回呼函數回傳 1
function addStudent(json, callback){
    const client = new MongoClient(url, {useNewUrlParser: true});

    // 連結至 mongodb Server
    client.connect(function(err) {
        if(err){
            console.log('連結資料庫失敗...')
            return;
        }

        // 切換至某個資料庫，即 use dbName
        const db = client.db(dbName);

        // 選擇要操作的 collection
        const collecName = 'student';
        
        // 抓取學生資料，記得 toArray
        db.collection(collecName).insertOne(json, function(err, result){
            if(err){
                console.log("學生資料添加失敗")
                callback("-1")
                return;
            }
            callback("1")
        })
    });
}


exports.addStudent = addStudent;
exports.getStudent = getStudent;



// 單元測試
// getStudent(function(data){
//     if(data == -1){
//         throw new Error("錯誤")
//     }
//     console.log(data)
// })

