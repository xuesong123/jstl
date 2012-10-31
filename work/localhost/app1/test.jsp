new (function(){
this.service = function(pageContext){
    var out = pageContext.getWriter();
    out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n<html>\r\n<head>\r\n<title>test</title>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>\r\n</head>\r\n<body>\r\n<div><img src=\"resource/images/logo.jpg\"/></div>\r\n");

    var myname = "xuesong.net";

    out.write("\r\n<h1>Hello, ");
    out.write(myname);
    out.write("</h1>\r\n</body>\r\n</html>");
    this.release();
}/* service end */;

this.exprPool = [
];
this.exprList = null;
})();