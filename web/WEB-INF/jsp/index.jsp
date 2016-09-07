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
  <meta http-equiv="Content-Type" content="text/html; charset=utf8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <title>Ascending</title>

  <link rel="icon" type="image/png" sizes="192x192"  href="resources/img/favicon/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="resources/img/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="resources/img/favicon/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="resources/img/favicon/favicon-16x16.png">
  <link rel="manifest" href="resources/img/favicon/manifest.json">

  <link rel="stylesheet" href="<c:url value="/resources/bundle/reset.css"/>"/>
  <link rel="stylesheet" href="<c:url value="/resources/bundle/common.css" />"/>
  <link rel="stylesheet" href="<c:url value="/resources/bundle/index.css" />"/>

  <script>
    var stockList = ${stockList};
    var intraday = ${intraday};

    <%--console.log(${industryRank});--%>
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
  <script type="text/javascript" rel="script" src="resources/js/index.js"></script>
  <script type="text/javascript" rel="script" src="resources/js/header.js"></script>

  <!-- Insert this line after script imports -->
  <script>if (window.module) module = window.module;</script>

</head>
<body>
<c:choose>
  <c:when test="${userInfo!=null}">
    <jsp:include page="usernav.jsp" flush="true">
      <jsp:param name="userInfo" value="${userInfo}"/>
    </jsp:include>
    <div id="main-page">
      <div id="index_first_block" class="fullBlock">
        <div id="logo_and_bench">
          <div id="logo_wrapper">
            <img src="resources/img/index_logo.png">
            <h1 nowrap>Awesome Stock Analysis System</h1>
            <a href="welcome.do" target="_blank">Why outstanding?</a>
          </div>

          <div id="bench_wrapper">
            <hr id="hr_bench" />
            <div id="bench_dynamic_wrapper">
              <div id="bench_title" class="stock_content_title">
                沪深300(hs300)
                <ul>
                  <li class="more_button">查看更多</li>
                  <li class="bench_link"><a href="bench.do?id=399300" target="_blank">沪深300</a></li>
                  <li class="bench_link"><a href="bench.do?id=000001" target="_blank">上证</a></li>
                  <li class="bench_link"><a href="bench.do?id=399001" target="_blank">深证</a></li>
                </ul>
              </div>
              <div class="num_wrapper">
                <h2><span>最&nbsp;&nbsp;&nbsp;高：</span><span id="dynamic_high">--</span></h2>
                <h2><span>最&nbsp;&nbsp;&nbsp;低：</span><span id="dynamic_low">--</span></h2>
                <h2 class="stock_num"><span>涨家数：</span><span id="dynamic_up_num">--</span></h2>
              </div>
              <div class="num_wrapper">
                <h2><span>今&nbsp;&nbsp;&nbsp;开：</span><span id="dynamic_open">--</span></h2>
                <h2><span>昨&nbsp;&nbsp;&nbsp;收：</span><span id="dynamic_close">--</span></h2>
                <h2 class="stock_num"><span>跌家数：</span><span id="dynamic_down_num">--</span></h2>
              </div>
              <div class="num_wrapper">
                <h2><span>成交额：</span><span id="dynamic_volume">--</span></h2>
                <h2><span>成交量：</span><span id="dynamic_amount">--</span></h2>
                <h2 class="stock_num"><span>平家数：</span><span id="dynamic_neutral_num">--</span></h2>
              </div>
            </div>
              <%--<div class="num_wrapper_row">--%>
              <%--</div>--%>

            <br/>

            <div id="bench_graph_wrapper">

            </div>
          </div>
        </div>
        <div class="index-content">
          <div id="down"></div>
        </div>
      </div>

      <div id="rank_wrapper" class="halfBlock">
        <div class="index-content index-content-row">
          <div class="rank_type">
            <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">个股涨幅榜</p>
            <table>
              <tr><th>排名</th><th>名称</th><th>最新价</th><th>涨幅	</th><th>换手率</th></tr>
              <c:forEach items="${stockRank}" var="stock" varStatus="s">
                <tr><td>${s.index+1}</td><td>${stock.stockname}</td><td>${stock.price}</td><td>${stock.deviation}%</td><td>${stock.turnover}</td></tr>
              </c:forEach>
            </table>
          </div>

          <div class="rank_type">
            <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">行业涨幅榜</p>
            <table>
              <tr><th>排名</th><th>名称</th><th>涨幅</th><th>领涨股</th><th>涨幅</th></tr>
              <c:forEach items="${industryRank}" var="industry" varStatus="s">
                <tr><td>${s.index+1}</td><td>${industry.industryname}</td><td>${industry.industrydevia}%</td><td>${industry.stockname}</td><td>${industry.stockdevia}%</td></tr>
              </c:forEach>
            </table>
          </div>

          <div class="rank_type">
            <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">明日涨停预测</p>
            <table id="stop_recommend">
              <tr><th>股票</th><th>id</th></tr>
              <c:forEach items="${stopRecommend}" var="stop" varStatus="s" end="9">
                <tr class="stop_recommand_stock">
                  <td><a href="stock.do?id=${stop.id}" target="_blank">${stop.name}</a></td>
                  <td><a href="stock.do?id=${stop.id}" target="_blank">${stop.id}</a></td>
                </tr>
              </c:forEach>
            </table>
          </div>
        </div>
      </div>

      <div id="hot" class="fullBlock">
        <div class="index-content">
          <p class="stock_content_title"><img src="resources/img/logo_s.png">股市热点</p>

          <div class="hot_item hot_item_tr">
            <div class="hot_item_title">
              <p>热点概念</p>
            </div>
            <div class="hot_item_ds">
              <p>驱动事件</p>
            </div>
            <div class="hot_item_stocks">
              <div class="hot_item_stock">
                <h1>相关股票</h1>
                <h1 class="narrow">最新价格</h1>
                <h1 class="narrow">涨跌</h1>
                  <%--<p>操作</p>--%>
              </div>
            </div>
          </div>

          <c:forEach items="${hotspots}" var="hotspot" varStatus="s">
            <div class="hot_item">
              <a href="${hotspot.url}" target="_blank">
                <div class="hot_item_title">
                  <h1>${hotspot.keyword}</h1>
                  <h2>${hotspot.date}</h2>
                  <h2>${hotspot.description}</h2>
                </div>
              </a>
              <a href="${hotspot.url}" target="_blank">
                <div class="hot_item_ds">
                    ${hotspot.drivingEvent}
                </div>
              </a>
              <div class="hot_item_stocks">
                <div class="hot_item_stock">
                  <h1>${hotspot.stockName1} <span>${hotspot.stockID1}</span></h1>
                  <h1 class="narrow">${hotspot.stockPrice1}</h1>
                  <h1 class="narrow">${hotspot.devia1}</h1>
                </div>
                <div class="hot_item_stock">
                  <h1>${hotspot.stockName2} <span>${hotspot.stockID2}</span></h1>
                  <h1 class="narrow">${hotspot.stockPrice2}</h1>
                  <h1 class="narrow">${hotspot.devia2}</h1>
                </div>
                <div class="hot_item_stock">
                  <h1>${hotspot.stockName3} <span>${hotspot.stockID3}</span></h1>
                  <h1 class="narrow">${hotspot.stockPrice3}</h1>
                  <h1 class="narrow">${hotspot.devia3}</h1>
                </div>
              </div>
            </div>
          </c:forEach>
        </div>
      </div>

      <div id="news" class="halfBlock">
        <div class="index-content index-content-row">
          <div class="news_type">
            <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">财经要闻</p>
            <c:forEach items="${financeNews}" var="finance" varStatus="s" end="10">
              <a href="${finance.url}" target="_blank">${finance.title}</a>
            </c:forEach>
          </div>

          <div class="news_type">
            <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">证券要闻</p>
            <c:forEach items="${stockNews}" var="stock" varStatus="s" end="10">
              <a href="${stock.url}" target="_blank">${stock.title}</a>
            </c:forEach>
          </div>

          <div class="news_type">
            <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">公司要闻</p>
            <c:forEach items="${companyNews}" var="company" varStatus="s" end="10">
              <a href="${company.url}" target="_blank">${company.title}</a>
            </c:forEach>
          </div>
        </div>
      </div>

      <div id="agency">
        <div class="index-content">
          <div id="agencies" class="agency_wrapper">
            <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">机构直达</p>
            <div class="agency_ul">
              <a class="agency_item" target="_blank" href="http://www.tpyzq.com/main/home/index.shtml">
                <img src="resources/img/agency/tpy_gray.png">
                <p>太平洋证券</p>
              </a>
              <a class="agency_item" target="_blank" href="http://www.foundersc.com/wskhjy/COL003140FS.shtml">
                <img src="resources/img/agency/fz_gray.png">
                <p>方正证券</p>
              </a>
              <a class="agency_item" target="_blank" href="http://dtsbc.com.cn/main/home/index.html?r=0.4924360930195768">
                <img src="resources/img/agency/dt_gray.png">
                <p>大同证券</p>
              </a>
              <a class="agency_item" target="_blank" href="http://hb.htsc.com.cn/">
                <img src="resources/img/agency/ht_gray.png">
                <p>华泰证券</p>
              </a>
              <a class="agency_item" target="_blank" href="http://hlt.zszq.com/">
                <img src="resources/img/agency/zs_gray.png">
                <p>中山证券</p>
              </a>
              <a class="agency_item" target="_blank" href="http://www.ytzq.com/web/html/index/index.html">
                <img src="resources/img/agency/yt_gray.png">
                <p>银泰证券</p>
              </a>
            </div>
          </div>

        </div>

        <%@ include file="footer.jsp"%>
      </div>
    </div>
  </c:when>
  <c:otherwise>
    <jsp:include page="header.jsp" flush="true"/>
    <div id="index_first_block" class="fullBlock">
      <div id="logo_and_bench">
        <div id="logo_wrapper">
          <img src="resources/img/index_logo.png">
          <h1 nowrap>Awesome Stock Analysis System</h1>
          <a href="welcome.do" target="_blank">Why outstanding?</a>
        </div>

        <div id="bench_wrapper">
          <hr id="hr_bench" />
          <div id="bench_dynamic_wrapper">
            <div id="bench_title" class="stock_content_title">
              沪深300(hs300)
              <ul>
                <li class="more_button">查看更多</li>
                <li class="bench_link"><a href="bench.do?id=399300" target="_blank">沪深300</a></li>
                <li class="bench_link"><a href="bench.do?id=000001" target="_blank">上证</a></li>
                <li class="bench_link"><a href="bench.do?id=399001" target="_blank">深证</a></li>
              </ul>
            </div>
            <div class="num_wrapper">
              <h2><span>最&nbsp;&nbsp;&nbsp;高：</span><span id="dynamic_high">--</span></h2>
              <h2><span>最&nbsp;&nbsp;&nbsp;低：</span><span id="dynamic_low">--</span></h2>
              <h2 class="stock_num"><span>涨家数：</span><span id="dynamic_up_num">--</span></h2>
            </div>
            <div class="num_wrapper">
              <h2><span>今&nbsp;&nbsp;&nbsp;开：</span><span id="dynamic_open">--</span></h2>
              <h2><span>昨&nbsp;&nbsp;&nbsp;收：</span><span id="dynamic_close">--</span></h2>
              <h2 class="stock_num"><span>跌家数：</span><span id="dynamic_down_num">--</span></h2>
            </div>
            <div class="num_wrapper">
              <h2><span>成交额：</span><span id="dynamic_volume">--</span></h2>
              <h2><span>成交量：</span><span id="dynamic_amount">--</span></h2>
              <h2 class="stock_num"><span>平家数：</span><span id="dynamic_neutral_num">--</span></h2>
            </div>
          </div>
            <%--<div class="num_wrapper_row">--%>
            <%--</div>--%>

          <br/>

          <div id="bench_graph_wrapper">

          </div>
        </div>
      </div>
      <div class="index-content">
        <div id="down"></div>
      </div>
    </div>

    <div id="rank_wrapper" class="halfBlock">
      <div class="index-content index-content-row">
        <div class="rank_type">
          <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">个股涨幅榜</p>
          <table>
            <tr><th>排名</th><th>名称</th><th>最新价</th><th>涨幅	</th><th>换手率</th></tr>
            <c:forEach items="${stockRank}" var="stock" varStatus="s">
              <tr><td>${s.index+1}</td><td>${stock.stockname}</td><td>${stock.price}</td><td>${stock.deviation}%</td><td>${stock.turnover}</td></tr>
            </c:forEach>
          </table>
        </div>

        <div class="rank_type">
          <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">行业涨幅榜</p>
          <table>
            <tr><th>排名</th><th>名称</th><th>涨幅</th><th>领涨股</th><th>涨幅</th></tr>
            <c:forEach items="${industryRank}" var="industry" varStatus="s">
              <tr><td>${s.index+1}</td><td>${industry.industryname}</td><td>${industry.industrydevia}%</td><td>${industry.stockname}</td><td>${industry.stockdevia}%</td></tr>
            </c:forEach>
          </table>
        </div>

        <div class="rank_type">
          <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">明日涨停预测</p>
          <table id="stop_recommend">
            <tr><th>股票</th><th>id</th></tr>
            <c:forEach items="${stopRecommend}" var="stop" varStatus="s" end="9">
              <tr class="stop_recommand_stock">
                <td><a href="stock.do?id=${stop.id}" target="_blank">${stop.name}</a></td>
                <td><a href="stock.do?id=${stop.id}" target="_blank">${stop.id}</a></td>
              </tr>
            </c:forEach>
          </table>
        </div>
      </div>
    </div>

    <div id="hot" class="fullBlock">
      <div class="index-content">
        <p class="stock_content_title"><img src="resources/img/logo_s.png">股市热点</p>

        <div class="hot_item hot_item_tr">
          <div class="hot_item_title">
            <p>热点概念</p>
          </div>
          <div class="hot_item_ds">
            <p>驱动事件</p>
          </div>
          <div class="hot_item_stocks">
            <div class="hot_item_stock">
              <h1>相关股票</h1>
              <h1 class="narrow">最新价格</h1>
              <h1 class="narrow">涨跌</h1>
                <%--<p>操作</p>--%>
            </div>
          </div>
        </div>

        <c:forEach items="${hotspots}" var="hotspot" varStatus="s">
          <div class="hot_item">
            <a href="${hotspot.url}" target="_blank">
              <div class="hot_item_title">
                <h1>${hotspot.keyword}</h1>
                <h2>${hotspot.date}</h2>
                <h2>${hotspot.description}</h2>
              </div>
            </a>
            <a href="${hotspot.url}" target="_blank">
              <div class="hot_item_ds">
                  ${hotspot.drivingEvent}
              </div>
            </a>
            <div class="hot_item_stocks">
              <div class="hot_item_stock">
                <h1>${hotspot.stockName1} <span>${hotspot.stockID1}</span></h1>
                <h1 class="narrow">${hotspot.stockPrice1}</h1>
                <h1 class="narrow">${hotspot.devia1}</h1>
              </div>
              <div class="hot_item_stock">
                <h1>${hotspot.stockName2} <span>${hotspot.stockID2}</span></h1>
                <h1 class="narrow">${hotspot.stockPrice2}</h1>
                <h1 class="narrow">${hotspot.devia2}</h1>
              </div>
              <div class="hot_item_stock">
                <h1>${hotspot.stockName3} <span>${hotspot.stockID3}</span></h1>
                <h1 class="narrow">${hotspot.stockPrice3}</h1>
                <h1 class="narrow">${hotspot.devia3}</h1>
              </div>
            </div>
          </div>
        </c:forEach>
      </div>
    </div>

    <div id="news" class="halfBlock">
      <div class="index-content index-content-row">
        <div class="news_type">
          <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">财经要闻</p>
          <c:forEach items="${financeNews}" var="finance" varStatus="s" end="10">
            <a href="${finance.url}" target="_blank">${finance.title}</a>
          </c:forEach>
        </div>

        <div class="news_type">
          <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">证券要闻</p>
          <c:forEach items="${stockNews}" var="stock" varStatus="s" end="10">
            <a href="${stock.url}" target="_blank">${stock.title}</a>
          </c:forEach>
        </div>

        <div class="news_type">
          <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">公司要闻</p>
          <c:forEach items="${companyNews}" var="company" varStatus="s" end="10">
            <a href="${company.url}" target="_blank">${company.title}</a>
          </c:forEach>
        </div>
      </div>
    </div>

    <div id="agency">
      <div class="index-content">
        <div id="agencies" class="agency_wrapper">
          <p class="stock_content_title stock_content_title_dark"><img src="resources/img/logo_s.png">机构直达</p>
          <div class="agency_ul">
            <a class="agency_item" target="_blank" href="http://www.tpyzq.com/main/home/index.shtml">
              <img src="resources/img/agency/tpy_gray.png">
              <p>太平洋证券</p>
            </a>
            <a class="agency_item" target="_blank" href="http://www.foundersc.com/wskhjy/COL003140FS.shtml">
              <img src="resources/img/agency/fz_gray.png">
              <p>方正证券</p>
            </a>
            <a class="agency_item" target="_blank" href="http://dtsbc.com.cn/main/home/index.html?r=0.4924360930195768">
              <img src="resources/img/agency/dt_gray.png">
              <p>大同证券</p>
            </a>
            <a class="agency_item" target="_blank" href="http://hb.htsc.com.cn/">
              <img src="resources/img/agency/ht_gray.png">
              <p>华泰证券</p>
            </a>
            <a class="agency_item" target="_blank" href="http://hlt.zszq.com/">
              <img src="resources/img/agency/zs_gray.png">
              <p>中山证券</p>
            </a>
            <a class="agency_item" target="_blank" href="http://www.ytzq.com/web/html/index/index.html">
              <img src="resources/img/agency/yt_gray.png">
              <p>银泰证券</p>
            </a>
          </div>
        </div>

      </div>

      <%@ include file="footer.jsp"%>
    </div>
  </c:otherwise>
</c:choose>

</body>
</html>
