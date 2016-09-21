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
    <link type="text/css" rel="stylesheet" href="resources/plugin/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css"/>
    <link type="text/css" rel="stylesheet" href="resources/css/reset.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/common.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/simulator-transaction.css"/>
    <link type="text/css" rel="stylesheet" href="resources/plugin/font-awesome-4.6.3/css/font-awesome.min.css"/>

    <script>
        var simulator_list_data = ${simulator_list};
        var strategy_list = ${strategy_list};
        var stockpool_list = ${stockpool_list};
        console.log(stockpool_list);
        console.log(simulator_list_data);
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-3.3.5/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/simulator-transaction.js"></script>

    <!-- Insert this line after script imports  -->
    <script>if (window.module) module = window.module;</script>

    <title>模拟交易-Ascending</title>
</head>
<body>
<img id="full_background" src="resources/img/background/welcome_back1.png"/>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
    <jsp:param name="stockList" value="${stockList}"/>
    <jsp:param name="navIndex" value="5"/>
</jsp:include>
<div id="main-page">
    <div class="simulator-list-container">
        <h1><img src="resources/img/logo_s.png"/> 模拟交易</h1>
        <br>
        <button id="add_new_simulator_button" class="edit-button" type="button"><i class="fa fa-plus"></i> 新增模拟交易</button>
        <div class="add-new-simulator-wrapper" style="display: none">
            <h3>设置</h3>
            <div class="config-wrapper">
                <div class="column config-item">
                    <label class="column-item u1of4">名称</label>
                    <input id="simulator_name" type="text" class="column-item"/>
                </div>
                <div class="column config-item">
                    <label class="column-item u1of4">策略</label>
                    <select id="strategy_selection" class="column-item">
                        <option class="display-none" value="">选择一个策略...</option>
                        <c:forEach items="${strategy_list}" var="strategy" varStatus="s">
                            <option value="${strategy.strategyid}">${strategy.strategyid}--${strategy.strategyname}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="column config-item">
                    <label class="config-item u1of4">股票池</label>
                    <select id="stockpool_selection" class="column-item">
                        <option class="display-none" value="">选择一个股票池...</option>
                        <c:forEach items="${stockpool_list}" var="stockpool" varStatus="s">
                            <option value="${stockpool.poolId}">${stockpool.poolId}--${stockpool.poolName}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="column config-item">
                    <label class="column-item u1of4">初始资金</label>
                    <input id="start_amount" type="text" class="column-item"/>
                </div>
                <div class="column config-item">
                    <label class="column-item u1of4">开始日期</label>
                    <input id="start_date" type="text" class="column-item form_datetime" readonly/>
                </div>
                <div class="column config-item">
                    <button id="add_confirm" class="column-item edit-button" type="button">新增交易</button>
                    <button id="add_cancel" class="column-item edit-button" type="button">取消新增</button>
                </div>
            </div>
        </div>
        <br>
        <br>
        <!--<h2>模拟交易列表</h2>-->

        <div class="selector-wrapper">
            <span class="selector-item selected">全部</span>
            <span class="selector-item">进行中</span>
            <span class="selector-item">已结束</span>
        </div>

        <div class="column simulator-header">
            <span class="column-item u1of20"> </span>
            <span class="column-item">名称</span>
            <span class="column-item">状态</span>
            <span class="column-item">开始时间</span>
            <span class="column-item">结束时间</span>
            <span class="column-item">收益</span>
            <span class="column-item">最大回撤</span>
        </div>
        <div class="column-wrapper simulator-list">
            <c:forEach items="${simulator_list}" var="simulator" varStatus="s">
                <div class="column">
                    <span class="column-item u1of20 delete-simulator"><i class="fa fa-close"></i></span>
                    <a target="_blank" href="user/simulator-info.do?id=${simulator.tradeid}" class="column-item column">
                        <span class="column-item simulator-name">${simulator.tradename}</span>
                        <c:if test='${simulator.state=="1"}'>
                            <span class="column-item is-running">进行中</span>
                        </c:if>
                        <c:if test='${simulator.state!="1"}'>
                            <span class="column-item is-stopped">已结束</span>
                        </c:if>
                        <span class="column-item">${simulator.startdate}</span>
                        <span class="column-item">${simulator.enddate}</span>
                        <span class="column-item">${simulator.earning}</span>
                        <span class="column-item">${simulator.maxDrawdown}</span>
                    </a>
                </div>
            </c:forEach>
        </div>
    </div>
</div>
</body>
</html>
