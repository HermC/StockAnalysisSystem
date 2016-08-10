<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" charset="UTF-8">
    <title>KDJ,RSI,BOLL推荐-Ascending</title>

    <script>
        var path = "<%=basePath%>";
        var stockList = ${stockList};
    </script>

    <link rel="icon" type="image/png" sizes="192x192"  href="resources/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="resources/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="resources/img/favicon/manifest.json">

    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/reset.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/common.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/recommand.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/plugin/perfect-scrollbar/dist/css/perfect-scrollbar.min.css"/>">

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery.cookie.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/gsap/src/uncompressed/TweenMax.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/scrollmagic/scrollmagic/minified/ScrollMagic.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/perfect-scrollbar/dist/js/perfect-scrollbar.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/header.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts/amcharts.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts/serial.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts/radar.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts/themes/dark.js"></script>
    <%--<script type="text/javascript" rel="script" src="resources/js/recommand.js"></script>--%>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

    <script>
        window.onload = function () {
            initialHeader();
        }
    </script>
</head>
<body>
<img id="full_background" src="resources/img/background/background3.png">
<c:choose>
    <c:when test="${userInfo!=null}">
        <jsp:include page="usernav.jsp" flush="true"/>
        <div id="main-page">
            <div id="main-content" class="main-content">
                <div class="recommand_noRank">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">KDJ推荐</p>
                    <h6>K线由下往上穿过D线，有上涨趋势</h6>
                    <c:forEach items="${kdj}" var="kdjS" varStatus="s">
                        <a target="_blank" href="stock.do?id=${kdjS.id}"><h5><p>${kdjS.name}</p> <span>${kdjS.id}</span></h5></a>
                    </c:forEach>
                </div>

                <div class="recommand_noRank">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">RSI推荐</p>
                    <h6>RSI处于高位，强买入</h6>
                    <c:forEach items="${rsi}" var="rsiS" varStatus="s">
                        <a target="_blank" href="stock.do?id=${rsiS.id}"><h5><p>${rsiS.name}</p> <span>${rsiS.id}</span></h5></a>
                    </c:forEach>
                </div>

                <div class="recommand_noRank">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">BOLL推荐</p>
                    <h6>BOLL线开口变窄，价格高于中线，可能上涨</h6>
                    <c:forEach items="${boll}" var="bollS" varStatus="s">
                        <a target="_blank" href="stock.do?id=${bollS.id}"><h5><p>${bollS.name}</p> <span>${bollS.id}</span></h5></a>
                    </c:forEach>
                </div>
            </div>
        </div>
    </c:when>
    <c:otherwise>
        <jsp:include page="header.jsp" flush="true"/>
        <div id="main-content" class="main-content">
            <div class="recommand_noRank">
                <p class="stock_content_title"><img src="resources/img/logo_s.png">KDJ推荐</p>
                <h6>K线由下往上穿过D线，有上涨趋势</h6>
                <c:forEach items="${kdj}" var="kdjS" varStatus="s">
                    <a target="_blank" href="stock.do?id=${kdjS.id}"><h5><p>${kdjS.name}</p> <span>${kdjS.id}</span></h5></a>
                </c:forEach>
            </div>

            <div class="recommand_noRank">
                <p class="stock_content_title"><img src="resources/img/logo_s.png">RSI推荐</p>
                <h6>RSI处于高位，强买入</h6>
                <c:forEach items="${rsi}" var="rsiS" varStatus="s">
                    <a target="_blank" href="stock.do?id=${rsiS.id}"><h5><p>${rsiS.name}</p> <span>${rsiS.id}</span></h5></a>
                </c:forEach>
            </div>

            <div class="recommand_noRank">
                <p class="stock_content_title"><img src="resources/img/logo_s.png">BOLL推荐</p>
                <h6>BOLL线开口变窄，价格高于中线，可能上涨</h6>
                <c:forEach items="${boll}" var="bollS" varStatus="s">
                    <a target="_blank" href="stock.do?id=${bollS.id}"><h5><p>${bollS.name}</p> <span>${bollS.id}</span></h5></a>
                </c:forEach>
            </div>
        </div>
    </c:otherwise>
</c:choose>
<%@ include file="footer.jsp"%>
</body>
</html>
