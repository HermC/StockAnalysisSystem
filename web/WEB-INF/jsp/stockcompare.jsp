<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" charset="UTF-8">
    <title>股票对比-Ascending</title>

    <script>
        var path = "<%=basePath%>";
        var stockList = ${stockList};
        var stocks = ${stocks};
    </script>

    <link rel="icon" type="image/png" sizes="192x192"  href="resources/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="resources/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="resources/img/favicon/manifest.json">

    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/reset.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/common.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/stockCompare.css"/>">
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
    <script type="text/javascript" rel="script" src="resources/js/stockcompare.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

</head>
<body>
<img id="full_background" src="resources/img/background/background3.png">
<div class="blanket_toggle_wrapper"><div id="blanket_toggle" class="blanket_close"></div></div>

<c:choose>
    <c:when test="${userInfo!=null}">
        <jsp:include page="usernav.jsp" flush="true">
            <jsp:param name="userInfo" value="${userInfo}"/>
            <jsp:param name="stockList" value="${stockList}"/>
            <jsp:param name="navIndex" value="2"/>
        </jsp:include>
        <div id="main-page">
            <div id="main-content" class="main-content">
                <div id="blanket_wrapper" class="stock_blanket">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">对比股票<img id="add" src="resources/img/add.png"></p>

                    <ul id="blanket" class="">

                    </ul>

                    <button id="clear">清空列表</button>
                    <div id="clear_confirm" style="display: none">
                        <p>确定清空对比列表吗？</p>
                        <div>
                            <h3 id="clear_ok">确定</h3>
                            <h3 id="clear_cancel">取消</h3>
                        </div>
                    </div>
                </div>

                <div class="compare_main">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">评分对比</p>
                    <div id="compare_grade">

                    </div>

                    <p class="stock_content_title"><img src="resources/img/logo_s.png">未来走势对比</p>
                    <div id="compare_forecast">

                    </div>
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">图表对比</p>
                    <div id="compare_graph">
                        <div class="basic_graph_wrapper_other">
                            <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">MACD</p>
                            <div id="macd_graph" class="graph_basic_other">

                            </div>
                        </div>

                        <div class="basic_graph_wrapper_other">
                            <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">RSI</p>
                            <div id="rsi_graph" class="graph_basic_other">

                            </div>
                        </div>

                        <div class="basic_graph_wrapper_other">
                            <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">KDJ</p>
                            <div id="kdj_graph" class="graph_basic_other">

                            </div>
                        </div>

                        <div class="basic_graph_wrapper_other">
                            <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">BOLL</p>
                            <div id="boll_graph" class="graph_basic_other">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </c:when>
    <c:otherwise>
        <jsp:include page="header.jsp" flush="true"/>
        <div id="main-content" class="main-content">
            <div id="blanket_wrapper" class="stock_blanket">
                <p class="stock_content_title"><img src="resources/img/logo_s.png">对比股票<img id="add" src="resources/img/add.png"></p>

                <ul id="blanket" class="">

                </ul>

                <button id="clear">清空列表</button>
                <div id="clear_confirm" style="display: none">
                    <p>确定清空对比列表吗？</p>
                    <div>
                        <h3 id="clear_ok">确定</h3>
                        <h3 id="clear_cancel">取消</h3>
                    </div>
                </div>
            </div>

            <div class="compare_main">
                <p class="stock_content_title"><img src="resources/img/logo_s.png">评分对比</p>
                <div id="compare_grade">

                </div>

                <p class="stock_content_title"><img src="resources/img/logo_s.png">未来走势对比</p>
                <div id="compare_forecast">

                </div>
                <p class="stock_content_title"><img src="resources/img/logo_s.png">图表对比</p>
                <div id="compare_graph">
                    <div class="basic_graph_wrapper_other">
                        <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">MACD</p>
                        <div id="macd_graph" class="graph_basic_other">

                        </div>
                    </div>

                    <div class="basic_graph_wrapper_other">
                        <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">RSI</p>
                        <div id="rsi_graph" class="graph_basic_other">

                        </div>
                    </div>

                    <div class="basic_graph_wrapper_other">
                        <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">KDJ</p>
                        <div id="kdj_graph" class="graph_basic_other">

                        </div>
                    </div>

                    <div class="basic_graph_wrapper_other">
                        <p class="stock_content_title title_sec"><img src="resources/img/logo_sh.png">BOLL</p>
                        <div id="boll_graph" class="graph_basic_other">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </c:otherwise>
</c:choose>
<%@ include file="footer.jsp"%>
</body>
</html>