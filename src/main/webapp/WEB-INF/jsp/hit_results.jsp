<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Hit results</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/styles-table.css"/>
</head>
<body>
<div id="table-container">
    <table id="result-table">
        <thead>
        <tr>
            <th class="coords-col">X</th>
            <th class="coords-col">Y</th>
            <th class="coords-col">R</th>
            <th class="result-col">Hit result</th>
            <th class="current_time-col">Current time</th>
            <th class="exec_time-col">Execution time</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${hitResults}" var="point">
            <tr>
                <td class=".table-x_val"><c:out value="${point.x}"/></td>
                <td class=".table-y_val"><c:out value="${point.y}"/></td>
                <td class=".table-r_val"><c:out value="${point.r}"/></td>
                <td class=".table-hit_res">${point.hit}</td>
                <td><fmt:formatDate value="${point.hitTime}" pattern="HH:mm:ss"/></td>
                <td>${point.executionTimeMs}ms</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
</body>
</html>
