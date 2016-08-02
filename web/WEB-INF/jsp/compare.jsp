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
    <title>AwStocks</title>
    <!--External CSS-->
    <link rel="stylesheet" href="<c:url value="/resources/bundle/buttons.css" />"/>
    <link rel="stylesheet" href="<c:url value="/resources/bundle/style.css"/>"/>
    <!--JavaScript-->
    <script>
        var json = ${allinfo};
    </script>
    <script type="text/javascript" rel="script" src="resources/js/jQuery/jQuery.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/carhartl-jquery-cookie-92b7715/jquery.cookie.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts_3.20.4.free/amcharts/amcharts.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts_3.20.4.free/amcharts/radar.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts_3.20.4.free/amcharts/serial.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/compare_stock.js"></script>
</head>
<body>
<div class="header">
    <h3 style="float: left;">Awesome Stocks</h3>
</div>
<div class="content-wrap">
    <div id="compare-radar">
        <h3>能力对比</h3>
        <div id="radar" style="height: 300px"></div>
    </div>
    <div id="compare-future">
        <h3>走向对比</h3>
        <div id="future" style="height: 300px;"></div>
    </div>
    <div id="compare-macd">
        <h3>MACD对比</h3>
        <div id="macd" style="height: 300px;"></div>
    </div>
    <div id="compare-volume">
        <h3>成交量对比</h3>
        <div id="volume" style="height: 300px;"></div>
    </div>
    <div id="compare-totalMoney">
        <h3>成交金额对比</h3>
        <div id="totalMoney" style="height: 300px;"></div>
    </div>
    <div id="compare-kdj">
        <h3>KDJ对比</h3>
        <div id="kdj" style="height: 300px"></div>
    </div>
    <div id="compare-rsi">
        <h3>RSI对比</h3>
        <div id="rsi" style="height: 300px"></div>
    </div>
    <ul>
        <li>
            <button onclick="updateData()">update</button>
            <button onclick="deleteCompareStocks('600000')">delete</button>
        </li>
    </ul>
</div>
</body>
</html>