var navList;
var navContents;
var preNavIndex;
var secondNavList = [
    '<div id="nav-sec0" class="nav-sec-item"><a href="#k_wrapper" class="targeted">K线图</a><a href="#macd_wrapper">MACD</a><a href="#rsi_wrapper">RSI</a><a href="#kdj_wrapper">KDJ</a><a href="#boll_wrapper">BOLL</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ,

    '<div id="nav-sec2" class="nav-sec-item"><a href="#forecast_one" class="targeted">走势预测</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ,
    '<div id="nav-sec3" class="nav-sec-item"><a href="#dynamic_trade_wrapper" class="targeted">实时交易</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ,
    '<div id="nav-sec4" class="nav-sec-item"><a href="#range_wrapper" class="targeted">涨跌分布</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
   ];
var secondSmallNavList = [
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#k_wrapper" class="targeted">K线图</a><a href="#macd_wrapper">MACD</a><a href="#rsi_wrapper">RSI</a><a href="#kdj_wrapper">KDJ</a><a href="#boll_wrapper">BOLL</a>'
    ,
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#forecast_one" class="targeted">走势预测</a>'
    ,
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#dynamic_trade_wrapper" class="targeted">实时交易</a>'
    ,
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#range_wrapper" class="targeted">涨跌分布</a>'
    ];

window.onload = function(){
    initialHeader();
    navList = document.querySelectorAll(".nav-item");
    navContents = document.querySelectorAll(".stock_content");
    preNavIndex = 0;

    navListener();
    //requestDynamicData();

    if(mq700.matches){
        scrollMagic();
        $('#nav-wrapper').height($('#nav').height())
        .width($('#nav').width());

    }
};

window.onscroll = function(){
    var windowTop = window.scrollY;
    $("#nav-sec").css({
        "position":"absolute",
        "top":windowTop+380+"px"
    });

    if(mq700.matches){
        if(windowTop > 268){
            $("#nav").css({
                'position':'fixed',
                'top':'0',
                'left':'0',
                'z-index':'50',
                'background-color': 'rgba(3,27,47,1)'
            });
        }else{
            $('#nav').css({
                'position':'relative',
                'z-index':'50',
                'background': 'none'
            });
        }
    }
};

function scrollMagic(){
    var controller = new ScrollMagic.Controller();

    var headerFade = new ScrollMagic.Scene({
       triggerElement:"#info",
       triggerHook:"onLeave",
       duration:"25%"
    }).addTo(controller)
        .setTween("#header",1,{opacity:0});

    var navPin = new ScrollMagic.Scene({
        triggerElement:"#nav",
        triggerHook:"onLeave",
    }).addTo(controller)
//    .setPin("#nav")
        .setTween("#header",0,{'display':'none'});

}

function navListener(){
    $("#nav").on("click",".nav-item",function(){
        var index = 0;
        for(var i = 0;i < navList.length;i++){
            if(this == navList[i]){
                index = i;
            }
        }
        $(navList[preNavIndex]).removeClass("active");
        $(navList[index]).addClass("active");
        $(navContents[preNavIndex]).hide();

        $(navContents[index]).show();
        if(!mq700.matches){
            $("#nav-sec").html(secondNavList[index]);
        }else{
            $('.nav-sec-small-item').html(secondSmallNavList[index]);
        }

        $(navContents[index]).slideDown();

        preNavIndex = index;

        if(mq700.matches){
            var href = $(secondNavList[index]).find('a')[0].getAttribute('href');
            console.log(href);
            scrollToElement(document.querySelector(href));
        }
    });

     $(".nav-sec").on("click","a",function(evt){
        console.log(this);
         evt.preventDefault();
         var href = this.getAttribute('href');

//        console.log(href);
        if(href == '#'){
            TweenMax.to(window,1,
                {scrollTo:{y:0},ease:Power2.easeInOut}
            );
        }else{
             scrollToElement(document.querySelector(href));

             $(this.parentNode).find("a").each(function(){
                $(this).removeClass("targeted");
             });
             $(this).addClass("targeted");
        }

     });

     $("#nav-sec-small").on("click","#nav-sec-small-hide",function(){
        console.log("111"+this);
        $('#nav-sec-small-show').show();
        $(".nav-sec-small-item").hide();
     }).on("click","#nav-sec-small-show",function(){
        $(this).hide();
        $(".nav-sec-small-item").show();
     })
}

function scrollToElement(element){
    var topOfElement = element.offsetTop-80;

    TweenMax.to(window,1,
        {scrollTo:{y:topOfElement},ease:Power2.easeInOut}
    );
}


Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

/*****************************************************************
 * 动态更新数据
 * */

function requestDynamicData() {

    $.ajax({
        type: 'GET',
        url: "bench/active.do?id="+stockid,
        dataType: 'json',
        success: function(data) {
            updateDynamicData(data.data);
        },
        error: function() {
            //alert("current futureData error");
            console.log("error");
        }
    });
}

