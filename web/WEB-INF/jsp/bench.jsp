<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <title>${stockInfo.name}(${stockInfo.stockid})-Ascending</title>

    <link rel="icon" type="image/png" sizes="192x192"  href="resources/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="resources/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="resources/img/favicon/manifest.json">


    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/reset.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/common.css" />">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/stockSingle.css"/>">

    <script>
        var path = "<%=basePath%>";
        var stockid = "${stockInfo.stockid}";
        var allinfo = ${allinfo};
        var stockList = ${stockList};
        var intraday = ${intraday};
        var forecastData = ${forecastData};
        var rangeData = ${rangeData};
        var bpForecastData = ${bpForecastData};
        console.log(${bpForecastData});
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery.cookie.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/amcharts.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/serial.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts/radar.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/amstock.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/themes/dark.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/gsap/src/uncompressed/TweenMax.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/gsap/src/uncompressed/plugins/ScrollToPlugin.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/scrollmagic/scrollmagic/minified/ScrollMagic.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/bench.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/header.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

</head>

<body>
<img id="stock_title_background" src="resources/img/background/stock_title_1.png">
<%@ include file="header.jsp"%>
<div class="main-content">
    <div id="info" class="info">
        <div class="basic_info">
            <img src="resources/img/industry_icon/33.png">
            <div>
                <h2>${stockInfo.name}<span>(${stockInfo.stockid})</span></h2>
            </div>
        </div>

        <hr class="hr_vertical">

        <div class="num">
            <div class="num_upper">
                <div class="num_price">
                    <h1 id="dynamic_price">—— ——<img src="resources/img/up.png"></h1>
                    <div>
                        <span id="dynamic_devia_val">--</span>
                        <span id="dynamic_devia_per">--</span>
                    </div>
                </div>
                <div class="operation">
                </div>
            </div>

            <div class="num_down">
                <div class="num-item_wrapper">
                    <div class="num-item">今开</div>
                    <div id="dynamic_open" class="num-item"></div>
                </div>

                <div class="num-item_wrapper">
                    <div class="num-item">昨收</div>
                    <div id="dynamic_close" class="num-item"></div>
                </div>

                <div class="num-item_wrapper">
                    <div class="num-item">最高</div>
                    <div id="dynamic_high" class="num-item"></div>
                </div>
                <div class="num-item_wrapper">
                    <div class="num-item">最低</div>
                    <div id="dynamic_low" class="num-item"></div>
                </div>

            </div>
        </div>
    </div>

    <div id="nav-wrapper">
        <div id="nav">
            <span class="side">·</span>
            <p id="show_basic" class="nav-item active">基本图表</p>
            <span>·</span>
            <p id="show_forecast" class="nav-item">走势预测</p>
            <span>·</span>
            <p id="show_dynamic" class="nav-item">实时数据</p>
            <span>·</span>
            <p id="show_upDown" class="nav-item">涨跌分布</p>
            <span>·</span>
        </div>
    </div>

    <div id="nav-sec" class="nav-sec">
        <div id="nav-sec0" class="nav-sec-item">
            <a href="#k_wrapper" class="targeted">K线图</a>
            <a href="#macd_wrapper">MACD</a>
            <a href="#rsi_wrapper">RSI</a>
            <a href="#kdj_wrapper">KDJ</a>
            <a href="#boll_wrapper">BOLL</a>
        </div>
        <a href="#"><img id="toTop" src="resources/img/top.png"/></a>
    </div>



    <div id="nav-sec-small" class="nav-sec">
        <div id="nav-sec-small-show" class="nav-sec-small-show">↑↑↑</div>
        <div class="nav-sec-small-item" style="display: none">
            <p id="nav-sec-small-hide">↓↓↓</p>
            <a href="#k_wrapper" class="targeted">K线图</a>
            <a href="#macd_wrapper">MACD</a>
            <a href="#rsi_wrapper">RSI</a>
            <a href="#kdj_wrapper">KDJ</a>
            <a href="#boll_wrapper">BOLL</a>
        </div>
    </div>

    <div id="basic" class="stock_content">
        <div id="k_wrapper" class="basic_graph_wrapper_k">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">K线图 · 成交量 · 成交金额</p>
            <div id="stock_graph">

            </div>
        </div>

        <div id="macd_wrapper" class="basic_graph_wrapper_other">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">MACD</p>
            <div id="macd_graph" class="graph_basic_other">

            </div>
            <p></p>
        </div>

        <div id="rsi_wrapper" class="basic_graph_wrapper_other">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">RSI</p>
            <div id="rsi_graph" class="graph_basic_other">

            </div>
            <p id="rsi_ins"></p>
        </div>

        <div id="kdj_wrapper" class="basic_graph_wrapper_other">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">KDJ</p>
            <div id="kdj_graph" class="graph_basic_other">

            </div>
            <p id="kdj_ins"></p>
        </div>

        <div id="boll_wrapper" class="basic_graph_wrapper_other">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">BOLL</p>
            <div id="boll_graph" class="graph_basic_other">

            </div>
            <p id="boll_ins"></p>
        </div>


    </div>

    <div id="forecast" class="stock_content" style="display: none;">
        <div id="forecast_one" class="stock_content_single">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">走势预测<span>(未来十五天收盘价)</span></p>
            <h3>SVM模型预测</h3>
            <div id="forecast_graph">

            </div>

            <br>

            <h3>BP神经网络模型预测</h3>
            <div id="bp_forecast_graph">

            </div>
        </div>
    </div>

    <div id="dynamic" class="stock_content" style="display: none">
        <div id="dynamic_trade_wrapper" class="row_wrapper">
            <div class="column_wrapper dynamic_graph_wrapper">
                <p class="stock_content_title"><img src="resources/img/logo_s.png">实时交易</p>
                <div id="dynamic_graph">

                </div>
            </div>

            <div class="column_wrapper dynamic_number_wrapper">
                <p class="stock_content_title"><img src="resources/img/logo_s.png">论股堂</p>
                <div id="dynamic_number">
                    <p id="dynamic__high" class="dynamic_five_level_item">最高：<span>暂无数据</span></p>
                    <p id="dynamic__low" class="dynamic_five_level_item">最低：<span>暂无数据</span></p>
                    <p id="dynamic__open" class="dynamic_five_level_item">今开：<span>暂无数据</span></p>
                    <p id="dynamic__close" class="dynamic_five_level_item">昨收：<span>暂无数据</span></p>
                    <p id="dynamic__volume" class="dynamic_five_level_item">成交金额：<span>暂无数据</span></p>
                    <p id="dynamic__amount" class="dynamic_five_level_item">成交量：<span>暂无数据</span></p>

                    <hr/>

                    <p id="dynamic_up" class="dynamic_number_item">涨家数：<span>暂无数据</span></p>
                    <p id="dynamic_down" class="dynamic_number_item">跌家数：<span>暂无数据</span></p>
                    <p id="dynamic_neutral" class="dynamic_number_item">平家数：<span>暂无数据</span></p>
                </div>
            </div>
        </div>
    </div>

    <div id="area" class="stock_content" style="display: none">
        <div id="range_wrapper" class="basic_graph_wrapper_k">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">涨跌幅范围</p>
            <div id="range_graph" style="height: 1200px">

            </div>
        </div>
    </div>


</div>
<%@ include file="footer.jsp"%>
</body>
</html>
