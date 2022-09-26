<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/main.css" />
    <title>Main page</title>
</head>
<body>
<main class="page">
    <section class="grid-section header">
        <span class="centered">Solovev Pavel Andreevich. P32302</span>

        <a href="${pageContext.request.contextPath}/">Hello Servlet</a>

        <span class="centered">3114</span>
    </section>
    <section class="grid-section" id="canvas-container">
        <label class="switch">
            <input id="toggle-canvas" type="checkbox">
            <span class="slider round canvas-slider"></span>
        </label>
        <canvas class="axis-canvas" id="axis-canvas"></canvas>
        <span class="axis-canvas" id="axis-canvas-3d" style="display: none"></span>
    </section>

    <div class="grid-section input-section">
        <form id="input-form" novalidate>
            <div class="input-container" id="r-container">
                <span class="input-label">R:</span>
                <section class="pretty-checkboxes" id="form-checkboxes">
                    <label class="input-field backlight clickable"><input name="paramR" type="checkbox" value="1"
                                                    checked><span>1</span></label>
                    <label class="input-field backlight clickable"><input name="paramR" type="checkbox" value="1.5"><span>1.5</span></label>
                    <label class="input-field backlight clickable"><input name="paramR" type="checkbox" value="2"><span>2</span></label>
                    <label class="input-field backlight clickable"><input name="paramR" type="checkbox" value="2.5"><span>2.5</span></label>
                    <label class="input-field backlight clickable"><input name="paramR" type="checkbox" value="3"><span>3</span></label>
                </section>
            </div>
            <div class="input-container" id="x-container">
                <label class="input-label" for="x-input">X:</label>
                <select class="input-field" id="x-input" name="paramX" required="required">
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option selected value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div class="input-container" id="y-container">
                <label class="input-label" for="y-input">Y:</label>
                <input autocomplete="off" class="input-field numeric-input" id="y-input"
                       max="5" maxlength="4" min="-3"
                       name="paramY" placeholder="-3..5" required="required" step="0.01"
                       type="number" value="0">
            </div>
            <div class="submit-container">
                <button class="input-field backlight clickable" id="submit" type="button">Submit</button>
                <button class="input-field backlight clickable" id="reset" type="reset">Reset</button>
            </div>
        </form>
    </div>

    <section class="grid-section results-table">
        <iframe name="hit-results" id="table-container_frame" class="full-block">
        <%--    onload="resizeIframe(this) --%>
            hits history
        </iframe>
    </section>
</main>
<script type="module" src="${pageContext.request.contextPath}/static/script.js"></script>
</body>
</html>