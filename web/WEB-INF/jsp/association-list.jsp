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

    <link type="text/css" rel="stylesheet" href="resources/plugin/bootstrap-3.3.5/dist/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="resources/plugin/select2-4.0.3/dist/css/select2.css"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/plugin/font-awesome-4.6.3/css/font-awesome.min.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/reset.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/common.css" />">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/association.css"/>">

    <script>
        var associationList;
        <c:if test="${associationList!=null}">
        associationList = ${associationList};
        </c:if>
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-3.3.5/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/select2-4.0.3/dist/js/select2.full.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery.form.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/association.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

    <title>社群-Ascending</title>
</head>
<body>
<img id="full_background" src="resources/img/background/index_2.png"/>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
    <jsp:param name="stockList" value="${stockList}"/>
    <jsp:param name="navIndex" value="6"/>
</jsp:include>
<div id="main-page">
    <div class="association-outer" style="display: none">
        <div class="association-info-wrapper">
            <h1>社群#<span id="association_id">1</span></h1>
            <br>
            <h2>社群成员</h2>
            <br>
            <div class="column table-header">
                <span class="column-item">成员ID</span>
                <span class="column-item">成员名称</span>
                <span class="column-item">个人收益</span>
            </div>
            <div id="association_memeber_wrapper">
                <%--<c:forEach items="${userList}" var="user" varStatus="s">--%>
                <%--<div class="column">--%>
                <%--<span class="column-item">${user.UserId}</span>--%>
                <%--<span class="column-item">${user.}</span>--%>
                <%--</div>--%>
                <%--</c:forEach>--%>
                <div class="column">
                    <span class="column-item">成员1</span>
                    <span class="column-item">成员1</span>
                    <span class="column-item">12%</span>
                </div>
                <div class="column">
                    <span class="column-item">成员2</span>
                    <span class="column-item">成员2</span>
                    <span class="column-item">12%</span>
                </div>
                <div class="column">
                    <span class="column-item">成员3</span>
                    <span class="column-item">成员3</span>
                    <span class="column-item">12%</span>
                </div>
            </div>
        </div>
    </div>
    <div class="association-container">
        <h1><img src="resources/img/logo_s.png"/> 社群</h1>
        <br>
        <button id="add_new_association" class="edit-button" type="button"><i class="fa fa-plus"></i> 新建社群</button>
        <div class="new-association-wrapper" style="display: none">
            <div class="column">
                <label class="column-item u1of4">社群名称</label>
                <input id="new_association_name" type="text" class="column-item"/>
            </div>
            <div class="column">
                <label class="column-item u1of4">社群成员</label>
                <select id="new_association_memebers" class="column-item js-example-basic-multiple" multiple="multiple">
                    <c:forEach items="${userList}" var="user" varStatus="s">
                        <option value="${user.UserId}">${user.UserId}--${user.UserName}</option>
                    </c:forEach>
                </select>
            </div>
            <br>
            <div class="column" style="float: right">
                <button id="confirm_new_association" class="edit-button" type="button">确认新增</button>
                &nbsp;
                <button id="cancel_new_association" class="edit-button" type="button">取消新增</button>
            </div>
            <br>
        </div>
        <br>
        <br>
        <div class="association-wrapper">
            <div class="column table-header">
                <span class="column-item">社群ID</span>
                <span class="column-item">社群名称</span>
                <span class="column-item">社群收益</span>
            </div>

            <div id="association_list" class="column-wrapper">
                <c:forEach items="${associationList}" var="association" varStatus="s">
                    <div class="column table-item">
                        <span class="column-item">${association.sgid}</span>
                        <span class="column-item">${association.sgname}</span>
                        <span class="column-item">${association.maxearn_average}</span>
                    </div>
                </c:forEach>
            </div>
        </div>
    </div>
</div>
</body>
</html>