function updateDynamicData(data) {
    if(data.devia_val!=$("#dynamic_devia_val").html()){
        if(data.devia_val>=0){
            $("#dynamic_price").html(data.price+"<img src='resources/img/up.png'>");
            $("#dynamic_price").addClass("value_change").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $("#dynamic_price").removeClass("value_change");
            });
        }else{
            $("#dynamic_price").html(data.price+"<img src='resources/img/down.png'>");
            $("#dynamic_price").addClass("value_change").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $("#dynamic_price").removeClass("value_change");
            });
        }
    }

    $("#dynamic_devia_val").html(data.devia_val);
    $("#dynamic_devia_per").html(data.devia_per);

    $("#dynamic_open").html(data.open);
    $("#dynamic_close").html(data.close);
    $("#dynamic_high").html(data.high);
    $("#dynamic_low").html(data.low);
    $("#dynamic__high").html("最高：<span>"+data.high+"</span>");
    $("#dynamic__low").html("最低：<span>"+data.low+"</span>");
    $("#dynamic__open").html("今开：<span>"+data.open+"</span>");
    $("#dynamic__close").html("昨收：<span>"+data.close+"</span>");
    $("#dynamic__amount").html("成交量：<span>"+data.amount+"</span>");
    $("#dynamic__volume").html("成交金额：<span>"+data.volume+"</span>");

    $("#dynamic_up").html("涨家数：<span>"+data.up_num+"</span>");
    $("#dynamic_down").html("跌家数：<span>"+data.down_num+"</span>");
    $("#dynamic_neutral").html("平家数：<span>"+data.neutral_num+"</span>");
}

window.setInterval(requestDynamicData, 5000);
/*********************************************************************
 *
 * 以下是图表
 * */


var tabChartData = [];
var rangeChartData = [];

var valueChart;
var macdChart;
var rsiChart;
var kdjChart;
var bollChart;

var intradayChart;
var futureChart;
var bpForecastChart;

var rangeChart;

AmCharts.ready(function () {
    AmCharts.theme = AmCharts.themes.dark;

    initValueData();
    initDynamicData();
    initDataSet();
    initRangeData();

    initValueChart();
    initMacdChart();
    initRsiChart();
    initKdjChart();
    initBollChart();

    initDynamicChart();
    initForecastChart();
    initRangeChart();
    initBpForecastChart();
});

function initValueData() {
    for(var i=0;i<allinfo.length;i++){
        if(allinfo[i].volume==0){
            allinfo[i]["colorField"] = "rgba(0,0,0,0.4)";
            allinfo[i]["lineColorField"] = "rgba(0,0,0,0.4)";
        }
    }

    for(i=allinfo.length-10;i<allinfo.length;i++){
        tabChartData.push(allinfo[i]);
    }
}

function initRangeData() {
    for(var i=0;i<rangeData.length;i++){
        rangeChartData.push(rangeData[i]);
        rangeChartData[i]["range0Size"] = -9;
        rangeChartData[i]["range1Size"] = -7;
        rangeChartData[i]["range2Size"] = -5;
        rangeChartData[i]["range3Size"] = -3;
        rangeChartData[i]["range4Size"] = -1;
        rangeChartData[i]["range5Size"] = 1;
        rangeChartData[i]["range6Size"] = 3;
        rangeChartData[i]["range7Size"] = 5;
        rangeChartData[i]["range8Size"] = 7;
        rangeChartData[i]["range9Size"] = 9;
        rangeChartData[i]["bullet0"] = rangeChartData[i].range0/10.0;
        rangeChartData[i]["bullet1"] = rangeChartData[i].range1/10.0;
        rangeChartData[i]["bullet2"] = rangeChartData[i].range2/10.0;
        rangeChartData[i]["bullet3"] = rangeChartData[i].range3/10.0;
        rangeChartData[i]["bullet4"] = rangeChartData[i].range4/10.0;
        rangeChartData[i]["bullet5"] = rangeChartData[i].range5/10.0;
        rangeChartData[i]["bullet6"] = rangeChartData[i].range6/10.0;
        rangeChartData[i]["bullet7"] = rangeChartData[i].range7/10.0;
        rangeChartData[i]["bullet8"] = rangeChartData[i].range8/10.0;
        rangeChartData[i]["bullet9"] = rangeChartData[i].range9/10.0;
    }

    for(i=0;i<5;i++){
        rangeChartData.shift();
    }

    console.log(rangeChartData);
}

function initDataSet() {
    dataSet = new AmCharts.DataSet();
    dataSet.fieldMappings = [{
        fromField: "open",
        toField: "open"
    }, {
        fromField: "close",
        toField: "close"
    }, {
        fromField: "high",
        toField: "high"
    }, {
        fromField: "low",
        toField: "low"
    }, {
        fromField: "ma5",
        toField: "ma5"
    }, {
        fromField: "ma20",
        toField: "ma20"
    }, {
        fromField: "volume",
        toField: "volume"
    }, {
        fromField: "amount",
        toField: "total"
    }, {
        fromField: "macd",
        toField: "macd"
    }, {
        fromField: "diff",
        toField: "diff"
    }, {
        fromField: "dea",
        toField: "dea"
    }, {
        fromField: "atr",
        toField: "atr"
    }, {
        fromField: "slowK",
        toField: "slowK"
    }, {
        fromField: "slowD",
        toField: "slowD"
    }, {
        fromField: "slowJ",
        toField: "slowJ"
    }, {
        fromField: "rsi",
        toField: "rsi"
    }, {
        fromField: "boll_upper",
        toField: "boll_upper"
    }, {
        fromField: "boll_middle",
        toField: "boll_middle"
    }, {
        fromField: "boll_low",
        toField: "boll_low"
    }];

    dataSet.dataProvider = allinfo;
    dataSet.categoryField = "date";
}

