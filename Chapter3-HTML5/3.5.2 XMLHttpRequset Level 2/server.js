var http = require("http");
http.createServer(function(req, res){
    // 设置可以跨域的域名
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    // 服务器支持“GET POST”方法
    res.setHeader("Access-Control-Allow-Methods", "Get, POST");
    // 设置接收数据编码格式为utf-8
    req.setEncoding("utf8");
    // 返回测试数据
    res.end(JSON.stringify({data: "Hello world!"}));
}).listen(4412, function(){
    console.log("listening on http://localhost:4412");
});