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

    <link type="text/css" rel="stylesheet" href="resources/bundle/reset.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/common.css"/>
    <link type="text/css" rel="stylesheet" href="resources/bundle/stockpool.css"/>
    <link type="text/css" rel="stylesheet" href="resources/plugin/font-awesome-4.6.3/css/font-awesome.min.css"/>

    <script>
        var stock_pool_list = ${stock_pool_list};
        <c:if test="${stock_pool_list}!=null">
            stock_pool_list = ${stock_pool_list};
        </c:if>
        var stockList = ${stockList};
        console.log(stock_pool_list);
        console.log(stockList);
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/stockpool.js"></script>

    <!-- Insert this line after script imports  -->
    <script>if (window.module) module = window.module;</script>

    <title>股票池-Ascending</title>
</head>
<body>
<img id="full_background" src="resources/img/background/index_2.png"/>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
    <jsp:param name="stockList" value="${stockList}"/>
    <jsp:param name="navIndex" value="3"/>
</jsp:include>
<div id="main-page">
    <div id="stock_editor" class="stock-editor-outer" style="display: none">
        <div class="stock-editor-wrapper">
            <h1><img src="resources/img/logo_s.png"/> 编辑池中股票</h1>
            <br>
            <h2><strong>#1</strong> 股票池1</h2>
            <hr>
            <div class="column input-container">
                <input id="stock_search" class="column-item" type="text"/>
                <button class="edit-button column-item u1of4" type="button"><i class="fa fa-plus"></i> 添加股票</button>
                <div id="stock_search_info" class="stock-search-info" style="display: none;float: left"></div>
            </div>
            <br>
            <div class="column">
                <span class="column-item u1of10"> </span><span class="column-item">股票ID</span><span class="column-item">股票名称</span>
            </div>
            <div id="stock_in_pool" class="column-wrapper">

            </div>
        </div>
    </div>
    <div id="strategy_editor" class="stock-editor-outer" style="display: none">
        <div class="stock-editor-wrapper">
            <h1>编辑运行策略</h1>
            <br>
            <h2><strong>#1</strong> 股票池1</h2>
            <br>
            <button id="add_new_strategy" class="edit-button" type="button"><i class="fa fa-plus"></i> 新增策略</button>
            <div id="new_strategy" style="display: none">
                <div class="column">
                    <span class="column-item u1of10"> </span><span class="column-item">策略ID</span><span class="column-item">策略名称</span>
                </div>
                <div id="my_strategy" class="column-wrapper">
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10 add-strategy"></span><span class="column-item">ID1</span><span class="column-item">策略名称1</span>
                    </div>
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10 add-strategy"></span><span class="column-item">ID2</span><span class="column-item">策略名称2</span>
                    </div>
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10 add-strategy"></span><span class="column-item">ID3</span><span class="column-item">策略名称3</span>
                    </div>
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10 add-strategy"></span><span class="column-item">ID4</span><span class="column-item">策略名称4</span>
                    </div>
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10"></span><span class="column-item">ID4</span><span class="column-item">策略名称4</span>
                    </div>
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10"></span><span class="column-item">ID4</span><span class="column-item">策略名称4</span>
                    </div>
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10"></span><span class="column-item">ID4</span><span class="column-item">策略名称4</span>
                    </div>
                    <div class="column">
                        <span class="fa fa-plus column-item u1of10"></span><span class="column-item">ID4</span><span class="column-item">策略名称4</span>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <h2>运行策略:</h2>
            <div class="column">
                <span class="column-item u1of10"> </span><span class="column-item">策略ID</span><span class="column-item">策略名称</span><span class="column-item">开始时间</span>
            </div>
            <div id="strategy_running" class="column-wrapper">

            </div>
        </div>
    </div>
    <div class="stockpool-body">
        <h1><img src="resources/img/logo_s.png"/> 股票池</h1>

        <br>

        <button id="add_stock_pool" class="edit-button" type="button">添加新的股票池 <i class="fa fa-plus"></i></button>
        <div class="add-stockpool" style="display: none">
            <div class="column">
                <label class="column-item">股票池名称</label>
                <input id="new_stockpool_name" class="column-item" type="text"/>
            </div>
            <br>
            <div style="float: right">
                <button id="confirm_new_stockpool" class="edit-button" type="button">确认新增</button>
                <button id="cancel_new_stockpool" class="edit-button" type="button">取消新增</button>
            </div>
        </div>
        <br>
        <br>

        <div class="selector-wrapper">
            <%--<span class="selector-item selected">股票池1(id1) <i class="fa fa-close delete-pool"></i></span>--%>
            <%--<span class="selector-item">股票池2(id2) <i class="fa fa-close delete-pool"></i></span>--%>
            <%--<span class="selector-item">股票池2(id2) <i class="fa fa-close delete-pool"></i></span>--%>
            <c:forEach items="${stock_pool_list}" var="stockpool" varStatus="s">
                <c:if test="${s.index==0}">
                    <span class="selector-item selected">${stockpool.poolName}(${stockpool.poolId}) <i class="fa fa-close delete-pool"></i></span>
                </c:if>
                <c:if test="${s.index!=0}">
                    <span class="selector-item">${stockpool.poolName}(${stockpool.poolId}) <i class="fa fa-close delete-pool"></i></span>
                </c:if>
            </c:forEach>
        </div>
        <div class="stockpool-container">
            <c:forEach items="${stock_pool_list}" var="stockpool" varStatus="s">
                <div class="stockpool-item" style="display: none">
                    <br>
                    <h2><strong>池中股票</strong> <i class="fa fa-pencil edit-stock"></i></h2>
                    <div class="column table-header">
                        <span class="column-item">股票ID</span>
                        <span class="column-item">股票名称</span>
                        <span class="column-item">昨日收盘</span>
                    </div>
                    <div class="stockpool-stocks column-wrapper">
                        <%--<div class="column">--%>
                        <c:forEach items="${stockpool.stockinfolist}" var="stock" varStatus="s">
                            <c:if test="${s.index%2==0}">
                                <div class="column odd">
                                    <span class="column-item">${stock.stockid}</span>
                                    <span class="column-item">${stock.stockname}</span>
                                    <span class="column-item">${stock.close}</span>
                                </div>
                            </c:if>
                            <c:if test="${s.index%2!=0}">
                                <div class="column even">
                                    <span class="column-item">${stock.stockid}</span>
                                    <span class="column-item">${stock.stockname}</span>
                                    <span class="column-item">${stock.close}</span>
                                </div>
                            </c:if>
                        </c:forEach>
                    </div>

                    <br>
                    <h2><strong>运行策略</strong></h2>
                    <div class="column table-header">
                        <span class="column-item">策略ID</span>
                        <span class="column-item">策略名称</span>
                        <span class="column-item">策略收益</span>
                        <span class="column-item">开始时间</span>
                    </div>
                    <div class="stockpool-strategy column-wrapper">
                        <c:forEach items="${stockpool.vtradelist}" var="vtradelist" varStatus="s">
                            <c:if test="${s.index%2==0}">
                                <div class="column odd">
                                    <span class="column-item">${vtradelist.tradeid}</span>
                                    <span class="column-item">${vtradelist.tradename}</span>
                                    <span class="column-item">${vtradelist.earning}</span>
                                    <span class="column-item">${vtradelist.startdate}</span>
                                </div>
                            </c:if>
                            <c:if test="${s.index%2!=0}">
                                <div class="column even">
                                    <span class="column-item">${vtradelist.tradeid}</span>
                                    <span class="column-item">${vtradelist.tradename}</span>
                                    <span class="column-item">${vtradelist.earning}</span>
                                    <span class="column-item">${vtradelist.startdate}</span>
                                </div>
                            </c:if>
                        </c:forEach>
                    </div>
                </div>
            </c:forEach>

            <%--<div class="stockpool-item">--%>
                <%--<br>--%>
                <%--<h2><strong>池中股票</strong> <i class="fa fa-pencil edit-stock"></i></h2>--%>
                <%--<div class="column table-header">--%>
                    <%--<span class="column-item">股票ID</span>--%>
                    <%--<span class="column-item">股票名称</span>--%>
                    <%--<span class="column-item">昨日收盘</span>--%>
                <%--</div>--%>
                <%--<div class="stockpool-stocks column-wrapper">--%>
                    <%--<div class="column">--%>

                    <%--</div>--%>
                <%--</div>--%>

                <%--<br>--%>
                <%--<h2><strong>池中股票</strong> <i class="fa fa-pencil edit-stock"></i></h2>--%>
                <%--<div class="column table-header">--%>
                    <%--<span class="column-item">策略ID</span>--%>
                    <%--<span class="column-item">策略名城</span>--%>
                    <%--<span class="column-item">策略收益</span>--%>
                    <%--<span class="column-item">开始时间</span>--%>
                <%--</div>--%>
                <%--<div class="stockpool-strategy column-wrapper">--%>
                    <%--<div class="column">--%>

                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="stockpool-item" style="display: none">--%>
                <%--<br>--%>
                <%--<h2><strong>运行策略</strong></h2>--%>
                <%--<div class="column table-header">--%>
                    <%--<span class="column-item">股票ID</span>--%>
                    <%--<span class="column-item">股票名称</span>--%>
                    <%--<span class="column-item">昨日收盘</span>--%>
                <%--</div>--%>
                <%--<div class="stockpool-stocks column-wrapper">--%>
                    <%--<div class="column">--%>

                    <%--</div>--%>
                <%--</div>--%>

                <%--<br>--%>
                <%--<h2><strong>池中股票</strong> <i class="fa fa-pencil edit-stock"></i></h2>--%>
                <%--<div class="column table-header">--%>
                    <%--<span class="column-item">策略ID</span>--%>
                    <%--<span class="column-item">策略名城</span>--%>
                    <%--<span class="column-item">策略收益</span>--%>
                    <%--<span class="column-item">开始时间</span>--%>
                <%--</div>--%>
                <%--<div class="stockpool-strategy column-wrapper">--%>
                    <%--<div class="column">--%>

                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
        </div>

        <%--<div class="stockpool-container">--%>
            <%--<c:if test="${stock_pool_list!=null}">--%>
                <%--<c:forEach items="${stock_pool_list}" var="stock_pool" varStatus="s">--%>
                    <%--<div class="stockpool-item">--%>
                        <%--<h2><strong>#${stock_pool.poolId}</strong>&nbsp;&nbsp;<span class="change-name">${stock_pool.poolName}</span><input class="change-name-input" type="text" value="${stock_pool.poolName}" style="display: none"/></h2> <i class="fa fa-close delete-pool"></i>--%>
                        <%--<div class="delete-pool-confirm" style="display: none">是否删除该股票池? <span class="confirm-yes">是</span> <span class="confirm-no">否</span></div>--%>
                        <%--<hr>--%>
                        <%--<div class="stockpool-stocks">--%>
                            <%--<h3><strong>池中股票</strong> <i class="fa fa-pencil edit-stock"></i></h3>--%>
                            <%--<table>--%>
                                <%--<tr class="table-head">--%>
                                    <%--<td>股票ID</td>--%>
                                    <%--<td>股票名称</td>--%>
                                    <%--<td>昨日收盘</td>--%>
                                <%--</tr>--%>
                            <%--</table>--%>
                            <%--<div class="table-wrapper stock-table">--%>
                                <%--<table>--%>
                                    <%--<c:if test="${stock_pool.stockinfolist==null}">--%>
                                        <%--<tr class="odd">--%>
                                            <%--暂无股票--%>
                                        <%--</tr>--%>
                                    <%--</c:if>--%>
                                    <%--<c:forEach items="${stock_pool.stockinfolist}" var="stock" varStatus="s">--%>
                                        <%--<c:if test="${s.count%2==0}">--%>
                                            <%--<tr class="even">--%>
                                                <%--<td>${stock.stockid}</td>--%>
                                                <%--<td>${stock.stockname}</td>--%>
                                                <%--<td>${stock.close}</td>--%>
                                            <%--</tr>--%>
                                        <%--</c:if>--%>
                                        <%--<c:if test="${s.count%2==1}">--%>
                                            <%--<tr class="odd">--%>
                                                <%--<td>${stock.stockid}</td>--%>
                                                <%--<td>${stock.stockname}</td>--%>
                                                <%--<td>${stock.close}</td>--%>
                                            <%--</tr>--%>
                                        <%--</c:if>--%>
                                    <%--</c:forEach>--%>
                                <%--</table>--%>
                            <%--</div>--%>
                            <%--<br>--%>
                            <%--<div class="stockpool-strategy">--%>
                                <%--<h3><strong>运行策略</strong></h3>--%>
                                <%--<table>--%>
                                    <%--<tr class="table-head">--%>
                                        <%--<td>策略ID</td>--%>
                                        <%--<td>策略名称</td>--%>
                                        <%--<td>策略收益</td>--%>
                                        <%--<td>开始时间</td>--%>
                                    <%--</tr>--%>
                                <%--</table>--%>
                                <%--<div class="table-wrapper">--%>
                                    <%--<table>--%>
                                        <%--<c:if test="${stock_pool.vtradelist==null}">--%>
                                            <%--<tr class="odd">--%>
                                                <%--暂无股票--%>
                                            <%--</tr>--%>
                                        <%--</c:if>--%>
                                        <%--<c:forEach items="${stock_pool.vtradelist}" var="vtrade" varStatus="s">--%>
                                            <%--<c:if test="${s.count%2==0}">--%>
                                                <%--<tr class="even">--%>
                                                    <%--<td>${vtrade.tradeid}</td>--%>
                                                    <%--<td>${vtrade.tradename}</td>--%>
                                                    <%--<td>${vtrade.earning}</td>--%>
                                                    <%--<td>${vtrade.startdate}</td>--%>
                                                <%--</tr>--%>
                                            <%--</c:if>--%>
                                            <%--<c:if test="${s.count%2==1}">--%>
                                                <%--<tr class="odd">--%>
                                                    <%--<td>${vtrade.tradeid}</td>--%>
                                                    <%--<td>${vtrade.tradename}</td>--%>
                                                    <%--<td>${vtrade.earning}</td>--%>
                                                    <%--<td>${vtrade.startdate}</td>--%>
                                                <%--</tr>--%>
                                            <%--</c:if>--%>
                                        <%--</c:forEach>--%>
                                    <%--</table>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</c:forEach>--%>
            <%--</c:if>--%>
        <%--</div>--%>
    </div>
</div>
</body>
</html>
