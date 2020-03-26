/* 
利用 requestHandlers.js，讓不同頁面有不同的回應
*/

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    // handle[pathname]() 會回傳頁面結果，所以再回傳
    return handle[pathname]();
  
  } else {
    // 也定義一些不在路由清單的結果
    console.log("No request handler found for " + pathname);
    return "404 Not found";
  }
}

exports.route = route;