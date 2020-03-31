// controller 調派、使用函數

var url = require('url');
var querystring = require("querystring");
var formidable = require("formidable");
var file = require('../models/file.js')


// 顯示首頁
exports.showIndex = function(req, res){
    res.render("index", {

    })
} 

// 處理訂單(POST請求)
exports.newOrder = function(req, res){
    const form = new formidable.IncomingForm();

    // 因為只有提交文字內容，所以只需要 fields
    form.parse(req, (err, fields, files) => {
        var userNumber = fields.phoneNumber;
        var userMeal = fields.userMeal;

        // 儲存訂單
        file.saveOrder(userNumber, userMeal)

        // 向前端發送處理完的訊息
        res.send("200")

    })
}


// 管理員視窗
exports.showSuper = function(req, res){
    res.render("superPage",{})
}


// 顯示所有訂單
exports.showAllOrders = function(req, res){
    // 獲得訂單資料夾中所有訂單名稱
    file.getAllOrderName((allOrders)=>{
        // 將所有訂單輸出在畫面
        res.render("AllOrders",{
            "ordersArr" : allOrders
        })        
    })

}

// 顯示其中一份訂單
exports.showOneOrder = function(req, res){
    // 透過路由處，已經可以得到手機號碼
    var userPhone = req.params.phoneNum

    // 讀取該號碼的訂單
    file.readOrder(userPhone, function(thisOrder){
        if (thisOrder == -1){
            thisOrder = '沒有這份訂單捏 ^ ^凸'
        }
        // 顯示訂餐內容
        res.render("order",{
            "custom" : userPhone,
            "meal" : thisOrder
        })
    })



}
