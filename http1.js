var fs = require("fs");
var http = require("http");
var httpd = require("./httpd");
var http1 = httpd.create("localhost", "webapp", "/");

var server = http.createServer(function(request, response){
    response.setHeader("Server", "Httpd/1.1");
    response.setHeader("Accept-Ranges", "bytes");
    console.log("request: " + request.url);
    http1.service(request, response);
});

server.listen(80, "localhost");
console.log("server start on port: 80");
