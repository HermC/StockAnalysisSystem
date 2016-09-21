<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" charset="UTF-8">
    <title>行业-Ascending</title>

    <link rel="icon" type="image/png" sizes="192x192"  href="resources/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="resources/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="resources/img/favicon/manifest.json">

    <link rel="stylesheet" href="<c:url value="resources/bundle/reset.css" />"/>
    <link rel="stylesheet" href="<c:url value="resources/bundle/common.css"/>"/>
    <link rel="stylesheet" href="<c:url value="resources/bundle/industry.css"/>"/>
    <link rel="stylesheet" href="<c:url value="resources/js/perfect-scrollbar/dist/css/perfect-scrollbar.css"/>"/>
    <%--<link rel="stylesheet" href="<c:url value="resources/js/perfect-scrollbar/dist/css/perfect-scrollbar.min.css"/>"/>--%>
    <!--JavaScript-->
    <script>
        var industry_stock = ${industryStocks};
        var stockList = ${stockList};
        <%--console.log(stockList);--%>
        <%--console.log(industry_stock);--%>
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/gsap/src/uncompressed/TweenMax.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/perfect-scrollbar/dist/js/perfect-scrollbar.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/industry.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/header.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

</head>
<body>
<img id="full_background" src="resources/img/background/background1.png">

