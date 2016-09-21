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

    <link type="text/css" rel="stylesheet" href="resources/plugin/Trumbowyg-master/dist/ui/trumbowyg.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/reset.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/common.css"/>
    <link type="text/css" rel="stylesheet" href="resources/plugin/font-awesome-4.6.3/css/font-awesome.min.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/forum-editor.css"/>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/Trumbowyg-master/dist/trumbowyg.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-3.3.5/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/forum-editor.js"></script>

    <!-- Insert this line after script imports  -->
    <script>if (window.module) module = window.module;</script>

    <title>我的帖子-Ascending</title>
</head>
<body>
<img id="full_background" src="resources/img/background/index_3.png"/>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
    <jsp:param name="stockList" value="${stockList}"/>
    <jsp:param name="navIndex" value="7"/>
</jsp:include>
<div id="main-page">
    <div class="forum-editor-container">
        <h1><img src="resources/img/logo_s.png"/> 我的帖子</h1>
        <br>
        <br>
        <div class="theme-wrapper column">
            <span>主题</span>
            <input id="theme" class="column-item" type="text"/>
        </div>
        <br>
        <div class="editor-wrapper">
            <textarea id="trumbowyg-editor">

            </textarea>
        </div>

        <br>
        <button id="upload" class="edit-button" type="button">发布</button>
    </div>
</div>
</body>
</html>