function initValueChart() {
    valueChart = new AmCharts.AmStockChart();
    valueChart.addClassNames = true;

    valueChart.dataSets = [dataSet];

    //*******************************************ValuePanel
    var valuePanel = new AmCharts.StockPanel();
    valuePanel.title = "Value";
    valuePanel.columnWidth = 0.6;

    var valueCategoryAxis = valuePanel.categoryAxis;
    valueCategoryAxis.color = "#cccccc";

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.color = "#cccccc";
    valueAxis.inside = true;
    valuePanel.addValueAxis(valueAxis);

    var valueGraph = new AmCharts.StockGraph();
    valueGraph.title = "Value";
    valueGraph.valueAxis = valueAxis;
    valueGraph.type = "candlestick";
    valueGraph.openField = "open";
    valueGraph.closeField = "close";
    valueGraph.highField = "high";
    valueGraph.lowField = "low";
    valueGraph.valueField = "close";
    valueGraph.fillColors = "#990033";
    valueGraph.lineColor = "#990033";
    valueGraph.negativeFillColors = "rgba(0,0,0,0)";
    valueGraph.negativeFillAlphas = 0;
    valueGraph.negativeLineColor = "#bbbbbb";
    valueGraph.fillAlphas = 1;
    valueGraph.balloonText = "开盘价: <b>[[open]]</b><br>收盘价: <b>[[close]]</b><br>最低价: <b>[[low]]</b><br>最高价: <b>[[high]]</b>";
    valueGraph.useDataSetColors = false;
    valueGraph.colorField = "colorField";
    valueGraph.lineColorField = "lineColorField";
    valuePanel.addStockGraph(valueGraph);

    var ma5Graph = new AmCharts.StockGraph();
    ma5Graph.title = "MA 5";
    ma5Graph.type = "line";
    ma5Graph.valueField = "ma5";
    ma5Graph.fillColors = "#ffffcc";
    ma5Graph.lineColor = "#ffffCC";
    ma5Graph.balloonText = "五日均线: <b>[[value]]</b>";
    ma5Graph.useDataSetColors = false;
    valuePanel.addStockGraph(ma5Graph);

    var ma20Graph = new AmCharts.StockGraph();
    ma20Graph.title = "MA 20";
    ma20Graph.type = "line";
    ma20Graph.valueField = "ma20";
    ma20Graph.balloonText = "二十日均线: <b>[[value]]</b>";
    valuePanel.addStockGraph(ma20Graph);

    var valueLegend = new AmCharts.StockLegend();
    valueLegend.position = "top";
    valueLegend.valueText = null;
    valuePanel.stockLegend = valueLegend;


    var volumePanel = new AmCharts.StockPanel();
    volumePanel.title = "Volume/Total";
    volumePanel.showCategoryAxis = false;
    volumePanel.columnWidth = 0.6;

    var volumeAxis = new AmCharts.ValueAxis();
    volumeAxis.inside = true;
    volumeAxis.usePrefixes = true;
    volumeAxis.color = "#cccccc";
    volumePanel.addValueAxis(volumeAxis);

    var volumeGraph = new AmCharts.StockGraph();
    volumeGraph.title = "Volume";
    volumeGraph.type = "column";
    volumeGraph.fillAlphas = 1;
    volumeGraph.valueField = "volume";
    volumeGraph.fillColors = "#607d98";
    volumeGraph.lineColor = "#607d98";
    volumeGraph.valueAxis = volumeAxis;
    volumeGraph.balloonText = "成交量: <b>[[value]]</b>";
    volumeGraph.useDataSetColors = false;

    volumePanel.addStockGraph(volumeGraph);

    var volumeLegend = new AmCharts.StockLegend();
    volumeLegend.labelText = "[[title]]";
    volumeLegend.position = "top";
    volumeLegend.valueText = null;
    volumePanel.stockLegend = volumeLegend;

    var cursor = new AmCharts.ChartCursorSettings();
    cursor.fullWidth = true;
    cursor.valueBalloonsEnabled = true;
    cursor.cursorAlpha = 0.1;
    valueChart.chartCursorSettings = cursor;

    var scrollbar = new AmCharts.ChartScrollbarSettings();
    scrollbar.updateOnReleaseOnly = false;
    //scrollbar.position = "top";
    scrollbar.color = "#cccccc";
    valueChart.chartScrollbarSettings = scrollbar;

    var categoryAxe = new AmCharts.CategoryAxesSettings();
    categoryAxe.groupToPeriods = ["WW", "MM"];
    categoryAxe.maxSeries = 60;
    valueChart.categoryAxesSettings = categoryAxe;

    valuePanel.percentHeight = 65;
    volumePanel.percentHeight = 35;

    valueChart.panels = [valuePanel, volumePanel];

    valueChart.write("stock_graph");

    zoomChart(valueChart, allinfo);
}

