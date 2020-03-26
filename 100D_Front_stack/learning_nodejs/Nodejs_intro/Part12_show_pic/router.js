/* 
為了讓使用者傳遞的資料(postData)可以顯示在 upload 頁面
所以要把 postData 傳至 requestHandlers.js 的 upload()
*/

// 新增一個參數 postData 該參數是指 使用者傳遞的完整資料
function route(handle, pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    
    // 將使用者提供的資料傳入處理頁面的地方，即 requestHandlers.js
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;