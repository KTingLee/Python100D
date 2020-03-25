/* 
建立 route() 說明使用者即將導向的頁面路徑
*/

function route(pathname) {
  console.log("About to route a request for " + pathname);
}

// 輸出 route 函數
exports.route = route;