function initDynamicData() {
    for(var i=0;i<intraday.length;i++){
        var d = intraday[i].date+"";
        var t = intraday[i].time+"";
        if(t.length==8){
            t = "0"+t;
        }
        var tmp = AmCharts.stringToDate(""+d+t, "YYYYMMDDHHNNSSQQQ");
        intraday[i]["realTime"] = tmp;
    }
}

function zoomChart(chart, chartData) {
    if(chartData.length<=30) return;
    var start = new Date(chartData[chartData.length-30].date.replace(/-/g, "/"));
    var end = new Date(chartData[chartData.length-1].date.replace(/-/g, "/"));
    end.setDate(end.getDate()+1);
    chart.zoom(start, end);
}

function initMacdChart() {
    macdChart = new AmCharts.AmSerialChart();

    //macd图表的全局设置
    macdChart.addClassNames = true;
    macdChart.title = "MACD";
    macdChart.dataProvider = tabChartData;
    macdChart.categoryField = "date";
    macdChart.columnWidth = 0.5;
    //macdChart.dataDateFormat = "YYYY-MM-DD";

    var macdAxis = new AmCharts.ValueAxis();
    macdAxis.inside = true;
    macdAxis.color = "#cccccc";
    macdChart.addValueAxis(macdAxis);

    var categoryAxis = macdChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.dateFormats = [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }];

    var macdGraph = new AmCharts.AmGraph();
    macdGraph.title = "MACD";
    macdGraph.type = "column";
    macdGraph.valueField = "macd";
    macdGraph.fillAlphas = 1;
    macdGraph.fillColors = "#6699cc";
    macdGraph.lineColor = "#6699cc";
    macdGraph.useDataSetColors = false;
    macdGraph.balloonText = "MACD: <b>[[value]]</b>";
    macdGraph.fillColors = "#990033";
    macdGraph.lineColor = "#990033";
    macdGraph.negativeFillColors = "#006633";
    macdGraph.negativeLineColor = "#006633";
    macdChart.addGraph(macdGraph);

    var diffGraph = new AmCharts.AmGraph();
    diffGraph.title = "DIFF";
    diffGraph.type = "line";
    diffGraph.valueField = "dif";
    diffGraph.lineColor = "#669999";
    diffGraph.useDataSetColors = false;
    diffGraph.balloonText = "DIFF: <b>[[value]]</b>";
    diffGraph.classNameField = "eventClass";
    macdChart.addGraph(diffGraph);

    var atrGraph = new AmCharts.AmChart();
    atrGraph.title = "ATR";
    atrGraph.type = "line";
    atrGraph.valueField = "atr";
    atrGraph.lineColor = "#990033";
    atrGraph.useDataSetColors = false;
    atrGraph.balloonText = "ATR: <b>[[value]]</b>";
    macdChart.addGraph(atrGraph);

    var deaGraph = new AmCharts.AmChart();
    deaGraph.title = "DEA";
    deaGraph.valueField = "dea";
    deaGraph.lineColor = "#cccc99";
    deaGraph.useDataSetColors = false;
    deaGraph.balloonText = "DEA: <b>[[value]]</b>";
    macdChart.addGraph(deaGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.valueBalloonsEnabled = true;
    cursor.fullWidth = true;
    cursor.cursorAlpha = 0.1;

    macdChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    legend.valueText = null;
    macdChart.legend = legend;

    macdChart.write("macd_graph");

    //zoomChart(macdChart, tabChartData);
}

