<%@ page import="web.pojo.before.FavouriteStock" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="web.pojo.before.TabTablesData" %>
<%@ page import="com.alibaba.fastjson.JSON" %>
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" charset="UTF-8">
    <title>自选-Ascending</title>

    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/reset.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/common.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/favor.css"/>">

    <script>
        var path = "<%=basePath%>";
        var stockList = ${stockList};
        var hs300Data = <%=JSON.toJSON(request.getAttribute("hs300"))%>;
        var sh000001Data = <%=JSON.toJSON(request.getAttribute("sh000001"))%>;
        var sz399001Data = <%=JSON.toJSON(request.getAttribute("sz399001"))%>;
        var fav = ${favData}
//        console.log(sz399001Data);
//        console.log(fav);
    </script>

    <link rel="icon" type="image/png" sizes="192x192"  href="resources/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="resources/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="resources/img/favicon/manifest.json">

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery.cookie.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/amcharts.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/serial.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/amstock.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/themes/dark.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/header.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/favor.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

</head>
<body>
<img id="full_background" src="resources/img/background/background2.png">
<jsp:include page="header.jsp" flush="true"/>
<div class="main-content">
    <p class="stock_content_title"><img src="resources/img/logo_s.png">自选股列表</p>

    <div class="self_items">
        <%
            ArrayList<TabTablesData> hs300 = (ArrayList<TabTablesData>) request.getAttribute("hs300");
            ArrayList<TabTablesData> sh000001 = (ArrayList<TabTablesData>) request.getAttribute("sh000001");
            ArrayList<TabTablesData> sz399001 = (ArrayList<TabTablesData>) request.getAttribute("sz399001");

            out.print("<div class='self_item bench_item'>" +
                    "<div class='self_item_title'>" +
                    "<div class='self_item_info'>" +
                    "<img class='industry_logo' src='resources/img/industry_icon/33.png'>" +
                    "<div class='self_item_info_2'>" +
                    "<p class='self_item_name'>沪深300<span class='stock_id'>hs300</span></p>" +
                    "</div>" +
                    "</div>" +
                    "<div>" +
                    "<div>" +
                    "</div>" +
                    "</div>" +
                    "<div id='self_item_graph_0' class='self_item_graph'>" +
                    "</div>" +

                    "</div>" +
                    "</div>");
            out.print("<div class='self_item bench_item'>" +
                    "<div class='self_item_title'>" +
                    "<div class='self_item_info'>" +
                    "<img class='industry_logo' src='resources/img/industry_icon/33.png'>" +
                    "<div class='self_item_info_2'>" +
                    "<p class='self_item_name'>上证指数<span class='stock_id'>sh000001</span></p>" +
                    "</div>" +
                    "</div>" +
                    "<div class='rank'>" +
                    "<div>" +
                    "</div>" +
                    "</div>" +
                    "<div id='self_item_graph_1' class='self_item_graph'>" +
                    "</div>" +

                    "</div>" +
                    "</div>");
            out.print("<div class='self_item bench_item'>" +
                    "<div class='self_item_title'>" +
                    "<div class='self_item_info'>" +
                    "<img class='industry_logo' src='resources/img/industry_icon/33.png'>" +
                    "<div class='self_item_info_2'>" +
                    "<p class='self_item_name'>深证指数<span class='stock_id'>sz399001</span></p>" +
                    "</div>" +
                    "</div>" +
                    "<div class='rank'>" +
                    "<div>" +
                    "</div>" +
                    "</div>" +
                    "<div id='self_item_graph_2' class='self_item_graph'>" +
                    "</div>" +

                    "</div>" +
                    "</div>");

        %>
        <%
            ArrayList<ArrayList<FavouriteStock>> stocks = (ArrayList<ArrayList<FavouriteStock>>)request.getAttribute("fav");

            if(stocks==null){

            }else{
                for(int i=0;i<stocks.size();i++){
                    ArrayList<FavouriteStock> stock = stocks.get(i);

                    String stockid = null;
                    String stockname = null;
                    String industry = null;
                    String rank = null;
                    String count = null;
                    int industryid = 0;
                    try {
                        stockid = stock.get(0).stockid;
                        stockname = stock.get(0).name;
                        industry = stock.get(0).industry;
                        rank = stock.get(0).rankString;
                        count = stock.get(0).countString;
                        industryid = stock.get(0).industryid;

                        out.print("<div class='self_item'>" +
                                "<div class='self_item_title'>" +
                                "<div class='self_item_info'>" +
                                "<img class='industry_logo' src='resources/img/industry_icon/"+industryid+".png'>" +
                                "<div class='self_item_info_2'>" +
                                "<p class='self_item_name'>" + stockname + "<span class='stock_id'>" + stockid + "</span></p>" +
                                "<p class='self_item_title_industry'>行业: <span>"+industry+"</span></p>" +
                                "</div>" +
                                "</div>" +
                                "<div id='self_item_graph_"+(i+3)+"' class='self_item_graph'>" +
                                "</div>" +
                                "<div class='rank'>" +
                                "<h6>行业排名</h6>" +
                                "<div>" +
                                "<hr class='hr_rank'>" +
                                "<h5 class='stock-rank'>"+rank+"</h5>" +
                                "<h5 class='industry-total'>"+count+"</h5>" +
                                "</div>" +
                                "</div>" +
                                "<div class='self_item_operation'>" +
                                "<img class='favor' src='resources/img/favor.png'>" +
                                "<img class='add' src='resources/img/add.png'>" +
                                "</div>" +
                                "<div class='operation_alert' style='display:none'>"+
                                "<p>对比栏已有这只股票!</p>"+
                                "</div>"+
                                "</div>" +
                                "</div>");
                    } catch (Exception e) {

                        e.printStackTrace();
                    }
                }
            }
        %>
    </div>
</div>
<%@ include file="footer.jsp"%>
</body>
</html>