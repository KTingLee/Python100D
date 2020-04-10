/*
練習加密模組 crypto

該模組可將字串進行加密，屬於內建模組。
*/

var crypto = require("crypto");

// 用戶密碼
password = "我愛你";

// 選擇加密函數(algprithm)，例如 md5。  採用 十六進制(hex) 加密，也可以選其他進制。
var str = crypto.createHash("md5").update(password).digest("hex");
console.log("經過 md5 加密後的我愛你")
console.log(str)

// 對加密後的字串再加密
var str2 = crypto.createHash("md5").update(str).digest("hex");
console.log("二次加密後的我愛你")
console.log(str2)

// 讓用戶原始的資料被擾動，再加密，可以得到更好的加密效果。
// 因為即使真的解掉加密函數，但駭客也不能確定我們是以什麼樣的方式擾動原始密碼。
// 例如 str3 解密後也是得到 password + __dirname 的結果(打亂會更好)
var str3 = crypto.createHash("md5").update(password + __dirname).digest("hex");

// 以 sha256 加密成 256 位字元
var str3 = crypto.createHash("sha256").update(password).digest("hex");