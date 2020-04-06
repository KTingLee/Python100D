// 課程模組，用來操作課程 collection 的模組
// 因為要建立學生選課系統，所以課程被多少學生選擇資訊是必備的
// 學生可以選擇多個課程，課程可以被多個學生選擇
// 要記錄學生選了多少課、課程被多少學生選擇，最簡單的就是彼此用矩陣來記錄

var mongoose = require('mongoose');

// 建立課程schema
// 一個課程被多少學生選擇紀錄在 students 中
var courseSchema = new mongoose.Schema({
    "c_id" : Number,
    "Name" : String,
    "students" : [Number]
});

// 靜態方法 statics
courseSchema.statics.findByCid = function(c_id, callback){
    this.find({"c_id" : c_id}, function(err, results){
        callback(results)
    })
}

// 建立課程 model
// 資料庫中會產生名為 courses 的 collection
var Course = mongoose.model("Course", courseSchema);


// 因為這個模組只記錄跟 course 有關的東西，所以用 module.exports 輸出
module.exports = Course;
