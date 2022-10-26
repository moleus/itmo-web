<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Web Login</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/styles-auth.css"/>
</head>
<body>
<main class="login-page">
    <section class="login-heading">
        <span class="centered">Login</span>
    </section>
    <section class="login-input-form">
        <form class="centered">
            <div class="input-container">
                <label class="input-label" for="username">Username</label>
                <input class="input-field" id="username" name="username" type="text" minlength="4"/>
            </div>
            <div class="input-container">
                <label class="input-label" for="password">Password</label>
                <input class="input-field" id="password" name="password" type="password" minlength="4"/>
            </div>
            <div class="input-container">
                <button class="input-field backlight clickable" id="login-button" type="button">Login</button>
                <button class="input-field backlight clickable" id="register-button" type="button">Register</button>
            </div>
            <div class="error-box input-container">
                <p id="message-box"></p>
            </div>
        </form>
    </section>
</main>
<script type="module" src="${pageContext.request.contextPath}/static/login_script.js"></script>
</body>
</html>
