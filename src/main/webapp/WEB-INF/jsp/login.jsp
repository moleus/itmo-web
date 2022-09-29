<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Web Login</title>
</head>
<body>
<form action="login" method="POST">
<%--    <c:if test="${not empty errorMessage}">--%>
<%--        * error: ${errorMessage}--%>
<%--    </c:if>--%>
    <label>
        <input type="text" name="username"/>
    </label>Username<br/><br/>
    <label>
        <input type="password" name="password"/>
    </label>Password<br/><br/>
    <input type="submit" value="login"/>"
</form>
</body>
</html>
