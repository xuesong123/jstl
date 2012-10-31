var os = require("os");
var fs = require("fs");
var http = require("http");
var URL = require("url");
var july = require("./webserver.js");

function test1()
{
    var app1 = july.WebApplicationFactory.create("localhost", "webapp/app1", "/app1");
    var app2 = july.WebApplicationFactory.create("localhost", "webapp/app2", "/app2");

    var host1 = new july.VistualHost("localhost");

    host1.add(app1);
    host1.add(app2);

    var webServer = new july.WebServer();
    webServer.add(host1);

    var server = (function(){
        return http.createServer(function(request, response){
            webServer.dispatch(request, response);
        });
    })();

    server.listen(80, "localhost");
    console.log("server start on port: 80");
}

function test2()
{
    var app1 = july.WebApplicationFactory.create("www.skin.com", "webapp/app1", "/app1");
    var app2 = july.WebApplicationFactory.create("www.aazh.com", "webapp/app2", "/app2");

    var host1 = new july.VistualHost("www\\.skin\\.com|skin\\.com");
    var host2 = new july.VistualHost("www\\.aazh\\.com|aazh\\.com");

    host1.add(app1);
    host2.add(app2);

    var webServer = new july.WebServer();
    webServer.add(host1);
    webServer.add(host2);

    var server = (function(){
        return http.createServer(function(request, response){
            webServer.dispatch(request, response);
        });
    })();

    server.listen(80, "localhost");
    console.log("server start on port: 80");
}

test2();