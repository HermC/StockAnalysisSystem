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

    <title>Hello,Ascending!</title>

    <link rel="icon" type="image/png" sizes="192x192"  href="resources/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="resources/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="resources/img/favicon/manifest.json">


    <link rel="stylesheet" type="text/css" href="resources/bundle/reset.css">
    <link rel="stylesheet" type="text/css" href="resources/bundle/welcome.css">
    <link rel="stylesheet" type="text/css" href="resources/bundle/animate.css">

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/welcome.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>

    <%--<script>window.$ = window.jQuery = require('resources/js/jquery-2.2.3.min.js');</script>--%>

    <script type="text/javascript" src="resources/plugin/gsap/src/uncompressed/TweenMax.js"></script>
    <script type="text/javascript" src="resources/plugin/gsap/src/uncompressed/plugins/ScrollToPlugin.js"></script>
    <script type="text/javascript" src="resources/js/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"></script>
    <script type="text/javascript" src="resources/js/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

</head>
<body>

<div id="coverage_back"></div>
<div id="coverage" class="block_one">
    <div id="coverage_title">
        <h1><span>A</span>scending</h1>
        <h2>Awesome Stock Analysis System</h2>
        <a href="index.do" target="_blank"><h3>start voyage directly</h3></a>
        <a href="http://114.55.35.12/141250174_cseiii_AnyQuant/StocksAnalysisSystem.git" target="_blank">
            <h6>Or visit git homepage</h6>
        </a>
    </div>
</div>

<div id="brief_intro" class="block_two">
    <div class="brief_intro_wrapper">
        <div class="brief_intro_item">
            <img class="brief_intro_item_img" src="resources/img/intro_1.png"/>
            <h2>多维分析</h2>
            <div id="move_trigger" class="brief_intro_direction">
                <div class="item_wrapper"><div class="icon"></div><h3>数据全面</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>信息全面</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>评估排名</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>大盘相关性</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>实时数据</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>模型预测</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>特殊预测</h3></div>
            </div>
        </div>

        <div class="brief_intro_item">
            <img class="brief_intro_item_img" src="resources/img/intro_2.png"/>
            <h2>宏观感知</h2>
            <div class="brief_intro_direction">
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>涨停推荐</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>特殊推荐</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>涨跌幅区间</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>行业排名</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>行业股票排名</h3></div>
            </div>
        </div>

        <div class="brief_intro_item">
            <img class="brief_intro_item_img" src="resources/img/intro_3.png"/>
            <h2>最新资讯</h2>
            <div class="brief_intro_direction">
                <div class="item_wrapper"><div class="icon"></div><h3>财经新闻</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>证券新闻</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>公司新闻</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>股市热点</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>行业涨幅榜</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>个股涨幅榜</h3></div>
            </div>
        </div>

        <div class="brief_intro_item">
            <img class="brief_intro_item_img" src="resources/img/intro_4.png"/>
            <h2>实用方便</h2>
            <div class="brief_intro_direction">
                <div class="item_wrapper"><div class="icon"></div><h3>无需注册</h3></div>
                <div class="item_wrapper"><div class="icon"></div><h3>方便自选对比</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>模糊搜索</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>自动刷新</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>对比增删改</h3></div>
                <div class="item_wrapper"><div class="icon icon_show"></div><h3>响应式布局</h3></div>
            </div>
        </div>
    </div>
</div>

<!--<div id="team" style="display: none">-->
<div id="team">
    <div id="#team_name_wrapper">
        <div id="team_name"><img src="resources/img/dracarys.png"/></div>
    </div>
    <div id="team_members">
        <div id="member_1" class="team_member">
            <div class="team_member_picture team_member_left"><img id="photo1" class="photo animated" src="resources/img/t_yzy.png"/></div>
            <div id="info1" class="team_member_info team_member_right animated">
                <h1>尹子越<span>老司机/灰姑娘</span></h1>
                <h2><img src="resources/img/pointer_right.png">前端（图表和ajax）+后端（controller）</h2>
                <h2><img src="resources/img/pointer_right.png">服务器搭建</h2>
            </div>
        </div>

        <div id="member_2" class="team_member">
            <div id="info2" class="team_member_info team_member_left animated">
                <h1><span>黄勇/铁甲蛹/黄金脆皮鸡/小可爱</span>张晨剑</h1>
                <h2>分析函数<img src="resources/img/pointer_left.png"></h2>
                <h2>后端（逻辑数据层）<img src="resources/img/pointer_left.png"></h2>
            </div>
            <div class="team_member_picture team_member_right"><img id="photo2" class="photo animated" src="resources/img/t_hy.png"/></div>
        </div>

        <div id="member_3" class="team_member">
            <div class="team_member_picture team_member_left"><img id="photo3" class="photo animated" src="resources/img/t_zsd.png"/></div>
            <div id="info3" class="team_member_info team_member_right animated">
                <h1>张斯栋<span>一个没有绰号的正经人</span></h1>
                <h2><img src="resources/img/pointer_right.png">预测建模</h2>
                <h2><img src="resources/img/pointer_right.png">数据库搭建和维护</h2>
                <h2><img src="resources/img/pointer_right.png">实时数据接口</h2>
            </div>
        </div>

        <div id="member_4" class="team_member">
            <div id="info4" class="team_member_info team_member_left animated">
                <h1><span>监工/灰姑娘的姐姐</span>张馨中</h1>
                <h2>界面设计<img src="resources/img/pointer_left.png"></h2>
                <h2>前端（静态和交互js）<img src="resources/img/pointer_left.png"></h2>
            </div>
            <div class="team_member_picture team_member_right"><img id="photo4" class="photo animated" src="resources/img/t_zxz.png"/></div>
        </div>
    </div>
</div>

<div id="goto_wrapper">
    <a href="index.do"><button id="goto_index">前往Ascending</button></a>
    <a target="_blank" href="http://114.55.35.12/141250174_cseiii_AnyQuant/StocksAnalysisSystem.git">
        <button id="go_git">前往git主页</button>
    </a>
</div>

</body>
</html>
