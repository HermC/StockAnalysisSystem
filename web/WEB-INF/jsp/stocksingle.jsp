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
        var jsonData = ${allinfo};
        var forecastData;
        <c:if test="${forecastInfo!=null}">
            forecastData = ${forecastInfo};
        </c:if>
        var stock_id = "${stockInfo.stockid}";
        var tmp_dynamic = ${intraday};
        var tmp_grade = ${grade};
        var stockList = ${stockList};
        var benchmarkData = ${benchmark};
        var news = ${news};
        var reports = ${reports};
        var specialPredict;
        <c:if test="${specialPredict!=null}">
            specialPredict = ${specialPredict};
        </c:if>
        var pyTradeData;
        <c:if test="${bpForecast!=null}">
            pyTradeData = ${bpForecast};
        </c:if>
        var detailStrategy = ${detailStrategy};

        var season = ${season};

        console.log(pyTradeData);
//        console.log(season);
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
    <script type="text/javascript" rel="script" src="resources/js/stocksingle.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/header.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

</head>

<body>

<img id="stock_title_background" src="resources/img/background/stock_title_1.png">

<c:choose>
    <c:when test="${userInfo==null}">
        <jsp:include page="usernav.jsp" flush="true">
            <jsp:param name="userInfo" value="${userInfo}"/>
        </jsp:include>
        <div id="main-page">
            <div class="main-content">
                <div id="info" class="info">
                    <div class="basic_info">
                        <img src="resources/img/industry_icon/${stockInfo.industryid}.png">
                        <div>
                            <h2>${stockInfo.name}<span>(${stockInfo.stockid})</span></h2>

                            <div>
                                <p>行业类型：${stockInfo.industry}</p>
                                <p>行业排名：${grade.rankString}/${grade.countString}</p>
                            </div>

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
                                <div id="operation_alert" style="display: none">
                                    <p>收藏成功！</p>
                                </div>
                                <img id="favor" src="resources/img/favor_o.png">
                                <img id="add" src="resources/img/add.png">
                            </div>
                        </div>

                        <div class="num_down">
                            <div class="num-item_wrapper">
                                <div id="dynamic_open" class="num-item">今开：暂无数据</div>
                                <div id="dynamic__close" class="num-item">昨收：暂无数据</div>
                            </div>

                            <div class="num-item_wrapper">
                                <div id="dynamic_high" class="num-item">最高：暂无数据</div>
                                <div id="dynamic__low" class="num-item">最低：暂无数据</div>
                            </div>

                            <div class="num-item_wrapper">
                                <div id="buy__first" class="num-item">买一：暂无数据</div>
                                <div id="sell__first" class="num-item">卖一：暂无数据</div>
                            </div>
                            <div class="num-item_wrapper">
                                <div id="dynamic__devVal" class="num-item">涨跌：暂无数据</div>
                                <div id="dynamic__amplitude" class="num-item">振幅：暂无数据</div>
                            </div>


                            <!--<div id="static__volume" class="num-item">成交数：0.62</div>-->
                            <!--<div id="static__pb" class="num-item">市净率：0.62</div>-->
                            <!--<div id="static__adj" class="num-item">后复权价：0.62</div>-->
                            <!--<div id="static__turnover" class="num-item">换手率：1.09</div>-->
                            <!--<div id="static__pe" class="num-item">市盈率：1.09</div>-->
                            <!--<div id="static__amount" class="num-item">成交金额：1.09</div>-->

                        </div>
                    </div>
                </div>

                <div id="nav-wrapper">
                    <div id="nav">
                        <span class="side">·</span>
                        <p id="show_basic" class="nav-item active">基本图表</p>
                        <span>·</span>
                        <p id="show_evaluate" class="nav-item">分析评估</p>
                        <span>·</span>
                        <p id="show_forecast" class="nav-item">走势预测</p>
                        <span>·</span>
                        <p id="show_dynamic" class="nav-item">实时分析</p>
                        <span>·</span>
                        <p id="show_company" class="nav-item">公司资讯</p>
                        <span class="side">·</span>
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
                        <%--<div class="nav-sec-small-operation">--%>
                        <%--<a class="toTop" href="#"> <img src="resources/img/top.png"/></a>--%>
                        <%--<div id="nav-sec-small-show" class="nav-sec-small-toggle"></div>--%>
                    <div id="nav-sec-small-show" class="nav-sec-small-show">↑↑↑</div>
                        <%--</div>--%>
                    <div class="nav-sec-small-item" style="display: none">
                        <p id="nav-sec-small-hide">↓↓↓</p>
                        <a href="#k_wrapper" class="targeted">K线图</a>
                        <a href="#macd_wrapper">MACD</a>
                        <a href="#rsi_wrapper">RSI</a>
                        <a href="#kdj_wrapper">KDJ</a>
                        <a href="#boll_wrapper">BOLL</a>
                    </div>
                </div>


                    <%--<div id="basic" class="stock_content">--%>
                <div id="basic" class="stock_content">
                    <div id="k_wrapper" class="basic_graph_wrapper_k">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">K线图 · 成交量 · 成交金额</p>
                        <div id="stock_graph">

                        </div>
                    </div>

                    <div id="macd_wrapper" class="basic_graph_wrapper_other">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">MACD(指数平滑异同平均线)</p>
                        <div id="macd_graph" class="graph_basic_other">

                        </div>
                        <p></p>
                    </div>

                    <div id="rsi_wrapper" class="basic_graph_wrapper_other">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">RSI(相对强弱指标)</p>
                        <div id="rsi_graph" class="graph_basic_other">

                        </div>
                        <p id="rsi_ins">Tips:</p>
                    </div>

                    <div id="kdj_wrapper" class="basic_graph_wrapper_other">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">KDJ(随机指标)</p>
                        <div id="kdj_graph" class="graph_basic_other">

                        </div>
                        <p id="kdj_ins">Tips:</p>
                    </div>

                    <div id="boll_wrapper" class="basic_graph_wrapper_other">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">BOLL(布林线)</p>
                        <div id="boll_graph" class="graph_basic_other">

                        </div>
                        <p id="boll_ins">Tips:</p>
                    </div>
                </div>

                <div id="evaluate" class="stock_content" style="display: none">
                    <div id="grade_wrapper" class="stock_content_single">
                        <div class="stock_content_title"><img src="resources/img/logo_s.png"><p>股票评分</p></div>
                        <div id="grade_graph">
                            <div id="grade_radar">

                            </div>

                            <div id="grade_zx">

                            </div>
                        </div>
                    </div>

                    <div id="bench_relative_wrapper" class="stock_content_single">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">大盘相关性分析</p>
                        <div id="bench_relative">
                            <div class="relative_wrapper relative_total">
                                <div class="relative_single_wrapper">
                                    <p>综合相关性：<span>${relative.corrcoef}</span></p>
                                    <p>${relative.description_coef}</p>
                                </div>
                                <div class="relative_single_wrapper">
                                    <p>Beta系数：<span>${relative.beta}</span></p>
                                    <p>${relative.description_beta}</p>
                                </div>
                            </div>
                            <div class="relative_wrapper relative_single">
                                <div class="relative_single_wrapper">
                                    <p>开盘价相关性： </p><span>${relative.open_corrcoef}</span>
                                    <div id="relative_graph_open" class="relative_graph">

                                    </div>
                                </div>
                                <div class="relative_single_wrapper">
                                    <p>成交量相关性： </p><span>${relative.volume_corrcoef}</span>
                                    <div id="relative_graph_volume" class="relative_graph">

                                    </div>
                                </div>
                                <div class="relative_single_wrapper">
                                    <p>涨跌幅相关性： </p><span>${relative.devia_corrcoef}</span>
                                    <div id="relative_graph_upDown" class="relative_graph">

                                    </div>
                                </div>
                            </div>
                        </div>
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

                    <div id="forecast_two" class="stock_content_single">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">特殊预测</p>

                        <div class="forecast_special_wrapper">
                            <div id="special_graph_rsi" class="forecast_special_graph">

                            </div>
                            <p id="special_graph_rsi_ins"></p>
                        </div>
                        <div class="forecast_special_wrapper">
                            <div id="special_graph_kdj" class="forecast_special_graph">

                            </div>
                            <p id="special_graph_kdj_ins"></p>
                        </div>
                        <div class="forecast_special_wrapper">
                            <div id="special_graph_boll" class="forecast_special_graph">

                            </div>
                            <p id="special_graph_boll_ins"></p>
                        </div>

                        <c:if test="${detailStrategy.DawnStarBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_dawnStar" class="detail_strategy_graph">

                                </div>
                                <p class="tips">Tips: ${detailStrategy.DawnStarIns}<br>
                                    详细分析: ${detailStrategy.DawnStarDetail}<br>
                                    图形特点: ${detailStrategy.DawnStarGraph}
                                </p>
                            </div>
                        </c:if>
                        <c:if test="${detailStrategy.DuskStarBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_duskStar" class="detail_strategy_graph">

                                </div>
                                <p class="tips"><b>Tips:</b> ${detailStrategy.DuskStarIns}<br><br>
                                    <b>详细分析:</b> ${detailStrategy.DuskStarDetail}<br><br>
                                    <b>图形特点:</b> ${detailStrategy.DuskStarGraph}
                                </p>
                            </div>
                        </c:if>
                        <c:if test="${detailStrategy.ShutStarBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_shutStar" class="detail_strategy_graph">

                                </div>
                                <p class="tips"><b>Tips:</b> ${detailStrategy.ShutStarIns}<br><br>
                                    <b>详细分析:</b> ${detailStrategy.ShutStarDetail}<br><br>
                                    <b>图形特点:</b> ${detailStrategy.ShutStarGraph}
                                </p>
                            </div>
                        </c:if>
                        <c:if test="${detailStrategy.HangOnBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_hangOn" class="detail_strategy_graph">

                                </div>
                                <p class="tips"><b>Tips:</b> ${detailStrategy.HangOnIns}<br><br>
                                    <b>详细分析:</b> ${detailStrategy.HangOnDetail}<br><br>
                                    <b>图形特点:</b> ${detailStrategy.HangOnGraph}
                                </p>
                            </div>
                        </c:if>
                        <c:if test="${detailStrategy.PregnantBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_pregnant" class="detail_strategy_graph">

                                </div>
                                <p class="tips"><b>Tips:</b> ${detailStrategy.PregnantIns}<br><br>
                                    <b>详细分析:</b> ${detailStrategy.PregnantDetail}<br><br>
                                    <b>图形特点:</b> ${detailStrategy.PregnantGraph}
                                </p>
                            </div>
                        </c:if>
                        <c:if test="${detailStrategy.DarkCloudeBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_darkCloud" class="detail_strategy_graph">

                                </div>
                                <p class="tips"><b>Tips:</b> ${detailStrategy.DarkCloudeIns}<br><br>
                                    <b>详细分析:</b> ${detailStrategy.DarkCloudeDetail}<br><br>
                                    <b>图形特点:</b> ${detailStrategy.DarkCloudeGraph}
                                </p>
                            </div>
                        </c:if>
                        <c:if test="${detailStrategy.DawnLightBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_dawnLight" class="detail_strategy_graph">

                                </div>
                                <p class="tips"><b>Tips:</b> ${detailStrategy.DawnLightIns}<br><br>
                                    <b>详细分析:</b> ${detailStrategy.DawnLightDetail}<br><br>
                                    <b>图形特点:</b> ${detailStrategy.DawnLightGraph}
                                </p>
                            </div>
                        </c:if>
                        <c:if test="${detailStrategy.RedSolderBL==true}">
                            <div class="detail_strategy">
                                <div id="detail_strategy_redSolder" class="detail_strategy_graph">

                                </div>
                                <p class="tips"><b>Tips:</b> ${detailStrategy.RedSolderIns}<br><br>
                                    <b>详细分析:</b> ${detailStrategy.RedSolderDetail}<br><br>
                                    <b>图形特点:</b> ${detailStrategy.RedSolderGraph}
                                </p>
                            </div>
                        </c:if>
                    </div>
                </div>

                <div id="dynamic" class="stock_content" style="display: none">
                        <%--<div id="dynamic" class="stock_content" style="display: none;">--%>
                    <div id="dynamic_trade_wrapper" class="row_wrapper">
                        <div class="column_wrapper dynamic_graph_wrapper">
                            <p class="stock_content_title"><img src="resources/img/logo_s.png">实时交易</p>
                            <div id="dynamic_graph">

                            </div>
                        </div>

                        <div class="column_wrapper dynamic_number_wrapper">
                            <p class="stock_content_title"><img src="resources/img/logo_s.png">论股堂</p>
                            <div id="dynamic_number">
                                <p id="dynamic_out1" class="dynamic_five_level_item">卖一：<span>暂无数据</span></p>
                                <p id="dynamic_in1" class="dynamic_five_level_item">买一：<span>暂无数据</span></p>
                                <p id="dynamic_out2" class="dynamic_five_level_item">卖二：<span>暂无数据</span></p>
                                <p id="dynamic_in2" class="dynamic_five_level_item">买二：<span>暂无数据</span></p>
                                <p id="dynamic_out3" class="dynamic_five_level_item">卖三：<span>暂无数据</span></p>
                                <p id="dynamic_in3" class="dynamic_five_level_item">买三：<span>暂无数据</span></p>
                                <p id="dynamic_out4" class="dynamic_five_level_item">卖四：<span>暂无数据</span></p>
                                <p id="dynamic_in4" class="dynamic_five_level_item">买四：<span>暂无数据</span></p>
                                <p id="dynamic_out5" class="dynamic_five_level_item">卖五：<span>暂无数据</span></p>
                                <p id="dynamic_in5" class="dynamic_five_level_item">买五：<span>暂无数据</span></p>

                                <hr/>

                                <p id="dynamic_inner_count" class="dynamic_number_item">内盘：<span>暂无数据</span></p>
                                <p id="dynamic_outer_count" class="dynamic_number_item">外盘：<span>暂无数据</span></p>
                                <p id="dynamic_quantity_ratio" class="dynamic_number_item">量比：<span>暂无数据</span></p>
                                <p id="dynamic_committee" class="dynamic_number_item">委比：<span>暂无数据</span></p>
                                <p id="dynamic_volume" class="dynamic_number_item">成交量：暂无数据</p>
                                <p id="dynamic_amount" class="dynamic_number_item">成交额：<span>暂无数据</span></p>
                                <p id="dynamic_up_stop" class="dynamic_number_item">涨停：<span>暂无数据</span></p>
                                <p id="dynamic_down_stop" class="dynamic_number_item">跌停：<span>暂无数据</span></p>
                                <p id="dynamic_value_per_stock" class="dynamic_number_item">每股净资产：<span>暂无数据</span></p>
                                <p id="dynamic_profit_per" class="dynamic_number_item">每股收益：<span>暂无数据</span></p>
                                <p id="dynamic_total_volume" class="dynamic_number_item">总股本：<span>暂无数据</span></p>
                                <p id="dynamic_total_amount" class="dynamic_number_item">总市值：<span>暂无数据</span></p>
                                <p id="dynamic_available_stock" class="dynamic_number_item">流通股本：<span>暂无数据</span></p>
                                <p id="dynamic_avail_amount" class="dynamic_number_item">流通市值：<span>暂无数据</span></p>
                            </div>
                        </div>
                    </div>

                    <div id="text_instruction" class="stock_content_single">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">实时数值分析</p>
                        <div class="text_instruction_item">
                            <div class="text_instruction_title">
                                <span class="text_instruction_type">市净率</span>
                                <span id="dynamic_pb" class="text_instruction_value">1.09</span>
                            </div>
                            <div id="dynamic_pb_instruction" class="text_instruction_content">

                            </div>
                        </div>

                        <div class="text_instruction_item">
                            <div class="text_instruction_title">
                                <span class="text_instruction_type">委比</span>
                                <span id="dynamic__committee" class="text_instruction_value">43.28</span>
                            </div>
                            <div id="dynamic_committee_instruction" class="text_instruction_content"></div>
                        </div>

                        <div class="text_instruction_item">
                            <div class="text_instruction_title">
                                <span class="text_instruction_type">涨跌幅</span>
                                <span id="dynamic_updown" class="text_instruction_value">0.58</span>
                            </div>
                            <div id="dynamic_updown_instruction" class="text_instruction_content"></div>
                        </div>

                        <div class="text_instruction_item">
                            <div class="text_instruction_title">
                                <span class="text_instruction_type">市盈率</span>
                                <span id="dynamic_pe" class="text_instruction_value">6.16</span>
                            </div>
                            <div id="dynamic_pe_instruction" class="text_instruction_content"></div>
                        </div>

                        <div class="text_instruction_item">
                            <div class="text_instruction_title">
                                <span class="text_instruction_type">内外盘</span>
                                <span id="dynamic_inout" class="text_instruction_value">92.73</span>
                            </div>
                            <div id="dynamic_inout_instruction" class="text_instruction_content"></div>
                        </div>

                        <div class="text_instruction_item">
                            <div class="text_instruction_title">
                                <span class="text_instruction_type">量比</span>
                                <span id="dynamic__quantity_ratio" class="text_instruction_value">0.76</span>
                            </div>
                            <div id="dynamic_quantity_ratio_instruction" class="text_instruction_content"></div>
                        </div>

                        <div class="text_instruction_item">
                            <div class="text_instruction_title">
                                <span class="text_instruction_type">换手率</span>
                                <span id="dynamic_turnover" class="text_instruction_value">0.06</span>
                            </div>
                            <div id="dynamic_turnover_instruction" class="text_instruction_content"></div>
                        </div>

                    </div>
                </div>

                <div id="company" class="stock_content" style="display: none;">
                    <p id="company_intro" class="stock_content_title"><img src="resources/img/logo_s.png">公司简介</p>
                    <h1>上市日期：${stockInfo.listDate}</h1>
                    <h1>公司状态：${stockInfo.status}</h1>
                    <h1>公司描述：${stockInfo.description}</h1>

                    <div id="news" class="stock_content_single">
                        <p id="news_news" class="stock_content_title"><img src="resources/img/logo_s.png">新闻公告</p>
                        <c:forEach items="${news}" var="news_item" varStatus="s" end="10">
                            <a href="${news_item.url}" target="_blank" class="news_paper_item"><p>${news_item.title}</p><span>${news_item.date}</span></a>
                        </c:forEach>

                        <p id="news_paper" class="stock_content_title"><img src="resources/img/logo_s.png">研究报告</p>
                        <c:forEach items="${reports}" var="report" varStatus="s" end="10">
                            <a href="${report.url}" target="_blank" class="news_paper_item"><p>${report.title}</p><span>${report.source} ${report.date}</span></a>
                        </c:forEach>

                    </div>

                        <%--<p id="company_rise" class="stock_content_title"><img src="resources/img/logo_s.png">增长</p>--%>
                        <%--<div id="company_rise_graph">--%>

                        <%--</div>--%>

                    <p id="company_profit" class="stock_content_title"><img src="resources/img/logo_s.png">盈利能力</p>
                    <h3>每股指标</h3>
                    <div id="season_graph1"></div>
                    <br>
                    <h3>盈利能力</h3>
                    <div id="season_graph2"></div>
                    <br>
                    <h3>成长能力</h3>
                    <div id="season_graph3"></div>
                        <%--<h3>当前能力</h3>--%>
                        <%--<div id="company_profit_table">--%>
                        <%--<ul>--%>
                        <%--<li>${currentSeason.tbmgly_String} <span>${currentSeason.tbmgly}</span></li>--%>
                        <%--<li>${currentSeason.jqmgly_String} <span>${currentSeason.jqmgly}</span></li>--%>
                        <%--<li>${currentSeason.mgsy_tzh_String} <span>${currentSeason.mgsy_tzh}</span></li>--%>
                        <%--<li>${currentSeason.kcfjcxsyhdmgsy_String} <span>${currentSeason.kcfjcxsyhdmgsy}</span></li>--%>
                        <%--<li>${currentSeason.mgjzc_tzq_String} <span>${currentSeason.mgjzc_tzq}</span></li>--%>
                        <%--<li>${currentSeason.mgjzc_tzh_String} <span>${currentSeason.mgjzc_tzh}</span></li>--%>
                        <%--<li>${currentSeason.mgjyxxjl_String} <span>${currentSeason.mgjyxxjl}</span></li>--%>
                        <%--<li>${currentSeason.mgzbgjj_String} <span>${currentSeason.mgzbgjj}</span></li>--%>
                        <%--<li>${currentSeason.mgwfplr_String} <span>${currentSeason.mgwfplr}</span></li>--%>
                        <%--<li>${currentSeason.tzhdmgjzc_String} <span>${currentSeason.tzhdmgjzc}</span></li>--%>
                        <%--<li>${currentSeason.zzclrl_String} <span>${currentSeason.zzclrl}</span></li>--%>
                        <%--<li>${currentSeason.zyywlrl_String} <span>${currentSeason.zyywlrl}</span></li>--%>
                        <%--<li>${currentSeason.zzcjlrl_String} <span>${currentSeason.zzcjlrl}</span></li>--%>
                        <%--<li>${currentSeason.cbfylrl_String} <span>${currentSeason.cbfylrl}</span></li>--%>
                        <%--<li>${currentSeason.yylrl_String} <span>${currentSeason.yylrl}</span></li>--%>
                        <%--<li>${currentSeason.zyywcbl_String} <span>${currentSeason.zyywcbl}</span></li>--%>
                        <%--<li>${currentSeason.xsjll_String} <span>${currentSeason.xsjll}</span></li>--%>
                        <%--<li>${currentSeason.gbbcl_String} <span>${currentSeason.gbbcl}</span></li>--%>
                        <%--<li>${currentSeason.jzcbcl_String} <span>${currentSeason.jzcbcl}</span></li>--%>
                        <%--<li>${currentSeason.zcbcl_String} <span>${currentSeason.zcbcl}</span></li>--%>
                        <%--<li>${currentSeason.ssmll_String} <span>${currentSeason.ssmll}</span></li>--%>
                        <%--<li>${currentSeason.sxfybz_String} <span>${currentSeason.sxfybz}</span></li>--%>
                        <%--<li>${currentSeason.fzybz_String} <span>${currentSeason.fzybz}</span></li>--%>
                        <%--<li>${currentSeason.zylrbz_String} <span>${currentSeason.zylrbz}</span></li>--%>
                        <%--<li>${currentSeason.gxffl_String} <span>${currentSeason.gxffl}</span></li>--%>
                        <%--<li>${currentSeason.tzsyl_String} <span>${currentSeason.tzsyl}</span></li>--%>
                        <%--<li>${currentSeason.zyywlr_String} <span>${currentSeason.zyywlr}</span></li>--%>
                        <%--<li>${currentSeason.jzcsyl_String} <span>${currentSeason.jzcsyl}</span></li>--%>
                        <%--<li>${currentSeason.jqjzcsyl_String} <span>${currentSeason.jqjzcsyl}</span></li>--%>
                        <%--<li>${currentSeason.kcfjcxsyhdjlr_String} <span>${currentSeason.kcfjcxsyhdjlr}</span></li>--%>
                        <%--<li>${currentSeason.zyywsrzzl_String} <span>${currentSeason.zyywsrzzl}</span></li>--%>
                        <%--<li>${currentSeason.jlrzzl_String} <span>${seacurrentSeasonson.jlrzzl}</span></li>--%>
                        <%--<li>${currentSeason.jzczzl_String} <span>${currentSeason.jzczzl}</span></li>--%>
                        <%--<li>${currentSeason.zzczzl_String} <span>${currentSeason.zzczzl}</span></li>--%>
                        <%--</ul>--%>
                </div>

                    <%--<p id="company_financial" class="stock_content_title"><img src="resources/img/logo_s.png">财务状况</p>--%>
                    <%--<div id="company_financial_graph">--%>

                    <%--</div>--%>

            </div>
        </div>
    </c:when>
    <c:otherwise>
        <%@ include file="header.jsp"%>
        <div class="main-content">
            <div id="info" class="info">
                <div class="basic_info">
                    <img src="resources/img/industry_icon/${stockInfo.industryid}.png">
                    <div>
                        <h2>${stockInfo.name}<span>(${stockInfo.stockid})</span></h2>

                        <div>
                            <p>行业类型：${stockInfo.industry}</p>
                            <p>行业排名：${grade.rankString}/${grade.countString}</p>
                        </div>

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
                            <div id="operation_alert" style="display: none">
                                <p>收藏成功！</p>
                            </div>
                            <img id="favor" src="resources/img/favor_o.png">
                            <img id="add" src="resources/img/add.png">
                        </div>
                    </div>

                    <div class="num_down">
                        <div class="num-item_wrapper">
                            <div id="dynamic_open" class="num-item">今开：暂无数据</div>
                            <div id="dynamic__close" class="num-item">昨收：暂无数据</div>
                        </div>

                        <div class="num-item_wrapper">
                            <div id="dynamic_high" class="num-item">最高：暂无数据</div>
                            <div id="dynamic__low" class="num-item">最低：暂无数据</div>
                        </div>

                        <div class="num-item_wrapper">
                            <div id="buy__first" class="num-item">买一：暂无数据</div>
                            <div id="sell__first" class="num-item">卖一：暂无数据</div>
                        </div>
                        <div class="num-item_wrapper">
                            <div id="dynamic__devVal" class="num-item">涨跌：暂无数据</div>
                            <div id="dynamic__amplitude" class="num-item">振幅：暂无数据</div>
                        </div>


                        <!--<div id="static__volume" class="num-item">成交数：0.62</div>-->
                        <!--<div id="static__pb" class="num-item">市净率：0.62</div>-->
                        <!--<div id="static__adj" class="num-item">后复权价：0.62</div>-->
                        <!--<div id="static__turnover" class="num-item">换手率：1.09</div>-->
                        <!--<div id="static__pe" class="num-item">市盈率：1.09</div>-->
                        <!--<div id="static__amount" class="num-item">成交金额：1.09</div>-->

                    </div>
                </div>
            </div>

            <div id="nav-wrapper">
                <div id="nav">
                    <span class="side">·</span>
                    <p id="show_basic" class="nav-item active">基本图表</p>
                    <span>·</span>
                    <p id="show_evaluate" class="nav-item">分析评估</p>
                    <span>·</span>
                    <p id="show_forecast" class="nav-item">走势预测</p>
                    <span>·</span>
                    <p id="show_dynamic" class="nav-item">实时分析</p>
                    <span>·</span>
                    <p id="show_company" class="nav-item">公司资讯</p>
                    <span class="side">·</span>
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
                    <%--<div class="nav-sec-small-operation">--%>
                    <%--<a class="toTop" href="#"> <img src="resources/img/top.png"/></a>--%>
                    <%--<div id="nav-sec-small-show" class="nav-sec-small-toggle"></div>--%>
                <div id="nav-sec-small-show" class="nav-sec-small-show">↑↑↑</div>
                    <%--</div>--%>
                <div class="nav-sec-small-item" style="display: none">
                    <p id="nav-sec-small-hide">↓↓↓</p>
                    <a href="#k_wrapper" class="targeted">K线图</a>
                    <a href="#macd_wrapper">MACD</a>
                    <a href="#rsi_wrapper">RSI</a>
                    <a href="#kdj_wrapper">KDJ</a>
                    <a href="#boll_wrapper">BOLL</a>
                </div>
            </div>


                <%--<div id="basic" class="stock_content">--%>
            <div id="basic" class="stock_content">
                <div id="k_wrapper" class="basic_graph_wrapper_k">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">K线图 · 成交量 · 成交金额</p>
                    <div id="stock_graph">

                    </div>
                </div>

                <div id="macd_wrapper" class="basic_graph_wrapper_other">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">MACD(指数平滑异同平均线)</p>
                    <div id="macd_graph" class="graph_basic_other">

                    </div>
                    <p></p>
                </div>

                <div id="rsi_wrapper" class="basic_graph_wrapper_other">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">RSI(相对强弱指标)</p>
                    <div id="rsi_graph" class="graph_basic_other">

                    </div>
                    <p id="rsi_ins">Tips:</p>
                </div>

                <div id="kdj_wrapper" class="basic_graph_wrapper_other">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">KDJ(随机指标)</p>
                    <div id="kdj_graph" class="graph_basic_other">

                    </div>
                    <p id="kdj_ins">Tips:</p>
                </div>

                <div id="boll_wrapper" class="basic_graph_wrapper_other">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">BOLL(布林线)</p>
                    <div id="boll_graph" class="graph_basic_other">

                    </div>
                    <p id="boll_ins">Tips:</p>
                </div>
            </div>

            <div id="evaluate" class="stock_content" style="display: none">
                <div id="grade_wrapper" class="stock_content_single">
                    <div class="stock_content_title"><img src="resources/img/logo_s.png"><p>股票评分</p></div>
                    <div id="grade_graph">
                        <div id="grade_radar">

                        </div>

                        <div id="grade_zx">

                        </div>
                    </div>
                </div>

                <div id="bench_relative_wrapper" class="stock_content_single">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">大盘相关性分析</p>
                    <div id="bench_relative">
                        <div class="relative_wrapper relative_total">
                            <div class="relative_single_wrapper">
                                <p>综合相关性：<span>${relative.corrcoef}</span></p>
                                <p>${relative.description_coef}</p>
                            </div>
                            <div class="relative_single_wrapper">
                                <p>Beta系数：<span>${relative.beta}</span></p>
                                <p>${relative.description_beta}</p>
                            </div>
                        </div>
                        <div class="relative_wrapper relative_single">
                            <div class="relative_single_wrapper">
                                <p>开盘价相关性： </p><span>${relative.open_corrcoef}</span>
                                <div id="relative_graph_open" class="relative_graph">

                                </div>
                            </div>
                            <div class="relative_single_wrapper">
                                <p>成交量相关性： </p><span>${relative.volume_corrcoef}</span>
                                <div id="relative_graph_volume" class="relative_graph">

                                </div>
                            </div>
                            <div class="relative_single_wrapper">
                                <p>涨跌幅相关性： </p><span>${relative.devia_corrcoef}</span>
                                <div id="relative_graph_upDown" class="relative_graph">

                                </div>
                            </div>
                        </div>
                    </div>
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

                <div id="forecast_two" class="stock_content_single">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">特殊预测</p>

                    <div class="forecast_special_wrapper">
                        <div id="special_graph_rsi" class="forecast_special_graph">

                        </div>
                        <p id="special_graph_rsi_ins"></p>
                    </div>
                    <div class="forecast_special_wrapper">
                        <div id="special_graph_kdj" class="forecast_special_graph">

                        </div>
                        <p id="special_graph_kdj_ins"></p>
                    </div>
                    <div class="forecast_special_wrapper">
                        <div id="special_graph_boll" class="forecast_special_graph">

                        </div>
                        <p id="special_graph_boll_ins"></p>
                    </div>

                    <c:if test="${detailStrategy.DawnStarBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_dawnStar" class="detail_strategy_graph">

                            </div>
                            <p class="tips">Tips: ${detailStrategy.DawnStarIns}<br>
                                详细分析: ${detailStrategy.DawnStarDetail}<br>
                                图形特点: ${detailStrategy.DawnStarGraph}
                            </p>
                        </div>
                    </c:if>
                    <c:if test="${detailStrategy.DuskStarBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_duskStar" class="detail_strategy_graph">

                            </div>
                            <p class="tips"><b>Tips:</b> ${detailStrategy.DuskStarIns}<br><br>
                                <b>详细分析:</b> ${detailStrategy.DuskStarDetail}<br><br>
                                <b>图形特点:</b> ${detailStrategy.DuskStarGraph}
                            </p>
                        </div>
                    </c:if>
                    <c:if test="${detailStrategy.ShutStarBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_shutStar" class="detail_strategy_graph">

                            </div>
                            <p class="tips"><b>Tips:</b> ${detailStrategy.ShutStarIns}<br><br>
                                <b>详细分析:</b> ${detailStrategy.ShutStarDetail}<br><br>
                                <b>图形特点:</b> ${detailStrategy.ShutStarGraph}
                            </p>
                        </div>
                    </c:if>
                    <c:if test="${detailStrategy.HangOnBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_hangOn" class="detail_strategy_graph">

                            </div>
                            <p class="tips"><b>Tips:</b> ${detailStrategy.HangOnIns}<br><br>
                                <b>详细分析:</b> ${detailStrategy.HangOnDetail}<br><br>
                                <b>图形特点:</b> ${detailStrategy.HangOnGraph}
                            </p>
                        </div>
                    </c:if>
                    <c:if test="${detailStrategy.PregnantBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_pregnant" class="detail_strategy_graph">

                            </div>
                            <p class="tips"><b>Tips:</b> ${detailStrategy.PregnantIns}<br><br>
                                <b>详细分析:</b> ${detailStrategy.PregnantDetail}<br><br>
                                <b>图形特点:</b> ${detailStrategy.PregnantGraph}
                            </p>
                        </div>
                    </c:if>
                    <c:if test="${detailStrategy.DarkCloudeBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_darkCloud" class="detail_strategy_graph">

                            </div>
                            <p class="tips"><b>Tips:</b> ${detailStrategy.DarkCloudeIns}<br><br>
                                <b>详细分析:</b> ${detailStrategy.DarkCloudeDetail}<br><br>
                                <b>图形特点:</b> ${detailStrategy.DarkCloudeGraph}
                            </p>
                        </div>
                    </c:if>
                    <c:if test="${detailStrategy.DawnLightBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_dawnLight" class="detail_strategy_graph">

                            </div>
                            <p class="tips"><b>Tips:</b> ${detailStrategy.DawnLightIns}<br><br>
                                <b>详细分析:</b> ${detailStrategy.DawnLightDetail}<br><br>
                                <b>图形特点:</b> ${detailStrategy.DawnLightGraph}
                            </p>
                        </div>
                    </c:if>
                    <c:if test="${detailStrategy.RedSolderBL==true}">
                        <div class="detail_strategy">
                            <div id="detail_strategy_redSolder" class="detail_strategy_graph">

                            </div>
                            <p class="tips"><b>Tips:</b> ${detailStrategy.RedSolderIns}<br><br>
                                <b>详细分析:</b> ${detailStrategy.RedSolderDetail}<br><br>
                                <b>图形特点:</b> ${detailStrategy.RedSolderGraph}
                            </p>
                        </div>
                    </c:if>
                </div>
            </div>

            <div id="dynamic" class="stock_content" style="display: none">
                    <%--<div id="dynamic" class="stock_content" style="display: none;">--%>
                <div id="dynamic_trade_wrapper" class="row_wrapper">
                    <div class="column_wrapper dynamic_graph_wrapper">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">实时交易</p>
                        <div id="dynamic_graph">

                        </div>
                    </div>

                    <div class="column_wrapper dynamic_number_wrapper">
                        <p class="stock_content_title"><img src="resources/img/logo_s.png">论股堂</p>
                        <div id="dynamic_number">
                            <p id="dynamic_out1" class="dynamic_five_level_item">卖一：<span>暂无数据</span></p>
                            <p id="dynamic_in1" class="dynamic_five_level_item">买一：<span>暂无数据</span></p>
                            <p id="dynamic_out2" class="dynamic_five_level_item">卖二：<span>暂无数据</span></p>
                            <p id="dynamic_in2" class="dynamic_five_level_item">买二：<span>暂无数据</span></p>
                            <p id="dynamic_out3" class="dynamic_five_level_item">卖三：<span>暂无数据</span></p>
                            <p id="dynamic_in3" class="dynamic_five_level_item">买三：<span>暂无数据</span></p>
                            <p id="dynamic_out4" class="dynamic_five_level_item">卖四：<span>暂无数据</span></p>
                            <p id="dynamic_in4" class="dynamic_five_level_item">买四：<span>暂无数据</span></p>
                            <p id="dynamic_out5" class="dynamic_five_level_item">卖五：<span>暂无数据</span></p>
                            <p id="dynamic_in5" class="dynamic_five_level_item">买五：<span>暂无数据</span></p>

                            <hr/>

                            <p id="dynamic_inner_count" class="dynamic_number_item">内盘：<span>暂无数据</span></p>
                            <p id="dynamic_outer_count" class="dynamic_number_item">外盘：<span>暂无数据</span></p>
                            <p id="dynamic_quantity_ratio" class="dynamic_number_item">量比：<span>暂无数据</span></p>
                            <p id="dynamic_committee" class="dynamic_number_item">委比：<span>暂无数据</span></p>
                            <p id="dynamic_volume" class="dynamic_number_item">成交量：暂无数据</p>
                            <p id="dynamic_amount" class="dynamic_number_item">成交额：<span>暂无数据</span></p>
                            <p id="dynamic_up_stop" class="dynamic_number_item">涨停：<span>暂无数据</span></p>
                            <p id="dynamic_down_stop" class="dynamic_number_item">跌停：<span>暂无数据</span></p>
                            <p id="dynamic_value_per_stock" class="dynamic_number_item">每股净资产：<span>暂无数据</span></p>
                            <p id="dynamic_profit_per" class="dynamic_number_item">每股收益：<span>暂无数据</span></p>
                            <p id="dynamic_total_volume" class="dynamic_number_item">总股本：<span>暂无数据</span></p>
                            <p id="dynamic_total_amount" class="dynamic_number_item">总市值：<span>暂无数据</span></p>
                            <p id="dynamic_available_stock" class="dynamic_number_item">流通股本：<span>暂无数据</span></p>
                            <p id="dynamic_avail_amount" class="dynamic_number_item">流通市值：<span>暂无数据</span></p>
                        </div>
                    </div>
                </div>

                <div id="text_instruction" class="stock_content_single">
                    <p class="stock_content_title"><img src="resources/img/logo_s.png">实时数值分析</p>
                    <div class="text_instruction_item">
                        <div class="text_instruction_title">
                            <span class="text_instruction_type">市净率</span>
                            <span id="dynamic_pb" class="text_instruction_value">1.09</span>
                        </div>
                        <div id="dynamic_pb_instruction" class="text_instruction_content">

                        </div>
                    </div>

                    <div class="text_instruction_item">
                        <div class="text_instruction_title">
                            <span class="text_instruction_type">委比</span>
                            <span id="dynamic__committee" class="text_instruction_value">43.28</span>
                        </div>
                        <div id="dynamic_committee_instruction" class="text_instruction_content"></div>
                    </div>

                    <div class="text_instruction_item">
                        <div class="text_instruction_title">
                            <span class="text_instruction_type">涨跌幅</span>
                            <span id="dynamic_updown" class="text_instruction_value">0.58</span>
                        </div>
                        <div id="dynamic_updown_instruction" class="text_instruction_content"></div>
                    </div>

                    <div class="text_instruction_item">
                        <div class="text_instruction_title">
                            <span class="text_instruction_type">市盈率</span>
                            <span id="dynamic_pe" class="text_instruction_value">6.16</span>
                        </div>
                        <div id="dynamic_pe_instruction" class="text_instruction_content"></div>
                    </div>

                    <div class="text_instruction_item">
                        <div class="text_instruction_title">
                            <span class="text_instruction_type">内外盘</span>
                            <span id="dynamic_inout" class="text_instruction_value">92.73</span>
                        </div>
                        <div id="dynamic_inout_instruction" class="text_instruction_content"></div>
                    </div>

                    <div class="text_instruction_item">
                        <div class="text_instruction_title">
                            <span class="text_instruction_type">量比</span>
                            <span id="dynamic__quantity_ratio" class="text_instruction_value">0.76</span>
                        </div>
                        <div id="dynamic_quantity_ratio_instruction" class="text_instruction_content"></div>
                    </div>

                    <div class="text_instruction_item">
                        <div class="text_instruction_title">
                            <span class="text_instruction_type">换手率</span>
                            <span id="dynamic_turnover" class="text_instruction_value">0.06</span>
                        </div>
                        <div id="dynamic_turnover_instruction" class="text_instruction_content"></div>
                    </div>

                </div>
            </div>

            <div id="company" class="stock_content" style="display: none;">
                <p id="company_intro" class="stock_content_title"><img src="resources/img/logo_s.png">公司简介</p>
                <h1>上市日期：${stockInfo.listDate}</h1>
                <h1>公司状态：${stockInfo.status}</h1>
                <h1>公司描述：${stockInfo.description}</h1>

                <div id="news" class="stock_content_single">
                    <p id="news_news" class="stock_content_title"><img src="resources/img/logo_s.png">新闻公告</p>
                    <c:forEach items="${news}" var="news_item" varStatus="s" end="10">
                        <a href="${news_item.url}" target="_blank" class="news_paper_item"><p>${news_item.title}</p><span>${news_item.date}</span></a>
                    </c:forEach>

                    <p id="news_paper" class="stock_content_title"><img src="resources/img/logo_s.png">研究报告</p>
                    <c:forEach items="${reports}" var="report" varStatus="s" end="10">
                        <a href="${report.url}" target="_blank" class="news_paper_item"><p>${report.title}</p><span>${report.source} ${report.date}</span></a>
                    </c:forEach>

                </div>

                    <%--<p id="company_rise" class="stock_content_title"><img src="resources/img/logo_s.png">增长</p>--%>
                    <%--<div id="company_rise_graph">--%>

                    <%--</div>--%>

                <p id="company_profit" class="stock_content_title"><img src="resources/img/logo_s.png">盈利能力</p>
                <h3>每股指标</h3>
                <div id="season_graph1"></div>
                <br>
                <h3>盈利能力</h3>
                <div id="season_graph2"></div>
                <br>
                <h3>成长能力</h3>
                <div id="season_graph3"></div>
                    <%--<h3>当前能力</h3>--%>
                    <%--<div id="company_profit_table">--%>
                    <%--<ul>--%>
                    <%--<li>${currentSeason.tbmgly_String} <span>${currentSeason.tbmgly}</span></li>--%>
                    <%--<li>${currentSeason.jqmgly_String} <span>${currentSeason.jqmgly}</span></li>--%>
                    <%--<li>${currentSeason.mgsy_tzh_String} <span>${currentSeason.mgsy_tzh}</span></li>--%>
                    <%--<li>${currentSeason.kcfjcxsyhdmgsy_String} <span>${currentSeason.kcfjcxsyhdmgsy}</span></li>--%>
                    <%--<li>${currentSeason.mgjzc_tzq_String} <span>${currentSeason.mgjzc_tzq}</span></li>--%>
                    <%--<li>${currentSeason.mgjzc_tzh_String} <span>${currentSeason.mgjzc_tzh}</span></li>--%>
                    <%--<li>${currentSeason.mgjyxxjl_String} <span>${currentSeason.mgjyxxjl}</span></li>--%>
                    <%--<li>${currentSeason.mgzbgjj_String} <span>${currentSeason.mgzbgjj}</span></li>--%>
                    <%--<li>${currentSeason.mgwfplr_String} <span>${currentSeason.mgwfplr}</span></li>--%>
                    <%--<li>${currentSeason.tzhdmgjzc_String} <span>${currentSeason.tzhdmgjzc}</span></li>--%>
                    <%--<li>${currentSeason.zzclrl_String} <span>${currentSeason.zzclrl}</span></li>--%>
                    <%--<li>${currentSeason.zyywlrl_String} <span>${currentSeason.zyywlrl}</span></li>--%>
                    <%--<li>${currentSeason.zzcjlrl_String} <span>${currentSeason.zzcjlrl}</span></li>--%>
                    <%--<li>${currentSeason.cbfylrl_String} <span>${currentSeason.cbfylrl}</span></li>--%>
                    <%--<li>${currentSeason.yylrl_String} <span>${currentSeason.yylrl}</span></li>--%>
                    <%--<li>${currentSeason.zyywcbl_String} <span>${currentSeason.zyywcbl}</span></li>--%>
                    <%--<li>${currentSeason.xsjll_String} <span>${currentSeason.xsjll}</span></li>--%>
                    <%--<li>${currentSeason.gbbcl_String} <span>${currentSeason.gbbcl}</span></li>--%>
                    <%--<li>${currentSeason.jzcbcl_String} <span>${currentSeason.jzcbcl}</span></li>--%>
                    <%--<li>${currentSeason.zcbcl_String} <span>${currentSeason.zcbcl}</span></li>--%>
                    <%--<li>${currentSeason.ssmll_String} <span>${currentSeason.ssmll}</span></li>--%>
                    <%--<li>${currentSeason.sxfybz_String} <span>${currentSeason.sxfybz}</span></li>--%>
                    <%--<li>${currentSeason.fzybz_String} <span>${currentSeason.fzybz}</span></li>--%>
                    <%--<li>${currentSeason.zylrbz_String} <span>${currentSeason.zylrbz}</span></li>--%>
                    <%--<li>${currentSeason.gxffl_String} <span>${currentSeason.gxffl}</span></li>--%>
                    <%--<li>${currentSeason.tzsyl_String} <span>${currentSeason.tzsyl}</span></li>--%>
                    <%--<li>${currentSeason.zyywlr_String} <span>${currentSeason.zyywlr}</span></li>--%>
                    <%--<li>${currentSeason.jzcsyl_String} <span>${currentSeason.jzcsyl}</span></li>--%>
                    <%--<li>${currentSeason.jqjzcsyl_String} <span>${currentSeason.jqjzcsyl}</span></li>--%>
                    <%--<li>${currentSeason.kcfjcxsyhdjlr_String} <span>${currentSeason.kcfjcxsyhdjlr}</span></li>--%>
                    <%--<li>${currentSeason.zyywsrzzl_String} <span>${currentSeason.zyywsrzzl}</span></li>--%>
                    <%--<li>${currentSeason.jlrzzl_String} <span>${seacurrentSeasonson.jlrzzl}</span></li>--%>
                    <%--<li>${currentSeason.jzczzl_String} <span>${currentSeason.jzczzl}</span></li>--%>
                    <%--<li>${currentSeason.zzczzl_String} <span>${currentSeason.zzczzl}</span></li>--%>
                    <%--</ul>--%>
            </div>

                <%--<p id="company_financial" class="stock_content_title"><img src="resources/img/logo_s.png">财务状况</p>--%>
                <%--<div id="company_financial_graph">--%>

                <%--</div>--%>

        </div>
    </c:otherwise>
</c:choose>

<%@ include file="footer.jsp"%>
</body>
</html>