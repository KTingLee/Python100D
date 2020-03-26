/* 
因為 request 物件要在 requestHandlers.js 中
以 formidable 的 .parse 函數處理，所以要把 request 物件傳入 requestHandlers.js
*/

// 不需要傳遞 postData 改傳遞 request 物件
function route(handle, pathname, response, request) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    // 改傳遞 request 物件
    handle[pathname](response, request);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;