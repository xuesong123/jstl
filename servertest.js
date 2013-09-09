var os = require("os");
var fs = require("fs");
var http = require("http");
var URL = require("url");
var july = require("./webserver.js");

var webApplication = july.WebApplicationFactory.create("localhost", "webapp", "/");
var servletContext = webApplication.servletContext;

var DEBUG = false;

if(DEBUG)
{
    var servlets = [
        {"name": "UserListServlet", "pattern": "*.do$", "servlet": UserListServlet},
        {"name": "BookListServlet", "pattern": "*.do$", "servlet": BookListServlet}
    ];

    for(var i = 0; i < servlets.length; i++)
    {
        var a = servlets[i];
        servletContext.set(a.name, a.pattern, a.servlet);
    }

    /**
     * filter test
     */
    servletContext.set("test3", "/onlyjsp\\.jsp", function(request, response, servletChain){
        response.end("<h1>filter: onlyjsp.jsp</h1><h1>Hello World !</h1>");
    });
}

servletContext.set("test1", "/test1", function(request, response, servletChain){
    response.setHeader("Content-Type", "text/html; charset=UTF-8");

    var session = request.getSession(true);
    response.write("<h1>test1.message: Hello World !</h1>");
    response.write("<h1>session.sessionId: " + session.sessionId + "</h1>");

    var user = session.getAttribute("user");

    if(user == null)
    {
        response.write("<h1>user.name: null</h1>\r\n");
        session.setAttribute("user", {"name": "xuesong.net"});
    }
    else
    {
        response.write("<h1>user.name: " + user.name + "</h1>\r\n");
    }

    servletChain.doChain(request, response);
});

servletContext.set("test2", "(/test1)|(/test2)", function(request, response, servletChain){
    response.write("<h1>tets2.requestURI: " + request.requestURI + "</h1>");
    response.write("<h1>test2.message: Hello World !" + "</h1>");
    response.end();
});

servletContext.set("test3", "/test3", function(request, response, servletChain){
    response.setHeader("Content-Type", "text/html; charset=UTF-8");

    var userList = [];

    for(var i = 0; i < 20; i++)
    {
        userList.push({"name": "tome" + i, "sex": 1, "birthday": new Date});
    }

    request.setAttribute("pageNum", 1);
    request.setAttribute("pageSize", 20);
    request.setAttribute("total", 373);
    request.setAttribute("userList", userList);
    request.getRequestDispatcher("/test.jsp").forward(request, response, servletChain);
});

servletContext.set("test4", "/form\\.jsp", function(request, response, servletChain){
    response.setHeader("Content-Type", "text/html; charset=UTF-8");

    response.write("<h1>c: " + request.getParameter("c") + "</h1>");

    response.write([
        "<form method=\"post\" action=\"form.jsp?c=1\">",
        "<input type=\"text\" name=\"a\" value=\"a\"/>",
        "<input type=\"text\" name=\"b\" value=\"b\"/>",
        "<input type=\"submit\" value=\"submit\"/>",
        "</form>"].join("\r\n"));
    response.end();
});

var server = (function(){
    return http.createServer(function(request, response){
        if(request.url == "/favicon.ico")
        {
            response.writeHead(404, "Not Found", {"Content-Type": "text/plain"});
            response.end();
            return;
        }

        webApplication.dispatch(request, response);
    });
})();

server.listen(80, "localhost");
console.log("server start on port: 80");