function initRsiChart() {
    rsiChart = new AmCharts.AmSerialChart();

    //rsi图表的全局设置
    rsiChart.addClassNames = true;
    rsiChart.title = "RSI";
    rsiChart.dataProvider = tabChartData;
    rsiChart.categoryField = "date";
    //rsiChart.dataDateFormat = "YYYY-MM-DD";

    var rsiAxis6 = new AmCharts.ValueAxis();
    rsiAxis6.color = "#cccccc";
    rsiAxis6.inside = true;

    rsiChart.addValueAxis(rsiAxis6);

    var categoryAxis = rsiChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.dateFormats = [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }];

    var rsi6Graph = new AmCharts.AmGraph();
    rsi6Graph.title = "RSI 6";
    rsi6Graph.type = "line";
    rsi6Graph.valueField = "rsi6";
    rsi6Graph.lineColor = "#669999";
    rsi6Graph.useDataSetColors = false;
    rsi6Graph.balloonText = "RSI 6: <b>[[value]]</b>";
    rsiChart.addGraph(rsi6Graph);

    var rsi12Graph = new AmCharts.AmGraph();
    rsi12Graph.title = "RSI 12"
    rsi12Graph.type = "line";
    rsi12Graph.valueField = "rsi12";
    rsi12Graph.lineColor = "#cccc99";
    rsi12Graph.useDataSetColors = false;
    rsi12Graph.balloonText = "RSI 12: <b>[[value]]</b>";
    rsi12Graph.bullet = "round";
    rsi12Graph.bulletSize = 0;
    rsi12Graph.bulletAlpha = 0;
    rsi12Graph.classNameField = "eventClass";
    rsiChart.addGraph(rsi12Graph);

    var rsi24Graph = new AmCharts.AmGraph();
    rsi24Graph.title = "RSI 24";
    rsi24Graph.type = "line";
    rsi24Graph.valueField = "rsi24";
    rsi24Graph.lineColor = "#990033";
    rsi24Graph.useDataSetColors = false;
    rsi24Graph.balloonText = "RSI 24: <b>[[value]]</b>";
    rsiChart.addGraph(rsi24Graph);

    var cursor = new AmCharts.ChartCursor();
    cursor.valueBalloonsEnabled = true;
    cursor.fullWidth = true;
    cursor.cursorAlpha = 0.1;
    rsiChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    legend.valueText = null;
    rsiChart.legend = legend;

    rsiChart.write("rsi_graph");

    //zoomChart(rsiChart, tabChartData);
}

function initKdjChart() {
    kdjChart = new AmCharts.AmSerialChart();

    //rsi图表的全局设置
    kdjChart.addClassNames = true;
    kdjChart.title = "KDJ";
    kdjChart.dataProvider = tabChartData;
    kdjChart.categoryField = "date";
    //kdjChart.dataDateFormat = "YYYY-MM-DD";

    var kdjAxis = new AmCharts.ValueAxis();
    kdjAxis.color = "#cccccc";
    kdjAxis.inside = true;

    kdjChart.addValueAxis(kdjAxis);

    var categoryAxis = kdjChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.dateFormats = [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }];

    var KGraph = new AmCharts.AmGraph();
    KGraph.title = "Slow K";
    KGraph.type = "line";
    KGraph.valueField = "slowK";
    KGraph.lineColor = "#669999";
    KGraph.useDataSetColors = false;
    KGraph.balloonText = "slowK: <b>[[value]]</b>";
    kdjChart.addGraph(KGraph);

    var DGraph = new AmCharts.AmGraph();
    DGraph.title = "Slow D";
    DGraph.type = "line";
    DGraph.valueField = "slowD";
    DGraph.lineColor = "#ffffcc";
    DGraph.useDataSetColors = false;
    DGraph.balloonText = "slowD: <b>[[value]]</b>";
    DGraph.bulletAlpha = 0;
    DGraph.bulletSize = 0;
    DGraph.bullet = "round";
    DGraph.classNameField = "eventClass";
    kdjChart.addGraph(DGraph);

    var JGraph = new AmCharts.AmGraph();
    JGraph.title = "Slow J";
    JGraph.type = "line";
    JGraph.valueField = "slowJ";
    JGraph.lineColor = "#990033";
    JGraph.useDataSetColors = false;
    JGraph.balloonText = "slowJ: <b>[[value]]</b>";
    kdjChart.addGraph(JGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.valueBalloonsEnabled = true;
    cursor.fullWidth = true;
    cursor.cursorAlpha = 0.1;
    kdjChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    legend.valueText = null;
    kdjChart.legend = legend;

    kdjChart.write("kdj_graph");

}

function initBollChart() {
    bollChart = new AmCharts.AmSerialChart();
    //charts.push(bollChart);

    //rsi图表的全局设置
    bollChart.addClassNames = true;
    bollChart.title = "BOLL";
    bollChart.dataProvider = tabChartData;
    bollChart.categoryField = "date";
    bollChart.columnWidth = 0.4;
    //bollChart.dataDateFormat = "YYYY-MM-DD";

    var bollAxis = new AmCharts.ValueAxis();
    bollAxis.color = "#cccccc";
    bollAxis.inside = true;

    bollChart.addValueAxis(bollAxis);

    var categoryAxis = bollChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.dateFormats = [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }];

    var bollGraph = new AmCharts.AmGraph();
    bollGraph.title = "Value";
    bollGraph.type = "candlestick";
    bollGraph.openField = "open";
    bollGraph.closeField = "close";
    bollGraph.highField = "high";
    bollGraph.lowField = "low";
    bollGraph.valueField = "close";
    bollGraph.fillColors = "#eb6877";
    bollGraph.lineColor = "#eb6877";
    bollGraph.negativeFillColors = "#88cc66";
    bollGraph.negativeLineColor = "#88cc66";
    bollGraph.useDataSetColors = false;
    bollGraph.balloonText = "open: <b>[[open]]</b><br>close: <b>[[close]]</b><br>high: <b>[[high]]</b><br>low: <b>[[low]]</b>";
    bollChart.addGraph(bollGraph);

    var upperGraph = new AmCharts.AmGraph();
    upperGraph.title = "BOLL UPPER";
    upperGraph.type = "line";
    upperGraph.valueField = "boll_upper";
    upperGraph.lineColor = "#669999";
    upperGraph.useDataSetColors = false;
    upperGraph.balloonText = "boll upper: <b>[[value]]</b>";
    bollChart.addGraph(upperGraph);

    var middleGraph = new AmCharts.AmGraph();
    middleGraph.title = "BOLL MIDDLE";
    middleGraph.type = "line";
    middleGraph.valueField = "boll_middle";
    middleGraph.lineColor = "#ffffcc";
    middleGraph.useDataSetColors = false;
    middleGraph.balloonText = "boll middle: <b>[[value]]</b>";
    middleGraph.bullet = "round";
    middleGraph.classNameField = "eventClass";
    middleGraph.bulletSize = 0;
    middleGraph.bulletAlpha = 0;
    bollChart.addGraph(middleGraph);

    var lowGraph = new AmCharts.AmGraph();
    lowGraph.title = "BOLL LOW";
    lowGraph.type = "line";
    lowGraph.valueField = "boll_low";
    lowGraph.lineColor = "#990033";
    lowGraph.useDataSetColors = false;
    lowGraph.balloonText = "boll low: <b>[[value]]</b>";
    bollChart.addGraph(lowGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.valueBalloonsEnabled = true;
    cursor.fullWidth = true;
    cursor.cursorAlpha = 0.1;
    bollChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.valueText = null;
    legend.position = "top";
    bollChart.legend = legend;

    bollChart.write("boll_graph");

}

