/* 
利用 requestHandlers.js，讓不同頁面有不同的回應
*/

// 新增一個參數至 reoute()，表示該函數要接受 response 參數
function route(handle, pathname, response) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    
    // handle 的 value 是函數，讓不同網頁可以做對應的事
    // 而把 response 物件傳入，就能讓 requestHandlers.js 直接對網頁回應作操作
    handle[pathname](response);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;