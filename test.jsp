<html>
<head>
<title>test.jsp</title>
</head>
<body>
<p>user: ${this.user.name}</p>
<p>user.sex: ${this.user.sex}</p>
<p><a href="1.html">1.html</a></p>
<p><h1><%=(10.5 * 10)%></h1></p>
<%
    var a = 1;
    var b = 2;
    out.println("<h2>a + b = " + (a + b) + ";</h2>");
%>

---------------------- [test]: tag.if ----------------------
<c:if test="${this.user.name == 'tom'}"><p>Hello tom !</p></c:if>

---------------------- [test]: tag.out ----------------------
<p><c:out value="123 ${this.user.name} abc"/></p>
<p><c:out value="123 ${this.user.name} abc" escapeXml="true"><h1>a</h1></c:out></p>

---------------------- [test]: tag.set ----------------------
<c:set var="userName" value="jim"></c:set>
<p>Hello <c:out value="${this.userName}"/></p>

---------------------- [test]: tag.each ----------------------
<c:forEach begin="0" step="1" end="5" var="num" varStatus="status">
    <p>${this.status.index}: ${this.num}</p>
</c:forEach>

---------------------- [test]: tag.each ----------------------
<c:forEach items="A,B,C,D,E,${this.user.name}" var="testText" varStatus="status">
    <p>index: ${this.status.index}, ${this.testText}</p>
</c:forEach>

---------------------- [test]: tag.forEach ----------------------
<c:forEach items="${this.userList}" var="user"><p>${this.user.name}</p></c:forEach>

---------------------- [test]: tag.choose ----------------------
<c:choose>
    <c:when test="${this.user.sex == 1}"><p>when this.user.sex == 1</p></c:when>
    <c:when test="${this.user.sex == 2}"><p>when this.user.sex == 2</p></c:when>
    <c:when test="${this.user.sex == 3}"><p>when this.user.sex == 3</p></c:when>
    <c:otherwise><p>otherwise</p></c:otherwise>
</c:choose>

<c:format var="userBirthday" value="${this.user.birthday}" pattern="yyyy-MM-dd HH:mm:ss SSS"/>
user.birthday: ${this.userBirthday}
user.birthday: <c:format value="${this.user.birthday}" pattern="yyyy-MM-dd HH:mm:ss SSS"/>

${noThisObject.name}

<c:scrollpage pageNum="7" pageSize="30" total="487" className="pagenumber pagebar"/>

<div class="footer">${this.user.name}</div>
</body>
</html>