function initDynamicChart() {

    intradayChart = new AmCharts.AmStockChart();

    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
    categoryAxesSettings.minPeriod = "mm";
    categoryAxesSettings.color = "#cccccc";
    intradayChart.categoryAxesSettings = categoryAxesSettings;

    var dataSet = new AmCharts.DataSet();
    dataSet.fieldMappings = [{
        fromField: "price",
        toField: "value"
    }, {
        fromField: "volume",
        toField: "volume"
    }];
    dataSet.dataProvider = intraday;
    dataSet.categoryField = "realTime";

    intradayChart.dataSets = [dataSet];

    var timeSharePanel = new AmCharts.StockPanel();
    timeSharePanel.showCategoryAxis = false;
    timeSharePanel.title = "Value";
    timeSharePanel.percentHeight = 70;

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.inside = true;
    valueAxis.color = "#cccccc";
    timeSharePanel.addValueAxis(valueAxis);

    var valueGraph = new AmCharts.StockGraph();
    valueGraph.valueField = "value";
    valueGraph.valueAxis = valueAxis;
    valueGraph.type = "smoothedLine";
    valueGraph.lineThickness = 2;
    valueGraph.bullet = "round";
    valueGraph.bulletSize = 4;
    valueGraph.bulletBorderColor = "#FFFFFF";
    valueGraph.bulletBorderAlpha = 1;
    valueGraph.bulletBorderThickness = 2;
    timeSharePanel.addStockGraph(valueGraph);

    var stockLegend1 = new AmCharts.StockLegend();
    stockLegend1.valueTextRegular = " ";
    stockLegend1.markerType = "none";
    timeSharePanel.stockLegend = stockLegend1;

    var volumePanel = new AmCharts.StockPanel();
    volumePanel.showCategoryAxis = true;
    volumePanel.title = "Volume";
    volumePanel.percentHeight = 30;

    var volumeAxis = new AmCharts.ValueAxis();
    volumeAxis.inside = true;
    volumeAxis.color = "#cccccc";
    volumePanel.addValueAxis(volumeAxis);

    var volumeGraph = new AmCharts.StockGraph();
    volumeGraph.valueField = "volume";
    volumeGraph.valueAxis = valueAxis;
    volumeGraph.type = "column";
    volumeGraph.cornerRadiusTop = 2;
    volumeGraph.fillAlphas = 1;
    volumePanel.addStockGraph(volumeGraph);

    intradayChart.panels = [timeSharePanel, volumePanel];

    // OTHER SETTINGS ////////////////////////////////////
    var scrollbarSettings = new AmCharts.ChartScrollbarSettings();
    scrollbarSettings.graph = valueGraph;
    scrollbarSettings.usePeriod = "10mm"; // this will improve performance
    scrollbarSettings.updateOnReleaseOnly = false;
    scrollbarSettings.position = "bottom";
    scrollbarSettings.color = "#cccccc";
    intradayChart.chartScrollbarSettings = scrollbarSettings;

    var cursorSettings = new AmCharts.ChartCursorSettings();
    cursorSettings.valueBalloonsEnabled = true;
    intradayChart.chartCursorSettings = cursorSettings;

    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.mouseWheelZoomEnabled = true;
    panelsSettings.usePrefixes = true;
    intradayChart.panelsSettings = panelsSettings;

    intradayChart.write('dynamic_graph');
}

