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


    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/reset.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/common.css" />">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/stockSingleOld.css"/>">

    <script>
        var path = "<%=basePath%>";
        var jsonData = ${allinfo};
        var forecastData = ${forecastInfo};
        var stock_id = "${stockInfo.stockid}";
        var tmp_dynamic = ${intraday};
        var tmp_grade = ${grade};
        var stockList = ${stockList};
    </script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery.cookie.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/amcharts.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/serial.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amcharts/radar.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/amstock.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/themes/dark.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/gsap/src/uncompressed/TweenMax.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/gsap/src/uncompressed/plugins/ScrollToPlugin.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/stocksingle.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/header.js"></script>

    <script>

    </script>
</head>

<body>
<img id="stock_title_background" src="resources/img/background/stock_title_1.png">
<%@ include file="header.jsp"%>
<div class="main-content">
    <div class="info">
        <div class="name">
            <img src="resources/img/industry_icon/${stockInfo.industryid}.png">
            <div>
                <h2>${stockInfo.name}<span>(${stockInfo.stockid})</span></h2>
                <p>行业类型：${stockInfo.industry}</p>
            </div>
        </div>

        <hr class="hr_vertical">

        <div class="price">
            <h1 id="dynamic_price" class="dynamic_color">——</h1>
            <div>
                <span id="dynamic_devia_val" class="dynamic_color">—</span>
                <span id="dynamic_devia_per" class="dynamic_color">—</span>
            </div>
        </div>

        <hr class="hr_vertical">

        <div class="rank">
            <h6>行业排名</h6>
            <div>
                <hr class="hr_rank">
                <h5 class="stock-rank">
                    ${grade.ranks}
                </h5>
                <h5 class="industry-total">${grade.count}</h5>
            </div>
        </div>

        <hr class="hr_vertical">

        <div class="operation">
            <div id="operation_alert" style="display: none">
                <p>收藏成功！</p>
            </div>
            <div id="favor" class="unFavor"></div>
            <img id="add" src="resources/img/add.png">
        </div>
    </div>

    <div class="info num">
        <div class="num-static">
            <div id="dynamic_open" class="num-item">今开：暂无数据</div>
            <div id="dynamic_high" class="num-item">最高：暂无数据</div>
            <div id="dynamic__devVal" class="num-item dynamic_color">涨跌：暂无数据</div>
            <div id="dynamic__close" class="num-item">昨收：暂无数据</div>
            <div id="dynamic__low" class="num-item">最低：暂无数据</div>
            <div id="dynamic__amplitude" class="num-item">振幅：暂无数据</div>
        </div>
        <div class="num-dynamic">

            <div id="dynamic__volume" class="num-item">成交量：暂无数据</div>
            <div id="dynamic__pb" class="num-item">市净率：暂无数据</div>
            <div id="dynamic__adj" class="num-item">后复权价: 暂无数据</div>
            <div id="dynamic__turnover" class="num-item">换手率：暂无数据</div>
            <div id="dynamic__pe" class="num-item">市盈率：暂无数据</div>
            <div id="dynamic__amount" class="num-item">成交金额：暂无数据</div>
        </div>
    </div>

    <div id="nav">
        <span>·</span>
        <p id="show_basic" class="nav-item active">基本图表</p>
        <span>·</span>
        <p id="show_evaluate" class="nav-item">分析评估</p>
        <span>·</span>
        <p id="show_forecast" class="nav-item">走势预测</p>
        <span>·</span>
        <p id="show_dynamic" class="nav-item">实时分析</p>
        <span>·</span>
        <p id="show_company" class="nav-item">公司资讯</p>
        <span>·</span>
    </div>

    <div id="nav-sec">
        <div id="nav-sec0" class="nav-sec-item">
            <a href="#k_wrapper" class="targeted">K线图</a>
            <a href="#macd_wrapper">MACD</a>
            <a href="#rsi_wrapper">RSI</a>
            <a href="#kdj_wrapper">KDJ</a>
            <a href="#boll_wrapper">BOLL</a>
        </div>
        <a href="#"><img id="toTop" src="resources/img/top.png"/></a>
    </div>

    <%--<div id="basic" class="stock_content">--%>
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
        </div>

        <div id="rsi_wrapper" class="basic_graph_wrapper_other">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">RSI</p>
            <div id="rsi_graph" class="graph_basic_other">

            </div>
        </div>

        <div id="kdj_wrapper" class="basic_graph_wrapper_other">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">KDJ</p>
            <div id="kdj_graph" class="graph_basic_other">

            </div>
        </div>

        <div id="boll_wrapper" class="basic_graph_wrapper_other">
            <p class="stock_content_title"><img src="resources/img/logo_s.png">BOLL</p>
            <div id="boll_graph" class="graph_basic_other">

            </div>
        </div>
    </div>

    <div id="evaluate" class="stock_content" style="display: none">
        <div id="grade" class="stock_content_single">
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
                        <p>综合相关性：<span>0.96</span></p>
                        <p>该股与大盘极强相关</p>
                    </div>
                    <div class="relative_single_wrapper">
                        <p>Beta系数：<span>0.96</span></p>
                        <p>该股市场利益与大盘正相关,资金在该股收益是在大盘中收益的0.96倍</p>
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
            <p class="stock_content_title"><img src="resources/img/logo_s.png">走势预测<span>(未来三天收盘价)</span></p>
            <div id="forecast_graph">

            </div>
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
                    <p id="dynamic_out1" class="dynamic_five_level_item">卖一：<span>15.74</span></p>
                    <p id="dynamic_in1" class="dynamic_five_level_item">买一：<span>15.74</span></p>
                    <p id="dynamic_out2" class="dynamic_five_level_item">卖二：<span>15.74</span></p>
                    <p id="dynamic_in2" class="dynamic_five_level_item">买二：<span>15.74</span></p>
                    <p id="dynamic_out3" class="dynamic_five_level_item">卖三：<span>15.74</span></p>
                    <p id="dynamic_in3" class="dynamic_five_level_item">买三：<span>15.74</span></p>
                    <p id="dynamic_out4" class="dynamic_five_level_item">卖四：<span>15.74</span></p>
                    <p id="dynamic_in4" class="dynamic_five_level_item">买四：<span>15.74</span></p>
                    <p id="dynamic_out5" class="dynamic_five_level_item">卖五：<span>15.74</span></p>
                    <p id="dynamic_in5" class="dynamic_five_level_item">买五：<span>15.74</span></p>

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
            <a href="" target="_blank">【公告】天泽信息：第三届董事会2016年第二次临时会议决议公告<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：第三届监事会2016年第二次临时会议决议公告<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：关于控股子公司关联方为其贷款提供担保暨关联交易的公告<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：独立董事关于第三届董事会2016年第二次临时会议相关事项的独立意见<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：独立董事关于第三届董事会2016年第二次临时会议相关事项的事前认可意见<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：上海市广发律师事务所关于公司发行股份购买资产之标的资产过户的法律意见书<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：关于公司发行股份购买资产之资产过户完成的公告<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：海通证券股份有限公司关于公司发行股份购买资产暨重大资产重组之资产过户事<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【新闻】天泽信息重大重组获证监会核准<span>2016-05-26 10:34</span></a>
            <a href="" target="_blank">【公告】天泽信息：关于公司发行股份购买资产事项获得中国证监会核准的公告<span>2016-05-26 10:34</span></a>



            <p id="news_paper" class="stock_content_title"><img src="resources/img/logo_s.png">研究报告</p>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中银国际</span>互联网汽车周报(第27期)：谷歌、福特合资生产自动驾驶汽车</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>互联网汽车周报(第24期)：神州租车或将与e代驾达成战略合作</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>互联网汽车周报第22期：滴滴与宇通客车达成战略合作</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>互联网汽车行业周报(第15期)：奥迪、宝马、戴姆勒联合买下诺基亚HERE</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>互联网汽车行业系列报告之十三：互联网用车案例分析 UBER</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>互联网汽车行业周报(第14期)：Uber中国计划融资 或明年上市</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>互联网汽车系列报告之九：互联网二手车案例分析 车易拍</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中银国际</span>互联网汽车周报第3期：Uber引发市场关注</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>计算机行业2015年下半年投资策略：拥抱模式与技术双重颠覆</a>
            <a href="" target="_blank" class="news_paper_item"><span>2016-05-26 中信证券</span>互联网汽车周报(第5期)：互联网汽车指数走强</a>

        </div>

        <p id="company_rise" class="stock_content_title"><img src="resources/img/logo_s.png">增长</p>
        <div id="company_rise_graph">

        </div>

        <p id="company_profit" class="stock_content_title"><img src="resources/img/logo_s.png">盈利能力</p>
        <div id="company_profit_graph">

        </div>

        <p id="company_financial" class="stock_content_title"><img src="resources/img/logo_s.png">财务状况</p>
        <div id="company_financial_graph">

        </div>

    </div>
</div>
<%@ include file="footer.jsp"%>
</body>
</html>