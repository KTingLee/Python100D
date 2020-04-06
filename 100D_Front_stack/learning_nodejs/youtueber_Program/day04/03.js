/*
學習使用 mongoose 模組 - 更複雜的使用

mongoose 模組本身帶有 mongodb，所以不需再安裝 mongodb 模組
在使用前，要先連上 mongodb 數據庫：mongod --dbpath 資料庫路徑

這篇程式碼會學習更多的 mongoose 使用方式
*/

// 引入 mongoose 模組
var mongoose = require('mongoose');

// 連結資料庫，不需要寫 port，最後的反斜線內容為"資料庫名稱"
mongoose.connect('mongodb://localhost/colleges', {useNewUrlParser: true});

// 建立數據的 schema，也就是欄位及其資訊。 這個 schema 可以隨時修改，不像 MySQL 會寫死
// 欄位以及型態用 JSON 包住
var studentSchema = new mongoose.Schema({
    Name : String,
    Sex : String,
    Age : Number,
    Provice : { type: String, default: "台南" },  // 資料可以有預設值
    Hobby : [String],  // 資料可以為矩陣
    Grade: { Subject: String, score: Number },  // 資料可以再包含 JSON
});


// 依照嗜好搜索 - 屬於查詢，所以適合用靜態方法
// 因為嗜好是以矩陣包住，所以要先一個一個找
studentSchema.statics.findByHobby = function(hobby, callback){
    var arr = []
    // this 是指 studentSchema 對應的 collection
    this.find({}, function(err, results){
        // 用 forEach 遍歷，會透過回呼函數將結果回傳。 item 即為 results 矩陣的元素
        results.forEach(function(item){
            // 判斷矩陣的元素是否包含 hobby
            if(item.Hobby.includes(hobby)){
                arr.push(item)
            }
        })
        callback(arr)
    })
}


// 搜索音樂及格的人 - 屬於查詢，仍為靜態方法
studentSchema.statics.findMusicQualify = function(callback){
    this.find({"Grade.音樂" : {$gte : 60}}, function(err, results){
        if(err){
            console.log(err)
            return
        }
        callback(results)
    })
}

// 搜尋名字有"米"的人 - 屬於查詢，仍為靜態方法
// 透過正規表達式搜尋
studentSchema.statics.findMi = function(callback){
    this.find({"Name" : /米/g}, function(err, results){
        if(err){
            console.log(err)
            return
        }
        callback(results)
    })
}

// 建立 mongoose 的 model，注意變數名稱必須與 model 名稱相同
// 要在靜態、動態方法後宣告
var Student = mongoose.model("Student", studentSchema);



// 使用靜態方法，是以"類別"使用之
// Student.findByHobby("尻槍", function(results){
//     console.log(results)
// })


// 使用靜態方法，是以"類別"使用之
// Student.findMusicQualify(function(results){
//     console.log(results)
// })


// 使用靜態方法，是以"類別"使用之
Student.findMi(function(results){
    console.log(results)
})
