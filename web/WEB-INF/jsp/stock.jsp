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
    <meta name="viewport" content="width=device-width, initial-scale=1" charset="UTF-8">
    <title>AwStock</title>
    <!--External CSS-->
    <link rel="stylesheet" href="<c:url value="/resources/css/buttons.css" />"/>
    <link rel="stylesheet" href="<c:url value="/resources/css/style.css"/>"/>
    <!--JavaScript-->
    <script>
        var json = ${allinfo};
    </script>
    <script type="text/javascript" rel="script" src="resources/js/jQuery/jQuery.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jQuery/jquery-ui.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/favAction.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart_3.20.4.free/amcharts/amcharts.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart_3.20.4.free/amcharts/serial.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart_3.20.4.free/amcharts/amstock.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/carhartl-jquery-cookie-92b7715/jquery.cookie.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts_3.20.4.free/amcharts/radar.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/single_stock.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart_3.20.4.free/amcharts/themes/dark.js"></script>

 </head>
<body>
<div class="header">
    <h3 style="float: left">Awesome Stocks</h3>
    <!--<input type="text" id="tags" placeholder="股票代码" name="search" onkeypress="fuzzySearch()">-->
    <!--<button id="search" class="button button-square button-primary button-tiny">搜索</button>-->
</div>
<div class="content-wrap">
    <div class="stock-active">
        <h3 id="stock-id">${stockInfo.stockid}</h3>
        <h1 id="stock-current-value">2013.24</h1>
        <button id="add-fav" class="button button-square button-large" onclick="addCompareStock(document.getElementById('stock-id').innerHTML)">加自选</button>
        <hr>
        <div class="bets-content">
            <div class="bets-content-column">
                <dl>
                    <dt>今开</dt>
                    <dd id="stock-open">3213</dd>
                </dl>
                <dl>
                    <dt>收盘</dt>
                    <dd id="stock-close">3243</dd>
                </dl>
                <dl>
                    <dt>最高</dt>
                    <dd id="stock-high">4234</dd>
                </dl>
                <dl>
                    <dt>最低</dt>
                    <dd id="stock-low">3423</dd>
                </dl>
                <dl>
                    <dt>成交金额</dt>
                    <dd id="stock-amount">3234亿</dd>
                </dl>
                <dl>
                    <dt>成交量</dt>
                    <dd id="stock-volume">1.32亿</dd>
                </dl>
                <dl>
                    <dt>换手率</dt>
                    <dd id="stock-turnover">2.58%</dd>
                </dl>
                <dl>
                    <dt>内盘</dt>
                    <dd id="stock-inner">23万手</dd>
                </dl>
                <dl>
                    <dt>外盘</dt>
                    <dd id="stock-outer">23万手</dd>
                </dl>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <div class="details">
        <div class="button-group">
            <button id="time-share-button" class="button button-normal" onclick="showIntraday()">分时数据</button>
            <button id="kchart-button" class="button button-normal" onclick="showKChart()">K线数据</button>
            <button id="model-button" class="button button-normal" onclick="showModel()">模型预测</button>
        </div>
        <div id="intraday-info">
            <div id="intraday" style="height: 300px"></div>
        </div>
        <div id="kchart-info">
            <div id="trigger"></div>
            <div id="legend"></div>
            <div id="kchart"></div>
            <div id="MACD"></div>
            <button class="button button-normal" onclick="operateChart('#kchart .amcharts-stock-panel-div-stockPanel1')">Volume</button>
            <button class="button button-normal" onclick="operateChart('#kchart .amcharts-stock-panel-div-stockPanel2')">MACD</button>
            <button class="button button-normal" onclick="operateChart('#kchart .amcharts-stock-panel-div-stockPanel3')">KD</button>
            <button class="button button-normal" onclick="operateChart('#kchart .amcharts-stock-panel-div-stockPanel4')">RSI</button>
            <button class="button button-normal" onclick="operateChart('#kchart .amcharts-stock-panel-div-stockPanel5')">BOLL</button>
        </div>
        <div id="model-info">
            <div id="radar" style="width: 40%;height: 300px"></div>
            <div id="model"></div>
            <div id="strategy">
                <h3>个股分析</h3>
            </div>
        </div>
    </div>
</div>
</body>
</html>