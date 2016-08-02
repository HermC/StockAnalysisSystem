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

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery.cookie.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

    <script type="text/javascript">
        window.onload = function() {
            var isVisited = $.cookie('visited');
//            if(isVisited==undefined){
//                $.cookie('visited', "true", {
//                    expires: 100,
//                    path: "/"
//                });
                window.location.href = "welcome.do";
//            }else{
//                window.location.href = "index.do";
//            }
        }
    </script>
</head>
<body>
    <p></p>
</body>