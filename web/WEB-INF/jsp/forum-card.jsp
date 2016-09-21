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
    <link type="text/css" rel="stylesheet" href="resources/bundle/forum-card.css"/>

    <script>
        var topicInfo = ${topicInfo};
        console.log(topicInfo);
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/Trumbowyg-master/dist/trumbowyg.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-3.3.5/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/forum-card.js"></script>

    <!-- Insert this line after script imports  -->
    <script>if (window.module) module = window.module;</script>
    <title>论坛-Ascending</title>
</head>
<body>
<img id="full_background" src="resources/img/background/index_3.png"/>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
    <jsp:param name="stockList" value="${stockList}"/>
    <jsp:param name="navIndex" value="7"/>
</jsp:include>
<div id="main-page">
    <div class="reply-editor-container" style="display: none">
        <div class="reply-editor-wrapper">
            <span>回复</span>&nbsp;&nbsp;<span id="reply_id">ID</span>
            <textarea id="reply_content">

            </textarea>
            <br>
            <button id="upload_reply" class="edit-button" type="button">回复</button>
        </div>
    </div>
    <div class="forum-card-container">
        <h1><img src="resources/img/logo_s.png"/> ${topicInfo.topicid}</h1>
        <br>
        <div class="card-wrapper">
            ${topicInfo.content}
        </div>
        <br>
        <button id="reply_topic" class="edit-button" type="button">回复</button>
    </div>
    <br>
    <div class="reply-container">
        <h2>讨论</h2>
        <br>
        <div id="reply_list" class="reply-wrapper">
            <c:forEach items="${topicInfo.replyPos}" var="reply" varStatus="s">
                <div class="reply-item">
                    <div class="media-figure row">
                        <img class="row-item" src="resources/img/user/default.jpg"/>
                        <div class="row-item">
                            <span>${reply.username}</span>&nbsp;&nbsp;<span>回复</span>&nbsp;&nbsp;<span>${reply.responsed_username}</span>
                        </div>
                    </div>
                    <div class="media-body">
                        ${reply.content}
                        <%--<p>这sdjflsdjfljasfasdjfofsdflajsfosdosfddddfsfadfsfkddddddddddsfasfsafddddddddddd</p>--%>
                    </div>
                    <div class="media-reply">
                        <a class="reply-button">回复</a>
                    </div>
                </div>
            </c:forEach>
            <%--<div class="reply-item">--%>
                <%--<div class="media-figure row">--%>
                    <%--<img class="row-item" src="resources/img/user/default.jpg"/>--%>
                    <%--<div class="row-item">--%>
                        <%--<span>id</span>&nbsp;&nbsp;<span>回复</span>&nbsp;&nbsp;<span>id2</span>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="media-body">--%>
                    <%--<p>这sdjflsdjfljasfasdjfofsdflajsfosdosfddddfsfadfsfkddddddddddsfasfsafddddddddddd</p>--%>
                <%--</div>--%>
                <%--<div class="media-reply">--%>
                    <%--<a class="reply-button">回复</a>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="reply-item">--%>
                <%--<div class="media-figure row">--%>
                    <%--<img class="row-item" src="resources/img/user/default.jpg"/>--%>
                    <%--<div class="row-item">--%>
                        <%--<span>id</span>&nbsp;&nbsp;<span>回复</span>&nbsp;&nbsp;<span>id2</span>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="media-body">--%>
                    <%--<p>这sdjflsdjfljasfasdjfofsdflajsfosdosfddddfsfadfsfkddddddddddsfasfsafddddddddddd</p>--%>
                <%--</div>--%>
                <%--<div class="media-reply">--%>
                    <%--<a class="reply-button">回复</a>--%>
                <%--</div>--%>
            <%--</div>--%>
        </div>
    </div>
</div>
</body>
</html>
