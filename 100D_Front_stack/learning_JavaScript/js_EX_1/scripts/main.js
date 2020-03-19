var myHeading = document.querySelector('h1');  // 變數 myHeading 拿到 h1 標籤
myHeading.textContent = 'Hello world!'; // 賦予 myHeading 字串內容

/*
document.querySelector('html').onclick = function() {
    alert('Ouch! Stop poking me!');
}
*/

// 監聽圖片點擊動作
var myImage = document.querySelector('img');
myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/Figure2.jpg');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}

// 監聽button標籤點擊動作
var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

// 建立函數 setUserName()
// prompt 可要求用戶輸入資料，輸入的內容會存放在 myName 變數
// localStorage 是一個 API，能夠讓資料儲存在瀏覽器中，就算瀏覽器關閉也還是會保存
// .setItem() 能將資料儲存到 name 變數中
function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.innerHTML = 'Mozilla is cool, ' + myName;
}

// 因為瀏覽器一運作就會啟用 js，所以先用判斷式
// localStorage.getItem() 可以取得 API 儲存的東西
if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.innerHTML = 'Mozilla is cool, ' + storedName;
}

// 將 button 標籤與該函數綁定
myButton.onclick = function() {
  setUserName();
}
