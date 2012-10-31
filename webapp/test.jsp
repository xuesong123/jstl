<html>
<head>
<title>test.jsp</title>
</head>
<body>
<h1>Hello World !</h1>
<table border="1">
    <c:each items="${this.userList}" var="user" varStatus="status">
        <tr>
            <td style="width: 80px;">${this.user.name}</td>
            <td style="width: 80px;">${this.user.sex}</td>
            <td style="width: 150px;"><c:format value="${this.user.birthday}" pattern="yyyy-MM-dd"/></td>
        </tr>
    </c:each>
</table>
<c:scrollpage pageNum="${this.pageNum}" pageSize="${this.pageSize}" total="${this.total}" className="pagenumber pagebar"/>
</body>
</html>
<%
    response.end();
%>