function initForecastChart() {
    futureChart = new AmCharts.AmSerialChart();
    futureChart.addClassNames = true;
    futureChart.dataProvider = forecastData;
    futureChart.categoryField = "date";
    futureChart.dataDateFormat = "YYYY-MM-DD";

    var categoryAxis =futureChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#cccccc";
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.dateFormats = [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }];

    var axis = new AmCharts.ValueAxis();
    axis.title = "SVM模型预测";
    axis.inside = true;
    axis.color = "#cccccc";
    futureChart.addValueAxis(axis);

    var maxGraph = new AmCharts.AmGraph();
    maxGraph.id = "maxGraph";
    maxGraph.title = "最大预估";
    maxGraph.type = "line";
    maxGraph.valueField = "price_high";
    maxGraph.balloonText = "最大预估: <b>[[value]]</b>";
    maxGraph.valueAxis = axis;
    futureChart.addGraph(maxGraph);

    var minGraph = new AmCharts.AmGraph();
    minGraph.title = "最小预估";
    minGraph.type = "line";
    minGraph.fillAlphas = 0.2;
    minGraph.fillToGraph = "maxGraph";
    minGraph.valueField = "price_low";
    minGraph.balloonText = "最小预估: <b>[[value]]</b>";
    minGraph.valueAxis = axis;
    futureChart.addGraph(minGraph);

    var pointGraph = new AmCharts.AmGraph();
    pointGraph.title = "中值";
    pointGraph.type = "line";
    pointGraph.bullet = "round";
    pointGraph.bulletSize = 8;
    pointGraph.bulletBorderThickness = 1;
    pointGraph.lineAlpha = 0;
    pointGraph.valueField = "price_middle";
    pointGraph.balloonText = "中值: <b>[[value]]</b>";
    pointGraph.valueAxis = axis;
    futureChart.addGraph(pointGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    futureChart.chartCursor = cursor;

    futureChart.write("forecast_graph");
}

function initRangeChart() {
    rangeChart = new AmCharts.AmSerialChart();
    rangeChart.addClassNames = true;
    rangeChart.dataProvider = rangeChartData;
    rangeChart.categoryField = "date";
    //rangeChart.dataDateFormat = "YYYY-MM-DD";
    rangeChart.rotate = true;
    //
    //var categoryAxis =rangeChart.categoryAxis;
    ////categoryAxis.position = "left";
    //categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    //categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    //categoryAxis.autoGridCount = false;
    //categoryAxis.color = "#cccccc";
    //categoryAxis.gridCount = 50;
    //categoryAxis.gridAlpha = 0.1;
    //categoryAxis.dateFormats = [{
    //    period: 'DD',
    //    format: 'DD'
    //}, {
    //    period: 'WW',
    //    format: 'MMM DD'
    //}, {
    //    period: 'MM',
    //    format: 'MMM'
    //}, {
    //    period: 'YYYY',
    //    format: 'YYYY'
    //}];

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.inside = true;
    valueAxis.title = "涨跌幅%";
    valueAxis.color = "#cccccc";
    valueAxis.position = "top";
    rangeChart.addValueAxis(valueAxis);

    var graph0 = new AmCharts.AmGraph();
    graph0.type = "line";
    graph0.lineAlpha = 0;
    graph0.valueAxis = valueAxis;
    graph0.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph0.bulletSizeField = "bullet0";
    graph0.bulletAlpha = 0.5;
    graph0.valueField = "range0Size";
    graph0.balloonText = "股票数量: [[range0]]";
    graph0.useDataSetColors = false;
    graph0.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph0);

    var graph1 = new AmCharts.AmGraph();
    graph1.type = "line";
    graph1.lineAlpha = 0;
    graph1.valueAxis = valueAxis;
    graph1.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph1.bulletSizeField = "bullet1";
    graph1.bulletAlpha = 0.5;
    graph1.valueField = "range1Size";
    graph1.balloonText = "股票数量: [[range1]]";
    graph1.useDataSetColors = false;
    graph1.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph1);

    var graph2 = new AmCharts.AmGraph();
    graph2.type = "line";
    graph2.lineAlpha = 0;
    graph2.valueAxis = valueAxis;
    graph2.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph2.bulletSizeField = "bullet2";
    graph2.bulletAlpha = 0.5;
    graph2.valueField = "range2Size";
    graph2.balloonText = "股票数量: [[range2]]";
    graph2.useDataSetColors = false;
    graph2.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph2);

    var graph3 = new AmCharts.AmGraph();
    graph3.type = "line";
    graph3.lineAlpha = 0;
    graph3.valueAxis = valueAxis;
    graph3.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph3.bulletSizeField = "bullet3";
    graph3.bulletAlpha = 0.5;
    graph3.valueField = "range3Size";
    graph3.balloonText = "股票数量: [[range3]]";
    graph3.useDataSetColors = false;
    graph3.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph3);

    var graph4 = new AmCharts.AmGraph();
    graph4.type = "line";
    graph4.lineAlpha = 0;
    graph4.valueAxis = valueAxis;
    graph4.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph4.bulletSizeField = "bullet4";
    graph4.bulletAlpha = 0.5;
    graph4.valueField = "range4Size";
    graph4.balloonText = "股票数量: [[range4]]";
    graph4.useDataSetColors = false;
    graph4.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph4);

    var graph5 = new AmCharts.AmGraph();
    graph5.type = "line";
    graph5.lineAlpha = 0;
    graph5.valueAxis = valueAxis;
    graph5.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph5.bulletSizeField = "bullet5";
    graph5.bulletAlpha = 0.5;
    graph5.valueField = "range5Size";
    graph5.balloonText = "股票数量: [[range5]]";
    graph5.useDataSetColors = false;
    graph5.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph5);

    var graph6 = new AmCharts.AmGraph();
    graph6.type = "line";
    graph6.lineAlpha = 0;
    graph6.valueAxis = valueAxis;
    graph6.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph6.bulletSizeField = "bullet6";
    graph6.bulletAlpha = 0.5;
    graph6.valueField = "range6Size";
    graph6.balloonText = "数量: [[range6]]";
    graph6.useDataSetColors = false;
    graph6.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph6);

    var graph7 = new AmCharts.AmGraph();
    graph7.type = "line";
    graph7.lineAlpha = 0;
    graph7.valueAxis = valueAxis;
    graph7.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph7.bulletSizeField = "bullet7";
    graph7.bulletAlpha = 0.5;
    graph7.valueField = "range7Size";
    graph7.balloonText = "股票数量: [[range7]]";
    graph7.useDataSetColors = false;
    graph7.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph7);

    var graph8 = new AmCharts.AmGraph();
    graph8.type = "line";
    graph8.lineAlpha = 0;
    graph8.valueAxis = valueAxis;
    graph8.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph8.bulletSizeField = "bullet8";
    graph8.bulletAlpha = 0.5;
    graph8.valueField = "range8Size";
    graph8.balloonText = "股票数量: [[range8]]";
    graph8.useDataSetColors = false;
    graph8.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph8);

    var graph9 = new AmCharts.AmGraph();
    graph9.type = "line";
    graph9.lineAlpha = 0;
    graph9.valueAxis = valueAxis;
    graph9.bullet = "round";
    //graph0.bulletSize = "[[value]]";
    graph9.bulletSizeField = "bullet9";
    graph9.bulletAlpha = 0.5;
    graph9.valueField = "range9Size";
    graph9.balloonText = "股票数量: [[range9]]";
    graph9.useDataSetColors = false;
    graph9.bulletColor = "#ffffcc";
    rangeChart.addGraph(graph9);

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    cursor.graphBulletSize = 1;
    rangeChart.chartCursor = cursor;

    rangeChart.write("range_graph");
}