<c:choose>
    <c:when test="${userInfo!=null}">
        <jsp:include page="usernav.jsp" flush="true">
            <jsp:param name="userInfo" value="${userInfo}"/>
            <jsp:param name="stockList" value="${stockList}"/>
            <jsp:param name="navIndex" value="1"/>
        </jsp:include>
        <div id="main-page">
            <div class="main-content">

                <ul id="pointer_wrapper">
                    <li id="pointer"></li>
                </ul>

                <div class="industry_rank">
                    <div class="industry_rank_grade_wrapper">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">行业评分榜</p>
                        <table id="industry_rank_total"  class="industry_rank_total">
                            <tr>
                                <th class="column_rank">排名</th>
                                <th class="column_name">行业</th>
                                <th class="column_grade">总分</th>

                                <th class="column_grade column_toggle">市盈率</th>
                                <th class="column_grade column_toggle">市净率</th>
                                <th class="column_grade column_toggle">涨跌幅</th>
                                <th class="column_grade column_toggle">量比</th>
                                <th class="column_grade column_toggle">委托盘</th>
                            </tr>

                            <c:forEach items="${industries}" var="industry" varStatus="s">
                                <tr>
                                    <td>${industry.rank}</td>
                                    <td class="column_name">${industry.industryText}</td>
                                    <td>${industry.score}</td>
                                    <td class="column_toggle">${industry.peAssess}</td>
                                    <td class="column_toggle">${industry.pbAssess}</td>
                                    <td class="column_toggle">${industry.updownAssess}</td>
                                    <td class="column_toggle">${industry.volumeAssess}</td>
                                    <td class="column_toggle">${industry.weibiAssess}</td>
                                </tr>
                            </c:forEach>
                                <%--<tr>--%>
                                <%--<td>2</td>--%>
                                <%--<td>金融业</td>--%>
                                <%--<td>98</td>--%>
                                <%--<td class="column_toggle">23</td>--%>
                                <%--<td class="column_toggle">23</td>--%>
                                <%--<td class="column_toggle">23</td>--%>
                                <%--<td class="column_toggle">23</td>--%>
                                <%--<td class="column_toggle">23</td>--%>
                                <%--</tr>--%>

                        </table>
                    </div>

                    <div id="stockListWrapper" class="stock_rank_grade_wrapper">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">行业股票评分榜<button id="more">&lt;&lt;</button></p>

                        <div id="table_wrapper">
                            <table id="stock_rank_total"  class="industry_rank_total">
                                <tr>
                                    <th class="column_rank">排名</th>
                                    <th class="column_name_id">股票</th>
                                    <th class="column_last">总分</th>

                                    <th class="column_grade column_toggle column_hide">市盈率</th>
                                    <th class="column_grade column_toggle column_hide">市净率</th>
                                    <th class="column_grade column_toggle column_hide">涨跌幅</th>
                                    <th class="column_grade column_toggle column_hide">量比</th>
                                    <th class="column_grade column_toggle column_hide">委托盘</th>
                                </tr>
                                    <%--<tr>--%>
                                    <%--<td>1</td>--%>
                                    <%--<td>浦发银行<span>sh600000</span></td>--%>
                                    <%--<td>96</td>--%>
                                    <%--<td class="column_toggle column_hide">23</td>--%>
                                    <%--<td class="column_toggle column_hide">23</td>--%>
                                    <%--<td class="column_toggle column_hide">23</td>--%>
                                    <%--<td class="column_toggle column_hide">23</td>--%>
                                    <%--<td class="column_toggle column_hide">23</td>--%>
                                    <%--</tr>--%>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </c:when>
    <c:otherwise>
        <jsp:include page="header.jsp" flush="true"/>
        <div class="main-content">

            <ul id="pointer_wrapper">
                <li id="pointer"></li>
            </ul>

            <div class="industry_rank">
                <div class="industry_rank_grade_wrapper">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">行业评分榜</p>
                    <table id="industry_rank_total"  class="industry_rank_total">
                        <tr>
                            <th class="column_rank">排名</th>
                            <th class="column_name">行业</th>
                            <th class="column_grade">总分</th>

                            <th class="column_grade column_toggle">市盈率</th>
                            <th class="column_grade column_toggle">市净率</th>
                            <th class="column_grade column_toggle">涨跌幅</th>
                            <th class="column_grade column_toggle">量比</th>
                            <th class="column_grade column_toggle">委托盘</th>
                        </tr>

                        <c:forEach items="${industries}" var="industry" varStatus="s">
                            <tr>
                                <td>${industry.rank}</td>
                                <td class="column_name">${industry.industryText}</td>
                                <td>${industry.score}</td>
                                <td class="column_toggle">${industry.peAssess}</td>
                                <td class="column_toggle">${industry.pbAssess}</td>
                                <td class="column_toggle">${industry.updownAssess}</td>
                                <td class="column_toggle">${industry.volumeAssess}</td>
                                <td class="column_toggle">${industry.weibiAssess}</td>
                            </tr>
                        </c:forEach>
                            <%--<tr>--%>
                            <%--<td>2</td>--%>
                            <%--<td>金融业</td>--%>
                            <%--<td>98</td>--%>
                            <%--<td class="column_toggle">23</td>--%>
                            <%--<td class="column_toggle">23</td>--%>
                            <%--<td class="column_toggle">23</td>--%>
                            <%--<td class="column_toggle">23</td>--%>
                            <%--<td class="column_toggle">23</td>--%>
                            <%--</tr>--%>

                    </table>
                </div>

                <div id="stockListWrapper" class="stock_rank_grade_wrapper">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">行业股票评分榜<button id="more">&lt;&lt;</button></p>

                    <div id="table_wrapper">
                        <table id="stock_rank_total"  class="industry_rank_total">
                            <tr>
                                <th class="column_rank">排名</th>
                                <th class="column_name_id">股票</th>
                                <th class="column_last">总分</th>

                                <th class="column_grade column_toggle column_hide">市盈率</th>
                                <th class="column_grade column_toggle column_hide">市净率</th>
                                <th class="column_grade column_toggle column_hide">涨跌幅</th>
                                <th class="column_grade column_toggle column_hide">量比</th>
                                <th class="column_grade column_toggle column_hide">委托盘</th>
                            </tr>
                                <%--<tr>--%>
                                <%--<td>1</td>--%>
                                <%--<td>浦发银行<span>sh600000</span></td>--%>
                                <%--<td>96</td>--%>
                                <%--<td class="column_toggle column_hide">23</td>--%>
                                <%--<td class="column_toggle column_hide">23</td>--%>
                                <%--<td class="column_toggle column_hide">23</td>--%>
                                <%--<td class="column_toggle column_hide">23</td>--%>
                                <%--<td class="column_toggle column_hide">23</td>--%>
                                <%--</tr>--%>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </c:otherwise>
</c:choose>
<%@ include file="footer.jsp"%>
</body>
</html>
