new (function(){
this.service = function(pageContext){
    var out = pageContext.getWriter();
    out.write("<form method=\"post\" action=\"form.jsp\">\r\n    <input type=\"text\" name=\"a\" value=\"a\"/>\r\n    <input type=\"text\" name=\"b\" value=\"b\"/>\r\n    <input type=\"submit\" value=\"submit\"/>\r\n</form>");
    this.release();
}/* service end */;

this.exprPool = [
];
this.exprList = null;
})();