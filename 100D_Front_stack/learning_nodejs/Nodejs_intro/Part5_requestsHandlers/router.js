/* 
建立 route() 說明使用者即將導向的頁面路徑
*/

// route() 新增傳入參數 handle
// handle 物件是一個 json 格式，key 是網頁路徑，value 是對應的函數
function route(handle, pathname) {
  console.log("About to route a request for " + pathname);

  // 判斷網頁路徑是否存在於 handle 中，若有，則其 value 會是函數
  // 函數的定義在 requestHandlers.js 中
  if (typeof handle[pathname] === 'function') {
    handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;