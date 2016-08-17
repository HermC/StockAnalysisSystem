<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String url = request.getScheme()+"://"+ request.getServerName()+request.getRequestURI()+"?"+request.getQueryString();
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<base href="<%=basePath%>">
<div id="main-nav">
    <div class="user-info">
        <a target="_blank" href="user.do">
            <div class="user-img-container">
                <img id="user-img" src="resources/img/user/default.jpg"/>
            </div>
            <div id="user-name" class="user-nickname">finominon</div>
        </a>
    </div>

    <div class="main-nav-container">
        <a class="main-nav-item" href="index.do" target="_blank">
            <span class="main-nav-point"></span>
            <p class="main-nav-target">首页</p>
        </a>
        <br>
        <br>
        <a class="main-nav-item" href="stock.do?id=sh600000" target="_blank">
            <span class="main-nav-point"></span>
            <p class="main-nav-target">股市行情</p>
        </a>
        <a class="main-nav-item" href="industry.do" target="_blank">
            <span class="main-nav-point"></span>
            <p class="main-nav-target">行业情况</p>
        </a>
        <a class="main-nav-item" href="compare.do" target="_blank">
            <span class="main-nav-point"></span>
            <p class="main-nav-target">股票对比</p>
        </a>
        <br>
        <br>
        <a class="main-nav-item">
            <span class="main-nav-point"></span>
            <p class="main-nav-target">自选股</p>
        </a>
        <a class="main-nav-item">
            <span class="main-nav-point"></span>
            <p class="main-nav-target">策略</p>
        </a>
        <a class="main-nav-item">
            <span class="main-nav-point"></span>
            <p class="main-nav-target">模拟交易</p>
        </a>
    </div>

    <script>
        $(".main-nav-item").on("mouseenter", function() {
            $(this).find(".main-nav-point").addClass("rotation");
        });
        $(".main-nav-item").on("mouseleave", function() {
            $(this).find(".main-nav-point").removeClass("rotation");
        });
    </script>
</div>
</html>
