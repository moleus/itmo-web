<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Web Login</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/styles-login.css"/>
</head>
<body>
<main class="login-page">
    <section class="login-heading">
        <span class="centered">Login</span>
    </section>
    <section class="login-input-form">
        <form class="centered" action="login" method="POST">
            <div class="input-container">
                <label class="input-label" for="username">Username</label>
                <input class="input-field" id="username" name="username" type="text" minlength="4"/>
            </div>
            <div class="input-container">
                <label class="input-label" for="password">Password</label>
                <input class="input-field" id="password" name="password" type="password" minlength="4"/>
            </div>
            <div class="input-container">
                <button class="input-field backlight clickable" type="submit">Login</button>
            </div>
            <div class="error-box input-container">
                <c:if test="${not empty errorMessage}">
                    error: ${errorMessage}
                </c:if>
            </div>
        </form>
    </section>
</main>
</body>
</html>
