// sendFile 要採用絕對路徑
// __dirname 是當前文件路徑
var url = require("url");
var querystring = require("querystring");
var bodyParser = require('body-parser');
const formidable = require('formidable');

// 傳統首頁
function showIndex(req, res){
    res.render("custom",{

    });
};

// Ajax首頁
function showAjax(req, res){
    res.render("AjaxIndex", {

    })
};


// 分析前端傳來的 GET 請求
function showGetResult(req, res){
    var urlJSON = url.parse(req.url);
    var queryJSON = querystring.parse(urlJSON.query);
    res.render("results",{
        "userName" : queryJSON.userName_get,
        "Age" : queryJSON.Age_get,
        "Sex" : queryJSON.Sex_get
    });
};


// 分析前端傳來的 POST 請求(以formidable處理)
function showPostResult(req, res){
    const form = new formidable.IncomingForm();

    // 因為請求內容包在 formidable 的文件中，所以是用 form.parse
    // 傳輸內容的字串會放在 fields，而 files 則是檔案(例如多媒體檔案、文件)
    form.parse(req, (err, fields, files) => {
        res.render("results",{
            "userName" : fields.userName_post,
            "Age" : fields.Age_post,
            "Sex" : fields.Sex_post
        });
    })
};


// 分析 Ajax 結果
function AjaxResult(req, res){
    var urlJSON = url.parse(req.url);
    var queryJSON = querystring.parse(urlJSON.query);
    console.log(queryJSON)

    res.send('OK')
}

exports.showIndex = showIndex;
exports.showGetResult = showGetResult;
exports.showPostResult = showPostResult;
exports.showAjax = showAjax;
exports.AjaxResult = AjaxResult;