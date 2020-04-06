// 操作學生、課程的模組
var Student = require("./Student.js");
var Course = require("./Course.js");


// 選課(某位學生選擇了某堂課)
// 學生與課程可以藉由矩陣，記錄彼此資料，確保學生選了多少課、課程被多少學生選擇
var sign_course = function(stu_id, course_id, callback){
    Course.findByCid(course_id, function(results){
        var thisCourse = results[0];
        // 若課程不存在(undefined)，回傳 -1
        if(!thisCourse){
            callback("-1")
            return;
        }
        // 判斷課程選課資料中是否包含此學生，若有則回傳 -2
        if(thisCourse.students.includes(stu_id)){
            callback("-2")
            return;
        }

        // 接著查詢學生
        Student.findByStuid(stu_id, function(results){
            var thisStudent = results[0];
            // 若學生不存在(undefined)，回傳 -3
            if(!thisStudent){
                callback("-3")
                return
            }
            // 判斷學生選課資料中，是否包含此課程，若有則回傳 -4
            if(thisStudent.courses.includes(course_id)){
                callback("-4")
                return;
            }

            // 都沒有問題就儲存資料
            // 向課程的學生資料中添加學生，並儲存
            thisCourse.students.push(stu_id);
            thisCourse.save();
            // 向學生的課程資料中添加課程，並儲存
            thisStudent.courses.push(course_id);
            thisStudent.save();
            callback("1")
        })
    })


}


exports.sign_course = sign_course;