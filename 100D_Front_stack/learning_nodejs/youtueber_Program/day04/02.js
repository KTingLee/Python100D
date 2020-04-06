/*
學習使用 mongoose 模組 - 靜態方法與動態方法

mongoose 模組本身帶有 mongodb，所以不需再安裝 mongodb 模組
在使用前，要先連上 mongodb 數據庫：mongod --dbpath 資料庫路徑

這篇程式碼會說明如何建立動態方法與靜態方法
mongoose 可以 "基於 schema" 來建立靜態或動態方法

靜態方法是給類別使用的方法，如 Python 的 static method
動態方法則是給物件使用，即為物件方法

例如搜尋應該屬於靜態方法，而修改內容應該屬於動態方法
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
    Grade: [{ Subject: String, score: Number }],  // 資料可以再包含 JSON
});


// 靜態方法：讓類別使用的，關鍵字 statics
// 例如依名稱尋找
studentSchema.statics.findByName = function(name, callback){
    // this 指向其 collection，例如此處就是指向 students
    // 尋找 Name 符合 name 的資料，並執行回呼函數，尋找的結果是以矩陣存放在 results，而元素為 Student 物件
    this.find({"Name" : name}, function(err, results){
        callback(results)
    })
}

// 動態方法：讓物件使用，關鍵字 methods
// 例如讓資料做動作
studentSchema.methods.sayHi = function(){
    console.log("我是" + this.Name + "，我喜歡" + this.Hobby + "。今年" + this.Age + "，性別是" + this.Sex)
}

// 動態方法2
// 例如修改資料
studentSchema.methods.changeSex = function(){
    if(this.Sex == "男"){
        this.Sex = "女";
    }else{
        this.Sex = "男";
    }
    // 最後要記得保存
    this.save();
}

// 組合靜態與動態方法的靜態方法！
studentSchema.statics.changeSexByName = function(name){
    Student.findByName(name, function(results){
        var somebody = results[0]
        somebody.sayHi();
        somebody.changeSex();
        somebody.sayHi();
    })
}



// 建立 mongoose 的 model，注意變數名稱必須與 model 名稱相同
// 要在靜態、動態方法後宣告
var Student = mongoose.model("Student", studentSchema);



// 使用靜態方法，是以"類別"使用之
Student.findByName("米開朗基羅", function(results){console.log(results)})

// 使用動態方法(通常會包在靜態方法中)
Student.findByName("米開朗基羅", function(results){
    // 搜尋結果都是矩陣，透過索引取值
    var somebody = results[0];
    // 執行動態方法
    somebody.sayHi();
})

// 使用動態方法範例2
Student.findByName("米開朗基羅", function(results){
    var somebody = results[0];
    somebody.changeSex();
    somebody.sayHi();
})

Student.changeSexByName("米開朗基羅")