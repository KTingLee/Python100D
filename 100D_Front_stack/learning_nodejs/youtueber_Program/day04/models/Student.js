// 學生模組，用來操作學生 collection 的模組
// 因為要建立學生選課系統，所以學生的選課資訊是必備的
// 學生可以選擇多個課程，課程可以被多個學生選擇
// 要記錄學生選了多少課、課程被多少學生選擇，最簡單的就是彼此用矩陣來記錄

var mongoose = require('mongoose');

// 建立學生schema
// 學生的選課資料紀錄在 course 矩陣中
var studentSchema = new mongoose.Schema({
    "stu_id" : Number,
    "Name" : String,
    "courses" : [Number]
});


// 靜態方法 statics
studentSchema.statics.findByStuid = function(stu_id, callback){
    this.find({"stu_id" : stu_id}, function(err, results){
        callback(results)
    })
}


// 建立學生 model
// 資料庫中會產生名為 students 的 collection
var Student = mongoose.model("Student", studentSchema);


// 因為這個模組只記錄跟 student 有關的東西，所以用 module.exports 輸出
module.exports = Student;