function initBpForecastChart() {
    bpForecastChart = new AmCharts.AmSerialChart();
    bpForecastChart.addClassNames = true;

    //future图表的全局设置
    bpForecastChart.addClassNames = true;
    bpForecastChart.title = "Future";
    bpForecastChart.dataProvider = bpForecastData;
    bpForecastChart.categoryField = "date";
    bpForecastChart.dataDateFormat = "YYYY-MM-DD";

    var futureAxis = new AmCharts.ValueAxis();
    futureAxis.title = "BP神经网络模型预测";
    futureAxis.inside = true;
    futureAxis.color = "#a0aab3";
    bpForecastChart.addValueAxis(futureAxis);

    var categoryAxis = bpForecastChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#a0aab3";
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.gridColor = "#000000";
    categoryAxis.axisColor = "#555555";
    // we want custom date formatting, so we change it in next line
    categoryAxis.dateFormats = [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }];

    var maxGraph = new AmCharts.AmGraph();
    maxGraph.id = "maxGraph";
    maxGraph.valueAxis = futureAxis;
    maxGraph.title = "最大预估";
    maxGraph.type = "line";
    maxGraph.valueField = "price_high";
    maxGraph.balloonText = "最大预估: <b>[[value]]</b>";
    bpForecastChart.addGraph(maxGraph);

    var minGraph = new AmCharts.AmGraph();
    minGraph.title = "最小预估";
    minGraph.type = "line";
    minGraph.valueAxis = futureAxis;
    minGraph.fillAlphas = 0.2;
    minGraph.fillToGraph = "maxGraph";
    minGraph.valueField = "price_low";
    minGraph.balloonText = "最小预估: <b>[[value]]</b>";
    bpForecastChart.addGraph(minGraph);

    var pointGraph = new AmCharts.AmGraph();
    pointGraph.title = "中值";
    pointGraph.type = "line";
    pointGraph.valueAxis = futureAxis;
    pointGraph.bullet = "round";
    pointGraph.bulletSize = 8;
    pointGraph.bulletBorderThickness = 1;
    pointGraph.lineAlpha = 0;
    pointGraph.valueField = "price_middle";
    pointGraph.balloonText = "中值: <b>[[value]]</b>";
    bpForecastChart.addGraph(pointGraph);

    //var legend = new AmCharts.AmLegend();
    //legend.position = "top";
    //legend.color = "#a0aab3";
    //bpForecastChart.legend = legend;

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    bpForecastChart.chartCursor = cursor;

    bpForecastChart.write("bp_forecast_graph");
}