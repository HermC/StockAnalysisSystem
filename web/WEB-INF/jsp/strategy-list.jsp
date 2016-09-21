<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String url = request.getScheme()+"://"+ request.getServerName()+request.getRequestURI()+"?"+request.getQueryString();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <link type="text/css" rel="stylesheet" href="resources/plugin/font-awesome-4.6.3/css/font-awesome.min.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/reset.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/common.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/strategy.css"/>

    <script>
        var strategy_list_data = ${strategy_list};
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/strategy.js"></script>

    <!-- Insert this line after script imports  -->
    <script>if (window.module) module = window.module;</script>

    <title>策略列表-Ascending</title>
</head>
<body>
<img id="full_background" src="resources/img/background/index_1.png"/>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
    <jsp:param name="stockList" value="${stockList}"/>
    <jsp:param name="navIndex" value="4"/>
</jsp:include>
<div id="main-page">
    <div class="strategy-list-container">
        <h1><img src="resources/img/logo_s.png">&nbsp;我的策略</h1>

        <button id="add_new_strategy" type="button" class="edit-button">新增策略 <i class="fa fa-plus"></i></button>

        <br>
        <br>

        <div class="column strategy-header">
            <span class="column-item u1of10"> </span>
            <span class="column-item">名称</span>
            <span class="column-item">最后修改时间</span>
            <span class="column-item">代码/流程图</span>
        </div>
        <div class="column-wrapper strategy-list">
            <c:forEach var="strategy" items="${strategy_list}" varStatus="s">
                <div class="column strategy-item">
                    <span class="column-item u1of10 delete-strategy"><i class="fa fa-close"></i></span>
                    <div class="column-item strategy-info column">
                        <span class="column-item strategy-name">${strategy.strategyname}</span>
                        <span class="column-item">${strategy.updateAt}</span>
                        <c:if test="${strategy.isJson==1}">
                            <span class="column-item">流程图</span>
                        </c:if>
                        <c:if test="${strategy.isJson!=1}">
                            <span class="column-item">代码</span>
                        </c:if>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>
</div>
</body>
</html>
