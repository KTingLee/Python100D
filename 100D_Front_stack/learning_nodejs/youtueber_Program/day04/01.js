/*
學習使用 mongoose 模組

mongoose 模組本身帶有 mongodb，所以不需再安裝 mongodb 模組
在使用前，要先連上 mongodb 數據庫：mongod --dbpath 資料庫路徑

這篇程式碼將學習怎麼透過 mongoose 操作資料庫
包含如何連接、建立 collection、儲存數據

使用 mongoose 時，不要用資料庫的方式思考，應該使用物件導向的方式
因為幾乎沒看到什麼資料庫語法

同時也會看到，資料不再只是數據，而是物件！
*/

// 引入 mongoose 模組
var mongoose = require('mongoose');

// 連結資料庫，不需要寫 port，最後的反斜線內容為"資料庫名稱"
mongoose.connect('mongodb://localhost/colleges', {useNewUrlParser: true});

// 建立連結物件db，能查看是否連線成功
var db = mongoose.connection;

db.on('error', console.error.bind(
    console, 'connection error:'
    ));

db.once('open', function() {
  // we're connected!
});

// 建立數據的 schema，也就是欄位及其資訊。 這個 schema 可以隨時修改，不像 MySQL 會寫死
// 欄位以及型態用 JSON 包住
var studentSchema = new mongoose.Schema({
    Name : String,
    Sex : String,
    Age : Number,
    Provice : { type: String, default: "台南" },  // 資料可以有預設值
    Hobby : [String],  // 資料可以為矩陣
    Grade: [{ Subject: String, score: Number }],  // 資料可以再包含 JSON
});

// 建立 mongoose 的 model，或者稱為建立新類別(能存入資料庫的)
// 注意變數名稱必須與 model 名稱相同
// 之後數據儲存成功後，資料庫會新增一個 collection 稱為 students  (將 model 名稱轉小寫並在尾部加上 s)
var Student = mongoose.model("Student", studentSchema);

// 建立 Student 物件
var stu_1 = new Student({
    Name : "米開朗基羅",
    Sex : "男",
    Age : 25,
    Provice : "桃園",
    Hobby : ["游泳", "雕刻", "模特兒"],
    Grade : [
        {Subject: "美術", score: 80},
        {Subject: "音樂", score: 75},
        {Subject: "數學", score: 88},
    ]
});

// 將物件存入資料庫
stu_1.save();
