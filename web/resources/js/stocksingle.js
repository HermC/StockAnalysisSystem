var navList;
var navContents;
var preNavIndex;
var secondNavList = [
    '<div id="nav-sec0" class="nav-sec-item"><a href="#k_wrapper" class="targeted">K线图</a><a href="#macd_wrapper">MACD</a><a href="#rsi_wrapper">RSI</a><a href="#kdj_wrapper">KDJ</a><a href="#boll_wrapper">BOLL</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ,
    '<div id="nav-sec1" class="nav-sec-item"><a href="#grade_wrapper" class="targeted">股票评分</a><a href="#bench_relative_wrapper">大盘相关</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ,
    '<div id="nav-sec2" class="nav-sec-item"><a href="#forecast_one" class="targeted">走势预测</a><a href="#forecast_two">特殊预测</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ,
    '<div id="nav-sec3" class="nav-sec-item"><a href="#dynamic_trade_wrapper" class="targeted">实时交易</a><a href="#text_instruction">实时分析</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ,
    '<div id="nav-sec4" class="nav-sec-item"><a href="#company_intro" class="targeted">公司简介</a><a href="#news_news">新闻公告</a><a href="#news_paper">研究报告</a><a href="#company_profit">盈利能力</a></div><a href="#"><img id="toTop" src="resources/img/top.png"/></a>'
    ];
var secondSmallNavList = [
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#k_wrapper" class="targeted">K线图</a><a href="#macd_wrapper">MACD</a><a href="#rsi_wrapper">RSI</a><a href="#kdj_wrapper">KDJ</a><a href="#boll_wrapper">BOLL</a>'
    ,
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#grade_wrapper" class="targeted">股票评分</a><a href="#bench_relative_wrapper">大盘相关</a>'
    ,
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#forecast_one" class="targeted">走势预测</a><a href="#forecast_two" class="targeted">特殊预测</a>'
    ,
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#dynamic_trade_wrapper" class="targeted">实时交易</a><a href="#text_instruction">实时分析</a>'
    ,
    '<p id="nav-sec-small-hide">↓↓↓</p><a href="#company_intro" class="targeted">公司简介</a><a href="#news_news">新闻公告</a><a href="#news_paper">研究报告</a><a href="#company_profit">盈利能力</a>'
    ];

window.onload = function(){
    initialHeader();
    navList = document.querySelectorAll(".nav-item");
    navContents = document.querySelectorAll(".stock_content");
    preNavIndex = 0;
    navListener();
    operationListener();
    requestDynamicData();
    initFavourite();
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
//                'margin-left':'10px',
                'margin-right':'10px',
                'z-index':'50',
                'background-color': 'rgba(3,27,47,1)'
            });
        }else{
            $('#nav').css({
                'position':'relative',
                'margin-left':'0',
                'margin-right':'0',
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

function initFavourite() {
    var tmp = $.cookie('favouriteStock');
    if(tmp==undefined) return;
    var result = tmp.split(",");
    for(var i=0;i<result.length;i++){
        if(result[i]==stock_id){
            $("#favor").attr("src", "resources/img/favor.png");
            return;
        }
    }
}

/*
*
*收藏、添加成功的提示提示提示！！！！！
*
*/
function operationNotice(text){
    $("#operation_alert p").html(text);
    $("#favor").hide();
    $("#add").hide();
    $("#operation_alert").slideDown();
    setTimeout(function(){
        $("#operation_alert").hide();
        $("#favor").show();
        $("#add").show();
    },800);
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

function operationListener() {
    $(".operation").on("click", "#favor", function() {
        operateFavStock(stock_id);
        //console.log($.cookie('favouriteStock'));
    });
    $(".operation").on("click", "#add", function() {
        addCompareStock(stock_id);
        //console.log($.cookie('compareStock'));
        operationNotice("添加对比成功!");
    });
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

window.setInterval(requestDynamicData, 5000);

/***************************************************
 * 动态更新数据
 * */
function requestDynamicData() {

    if(stock_id==undefined||stock_id==null){
        return;
    }

    $.ajax({
        type: 'GET',
        url: "stock/active.do?id="+stock_id,
        dataType: 'json',
        success: function(data) {
            updateDynamicData(data.current);
            updateInstruction(data.instruction);
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
    $("#dynamic__devVal").html("涨跌: "+data.devia_val);
    $("#dynamic_devia_per").html(data.devia_per);

    $("#dynamic_updown").html(data.devia_per);
    $("#dynamic_open").html("今开: "+data.open);
    $("#dynamic__volume").html("成交量: "+data.volume);
    $("#dynamic_volume").html("成交量: <span>"+data.volume+"</span>");
    $("#dynamic__close").html("昨收: "+data.close);

    $("#dynamic_high").html("最高: "+data.high);
    //$("#dynamic_high").css({color: "#eb6877"});
    $("#dynamic__low").html("最低: "+data.low);
    //$("#dynamic__low").css({color: "#88cc66"});

    $("#dynamic_up_stop").html("涨停: <span>"+data.up_stop+"</span>");
    //$("#dynamic_up_stop").css({color: "#eb6877"});

    $("#dynamic_inner_count").html("内盘: <span>"+data.inner_count+"</span>");

    $("#dynamic__amount").html("成交金额: "+data.amount);
    $("#dynamic_amount").html("成交额: <span>"+data.amount+"</span>");

    $("#dynamic_committee").html("委比: <span>"+data.committee+"</span>");
    $("#dynamic__committee").html(data.committee);

    $("#dynamic_avail_amount").html("流通市值: <span>"+data.avail_amount+"</span>");

    $("#dynamic__pe").html("市盈率: "+data.pe);
    $("#dynamic_pe").html(data.pe);

    $("#dynamic_profit_per").html("每股收益: "+data.profit_per);
    $("#dynamic_total_volume").html("总股本: "+data.total_volume);

    $("#dynamic__turnover").html("换手率: "+data.turnover);
    $("#dynamic_turnover").html(data.turnover);

    $("#dynamic_down_stop").html("跌停: <span>"+data.down_stop+"</span>");
    //$("#dynamic_down_stop").css({color: "#88cc66"});

    $("#dynamic_outer_count").html("外盘: <span>"+data.outer_count+"</span>");

    $("#dynamic_inout").html("内盘:"+data.inner_count+"<br>外盘:"+data.outer_count);

    $("#dynamic__amplitude").html("振幅: "+data.amplitude);

    $("#dynamic_quantity_ratio").html("量比: <span>"+data.quantity_ratio+"</span>");
    $("#dynamic__quantity_ratio").html(data.quantity_ratio);

    $("#dynamic_total_amount").html("总市值: <span>"+data.total_amount+"</span>");

    $("#dynamic__pb").html("市净率: "+data.pb);
    $("#dynamic_pb").html(data.pb);

    $("#dynamic_value_per_stock").html("每股净资产: "+data.value_per_stock);
    $("#dynamic_available_stock").html("流通股本: <span>"+data.available_stock+"</span>");

    $("#dynamic_in1").html("买一: <span>"+data.in1.toFixed(2)+"</span>");
    $("#buy__first").html("买一:"+data.in1.toFixed(2));

    $("#dynamic_in2").html("买二: <span>"+data.in2.toFixed(2)+"</span>");
    $("#dynamic_in3").html("买三: <span>"+data.in3.toFixed(2)+"</span>");
    $("#dynamic_in4").html("买四: <span>"+data.in4.toFixed(2)+"</span>");
    $("#dynamic_in5").html("买五: <span>"+data.in5.toFixed(2)+"</span>");

    $("#dynamic_out1").html("卖一: <span>"+data.out1.toFixed(2)+"</span>");
    $("#sell__first").html("卖一:"+data.out1.toFixed(2));

    $("#dynamic_out2").html("卖二: <span>"+data.out2.toFixed(2)+"</span>");
    $("#dynamic_out3").html("卖三: <span>"+data.out3.toFixed(2)+"</span>");
    $("#dynamic_out4").html("卖四: <span>"+data.out4.toFixed(2)+"</span>");
    $("#dynamic_out5").html("卖五: <span>"+data.out5.toFixed(2)+"</span>");

    var adj_price = chartData[chartData.length-1].adj_price;
    $("#dynamic__adj").html("后复权价: "+adj_price);
}

function updateInstruction(data) {
    $("#dynamic_pb_instruction").html(data.PBAnalysis);
    $("#dynamic_pe_instruction").html(data.PEAnalysis);
    $("#dynamic_committee_instruction").html(data.WeibiAnalysis);
    $("#dynamic_updown_instruction").html(data.UpDownAnalysis);
    $("#dynamic_turnover_instruction").html(data.TurnOverAnalysis);
    $("#dynamic_inout_instruction").html(data.InOutAnalysis);
    $("#dynamic_quantity_ratio_instruction").html(data.VolumeAnalysis);
}

/****************************************************
 * 添加对比股票
 * */
function addCompareStock(id) {

    var tmp = $.cookie('compareStock');

    var result;

    if(tmp!=undefined){
        var result = tmp.split(",");
        if(result[0]=="null"){
            result.shift();
        }

        for(var i=0;i<result.length;i++){
            if(result[i]==id){
                return;
            }
        }

        result.push(id);

        //if(result.length>15){
        //    result.shift();
        //}

    }else{
        result = [id];
    }

    $.cookie('compareStock', result.join(','), {
        path: '/'
    });

    console.log($.cookie('compareStock'));
}

/*
* 图表的变量声明以及初始化等方法
* */
var chartData;
var graderData = [];
var dynamicData;
var futureData = [];

var tabChartData = [];
var tabChartData2 = [];
var relativeData = [];

var dataSet;

var charts = [];

var valueChart;
var macdChart;
var rsiChart;
var kdjChart;
var bollChart;

var radarChart;

var intradayChart;

var bpForecastChart;
var forecastChart;

AmCharts.ready(function() {

    AmCharts.theme = AmCharts.themes.dark;
    initValueData();
    initDynamicData();
    initFutureData();
    initGradeData();
    initRelativeHistoryData();

    initDataSet();
    initValueChart();
    initMacdChart();
    initRsiChart();
    initKdjChart();
    initBollChart();

    initGradeChart();
    initDynamicChart();
    initBpForecastChart();
    initForecastChart();
    initGradeHistoryChart();
    initRelativeHistoryChart();
    initTabTableChart2();

    initSpecialStragtey();
    initSeasonChart();
    initSeasonChart2();
    initSeasonChart3();
});

function initRelativeHistoryData() {
    var i;
    for(i=0;i<10;i++){
        var tmp = {};
        tmp["date"] = chartData[chartData.length-10+i].date;
        tmp["benchmarkOpen"] = benchmarkData[benchmarkData.length-10+i].open;
        tmp["benchmarkVolume"] = benchmarkData[benchmarkData.length-10+i].volume;
        tmp["benchmarkDev"] = benchmarkData[benchmarkData.length-10+i].deviation_per;
        tmp["stockOpen"] = chartData[chartData.length-10+i].open;
        tmp["stockVolume"] = chartData[chartData.length-10+i].volume;
        tmp["stockDev"] = chartData[chartData.length-10+i].deviation_per;

        relativeData.push(tmp);
    }
}

function initValueData() {
    chartData = jsonData;

    for(var i=0;i<chartData.length;i++){
        if(chartData[i].volume==0){
            chartData[i]["colorField"] = "rgba(0,0,0,0.4)";
            chartData[i]["lineColorField"] = "rgba(0,0,0,0.4)";
        }
    }

    for(i=0;i<specialPredict.length;i++){
        tabChartData.push(specialPredict[i].tabTablesData);
        tabChartData[i]["kdjIns"] =  specialPredict[i].kdjIns;
        tabChartData[i]["rsiIns"] = specialPredict[i].rsiIns;
        tabChartData[i]["bollIns"] = specialPredict[i].bollIns;

        if(tabChartData[i].kdjIns!=""){
            tabChartData[i]["eventClass"] = "kdj_event";
        }
        if(tabChartData[i].rsiIns!=""){
            if(tabChartData[i].eventClass==undefined){
                tabChartData[i]["eventClass"] = "rsi_event";
            }else{
                tabChartData[i].eventClass = tabChartData[i].eventClass + " rsi_event";
            }
        }
        if(tabChartData[i].bollIns!=""){
            if(tabChartData[i].eventClass==undefined){
                tabChartData[i]["eventClass"] = "boll_event";
            }else{
                tabChartData[i].eventClass = tabChartData[i].eventClass + " boll_event";
            }
        }

        if(i>=specialPredict.length-3){
            tabChartData2.push(specialPredict[i].tabTablesData);
        }

        if(i==specialPredict.length-1){
            var kdj_ins = specialPredict[i].kdjIns;
            var rsi_ins = specialPredict[i].rsiIns;
            var boll_ins = specialPredict[i].bollIns;
            if(kdj_ins==""){
                $("#special_graph_kdj_ins").html("Tips: 今日暂无明显事件");
            }else{
                $("#special_graph_kdj_ins").html("Tips: "+kdj_ins);
            }
            if(rsi_ins==""){
                $("#special_graph_rsi_ins").html("Tips: 今日暂无明显事件");
            }else{
                $("#special_graph_rsi_ins").html("Tips: "+rsi_ins);
            }
            if(boll_ins==""){
                $("#special_graph_boll_ins").html("Tips: 今日暂无明显事件");
            }else{
                $("#special_graph_boll_ins").html("Tips: "+boll_ins);
            }
        }
    }
}

function initDynamicData() {
    dynamicData = tmp_dynamic;

    for(var i=0;i<dynamicData.length;i++){
        var d = dynamicData[i].date+"";
        var t = dynamicData[i].time+"";
        if(t.length==8){
            t = "0"+t;
        }
        var tmp = AmCharts.stringToDate(""+d+t, "YYYYMMDDHHNNSSQQQ");
        dynamicData[i]["realTime"] = tmp;
    }
}

function initFutureData() {

}

function initGradeData() {
    graderData.push({"key": "市净率", "value": tmp_grade.pbAssess, "colorField": "#ff6666"});
    graderData.push({"key": "市盈率", "value": tmp_grade.peAssess, "colorField": "#ffff66"});
    graderData.push({"key": "涨跌幅", "value": tmp_grade.updownAssess, "colorField": "#99cc66"});
    graderData.push({"key": "量比", "value": tmp_grade.volumeAssess, "colorField": "#3399cc"});
    graderData.push({"key": "委比", "value": tmp_grade.weibiAssess, "colorField": "#996600"});

    gradeHistoryData = tmp_grade.statisticses;
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

    dataSet.dataProvider = chartData;
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

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.color = "#a0aab3";
    valuePanel.addValueAxis(valueAxis);

    var valueCategoryAxis = valuePanel.categoryAxis;
    valueCategoryAxis.color = "#a0aab3";

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
    //valueGraph.lineColor = "#cc0033";
    //valueGraph.fillColors = "#cc0033";
    //valueGraph.negativeLineColor = "#116633";
    //valueGraph.negativeFillColors = "#116633";
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
    valueLegend.color = "#a0aab3";
    valueLegend.valueText = null;
    valuePanel.stockLegend = valueLegend;


    var volumePanel = new AmCharts.StockPanel();
    volumePanel.title = "Volume/Total";
    volumePanel.showCategoryAxis = false;
    volumePanel.columnWidth = 0.6;

    var volumeAxis = new AmCharts.ValueAxis();
    volumeAxis.inside = true;
    volumeAxis.color = "#a0aab3";
    var totalAxis = new AmCharts.ValueAxis();
    totalAxis.inside = true;
    totalAxis.color = "#a0aab3";
    totalAxis.position = "right";
    volumePanel.addValueAxis(volumeAxis);
    volumePanel.addValueAxis(totalAxis);

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

    var totalGraph = new AmCharts.StockGraph();
    totalGraph.title = "Total";
    totalGraph.type = "line";
    totalGraph.valueField = "total";
    totalGraph.valueAxis = totalAxis;
    totalGraph.balloonText = "成交金额: <b>[[value]]</b>";
    totalGraph.useDataSetColors = false;

    volumePanel.addStockGraph(volumeGraph);
    volumePanel.addStockGraph(totalGraph);

    var volumeLegend = new AmCharts.StockLegend();
    volumeLegend.labelText = "[[title]]";
    volumeLegend.position = "top";
    volumeLegend.color = "#a0aab3";
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
    scrollbar.color = "#a0aab3";
    valueChart.chartScrollbarSettings = scrollbar;

    var categoryAxe = new AmCharts.CategoryAxesSettings();
    categoryAxe.groupToPeriods = ["WW", "MM"];
    categoryAxe.maxSeries = 60;
    valueChart.categoryAxesSettings = categoryAxe;

    valuePanel.percentHeight = 65;
    volumePanel.percentHeight = 35;

    valueChart.panels = [valuePanel, volumePanel];

    valueChart.write("stock_graph");

    zoomChart(valueChart, chartData);
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
    macdAxis.color = "#a0aab3";
    macdChart.addValueAxis(macdAxis);

    var categoryAxis = macdChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#a0aab3";
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
    legend.color = "#a0aab3";
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
    rsiAxis6.inside = true;
    rsiAxis6.color = "#a0aab3";

    rsiChart.addValueAxis(rsiAxis6);

    var categoryAxis = rsiChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#a0aab3";
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
    legend.color = "#a0aab3";
    rsiChart.legend = legend;

    rsiChart.write("rsi_graph");

    //zoomChart(rsiChart, tabChartData);
    cursor.addListener("changed", specialTips);
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
    kdjAxis.inside = true;
    kdjAxis.color = "#a0aab3";

    kdjChart.addValueAxis(kdjAxis);

    var categoryAxis = kdjChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#a0aab3";
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
    legend.color = "#a0aab3";
    kdjChart.legend = legend;

    kdjChart.write("kdj_graph");

    cursor.addListener("changed", specialTips);
}

function specialTips(event) {
    if(event==undefined||event.index==undefined) return;
    if(event.chart==rsiChart){
        var ins = tabChartData[event.index].rsiIns;
        $("#rsi_ins").html("Tips: "+ins+" ");
    }else if(event.chart==kdjChart){
        var ins = tabChartData[event.index].kdjIns;
        $("#kdj_ins").html("Tips: "+ins+" ");
    }else if(event.chart==bollChart){
        var ins = tabChartData[event.index].bollIns;
        $("#boll_ins").html("Tips: "+ins+" ");
    }
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
    bollAxis.inside = true;
    bollAxis.color = "#a0aab3";

    bollChart.addValueAxis(bollAxis);

    var categoryAxis = bollChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#a0aab3";
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
    bollGraph.fillAlphas = 0;
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
    legend.color = "#a0aab3";
    bollChart.legend = legend;

    bollChart.write("boll_graph");

    cursor.addListener("changed", specialTips);
}

function zoomChart(chart, chartData) {
    if(chartData.length<=30) return;
    var start = new Date(chartData[chartData.length-30].date.replace(/-/g, "/"));
    var end = new Date(chartData[chartData.length-1].date.replace(/-/g, "/"));
    end.setDate(end.getDate()+1);
    chart.zoom(start, end);
}

function initGradeChart() {
    radarChart = new AmCharts.AmRadarChart();
    radarChart.dataProvider = graderData;
    radarChart.categoryField = "key";

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0.5;
    valueAxis.minimum = 0;
    valueAxis.dashLength = 3;
    valueAxis.axisTitleOffset = 20;
    valueAxis.gridCount = 5;
    valueAxis.gridAlpha = 0.25;
    valueAxis.color  ="#a0aab3";
    radarChart.addValueAxis(valueAxis);

    var graph = new AmCharts.AmGraph();
    graph.valueField = "value";
    graph.bullet = "round";
    graph.bulletSize = 10;
    graph.balloonText = "score: [[value]]";
    graph.useDataSetColors = false;
    graph.lineColor = "#ffffff";
    graph.colorField = "colorField";
    radarChart.addGraph(graph);

    // WRITE
    radarChart.write("grade_radar");
}

function initDynamicChart() {

    intradayChart = new AmCharts.AmStockChart();

    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
    categoryAxesSettings.minPeriod = "mm";
    categoryAxesSettings.color = "#a0aab3";
    intradayChart.categoryAxesSettings = categoryAxesSettings;

    var dataSet = new AmCharts.DataSet();
    dataSet.fieldMappings = [{
        fromField: "price",
        toField: "value"
    }, {
        fromField: "volume",
        toField: "volume"
    }];
    dataSet.dataProvider = dynamicData;
    dataSet.categoryField = "realTime";

    intradayChart.dataSets = [dataSet];

    var timeSharePanel = new AmCharts.StockPanel();
    timeSharePanel.showCategoryAxis = false;
    timeSharePanel.title = "Value";
    timeSharePanel.percentHeight = 70;
    timeSharePanel.categoryAxis.color = "#a0aab3";

    var timeShareAxis = new AmCharts.ValueAxis();
    timeShareAxis.inside = true;
    timeShareAxis.color = "#a0aab3";
    timeSharePanel.addValueAxis(timeShareAxis);

    var valueGraph = new AmCharts.StockGraph();
    valueGraph.valueField = "value";
    valueGraph.valueAxis = timeShareAxis;
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
    volumeAxis.color = "#a0aab3";
    volumePanel.addValueAxis(volumeAxis);

    var volumeGraph = new AmCharts.StockGraph();
    volumeGraph.valueField = "volume";
    volumeGraph.valueAxis = volumeAxis;
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
    scrollbarSettings.color = "#a0aab3";
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

function initBpForecastChart() {
    bpForecastChart = new AmCharts.AmSerialChart();
    bpForecastChart.addClassNames = true;

    //future图表的全局设置
    bpForecastChart.addClassNames = true;
    bpForecastChart.title = "Future";
    bpForecastChart.dataProvider = pyTradeData;
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

    var legend = new AmCharts.AmLegend();
    legend.position = "top";
    legend.color = "#a0aab3";
    bpForecastChart.legend = legend;

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    bpForecastChart.chartCursor = cursor;

    bpForecastChart.write("bp_forecast_graph");
}

function initForecastChart() {
    forecastChart = new AmCharts.AmSerialChart();
    forecastChart.dataProvider = forecastData;
    forecastChart.categoryField = "date";
    forecastChart.dataDateFormat = "YYYY-MM-DD";

    var axis = new AmCharts.ValueAxis();
    axis.title = "SVM模型预测";
    axis.inside = true;
    axis.color = "#a0aab3";
    forecastChart.addValueAxis(axis);

    var categoryAxis = forecastChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#a0aab3";
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    //categoryAxis.color = "#a0aab3";
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
    maxGraph.title = "最大预估";
    maxGraph.type = "line";
    maxGraph.valueField = "price_high";
    maxGraph.balloonText = "最大预估: <b>[[value]]</b>";
    forecastChart.addGraph(maxGraph);

    var minGraph = new AmCharts.AmGraph();
    minGraph.title = "最小预估";
    minGraph.type = "line";
    minGraph.fillAlphas = 0.2;
    minGraph.fillToGraph = "maxGraph";
    minGraph.valueField = "price_low";
    minGraph.balloonText = "最小预估: <b>[[value]]</b>";
    forecastChart.addGraph(minGraph);

    var pointGraph = new AmCharts.AmGraph();
    pointGraph.title = "中值";
    pointGraph.type = "line";
    pointGraph.bullet = "round";
    pointGraph.bulletSize = 8;
    pointGraph.bulletBorderThickness = 1;
    pointGraph.lineAlpha = 0;
    pointGraph.valueField = "price_middle";
    pointGraph.balloonText = "中值: <b>[[value]]</b>";
    forecastChart.addGraph(pointGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    forecastChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.position = "top";
    legend.color = "#a0aab3";
    forecastChart.legend = legend;

    forecastChart.write("forecast_graph");
}

var gradeHistoryChart;
var gradeHistoryData = [];
var gradeHistoryDataSet;

function initGradeHistoryChart() {
    gradeHistoryChart = new AmCharts.AmStockChart();
    gradeHistoryChart.addClassNames = true;

    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
    //categoryAxesSettings.minPeriod = "mm";
    categoryAxesSettings.color = "#a0aab3";
    gradeHistoryChart.categoryAxesSettings = gradeHistoryChart;

    gradeHistoryDataSet = new AmCharts.DataSet();
    gradeHistoryDataSet.dataProvider = gradeHistoryData;
    gradeHistoryDataSet.categoryField = "date";
    gradeHistoryDataSet.dataDateFormat = "YYYY-MM-DD";
    gradeHistoryDataSet.fieldMappings = [{
        fromField: "pb",
        toField: "pb"
    }, {
        fromField: "pe",
        toField: "pe"
    }, {
        fromField: "quantity",
        toField: "quantity"
    }, {
        fromField: "deviation",
        toField: "deviation"
    }, {
        fromField: "committee",
        toField: "committee"
    }];

    gradeHistoryChart.dataSets = [gradeHistoryDataSet];

    var pbChart = new AmCharts.StockPanel();
    pbChart.title = "市净率";
    pbChart.showCategoryAxis = false;
    pbChart.percentHeight = 18;

    var pbValueAxis = new AmCharts.ValueAxis();
    //pbValueAxis.axisAlpha = 0.1;
    pbValueAxis.color = "#a0aab3";
    pbChart.addValueAxis(pbValueAxis);

    var pbGraph = new AmCharts.StockGraph();
    pbGraph.title = "市净率";
    pbGraph.type = "line";
    pbGraph.valueField = "pb";
    pbGraph.useDataSetColors = false;
    pbGraph.lineColor = "#ff6666";
    pbGraph.balloonText = "市净率: <b>[[value]]</b>";
    pbGraph.valueAxis = pbValueAxis;
    pbChart.addStockGraph(pbGraph);

    ///
    var peChart = new AmCharts.StockPanel();
    peChart.title = "市盈率";
    peChart.showCategoryAxis = false;
    peChart.percentHeight = 18;

    var peValueAxis = new AmCharts.ValueAxis();
    //peValueAxis.axisAlpha = 0.1;
    peValueAxis.color = "#a0aab3";
    peChart.addValueAxis(peValueAxis);

    var peGraph = new AmCharts.StockGraph();
    peGraph.title = "市盈率";
    peGraph.type = "line";
    peGraph.valueField = "pe";
    peGraph.useDataSetColors = false;
    peGraph.lineColor = "#ffff66";
    peGraph.balloonText = "市盈率: <b>[[value]]</b>";
    peGraph.valueAxis = peValueAxis;
    peChart.addStockGraph(peGraph);

    ///

    var quantityChart = new AmCharts.StockPanel();
    quantityChart.title = "量比";
    quantityChart.showCategoryAxis = false;
    quantityChart.percentHeight = 18;

    var quantityValueAxis = new AmCharts.ValueAxis();
    //quantityValueAxis.axisAlpha = 0.1;
    quantityValueAxis.color = "#a0aab3";
    quantityChart.addValueAxis(quantityValueAxis);

    var quantityGraph = new AmCharts.StockGraph();
    quantityGraph.title = "量比";
    quantityGraph.type = "line";
    quantityGraph.useDataSetColors = false;
    quantityGraph.valueField = "quantity";
    quantityGraph.lineColor = "#3399cc";
    quantityGraph.valueAxis = quantityValueAxis;
    quantityGraph.balloonText = "量比: <b>[[value]]</b>";
    quantityChart.addStockGraph(quantityGraph);

    ///

    var committeeChart = new AmCharts.StockPanel();
    committeeChart.title = "委比";
    committeeChart.showCategoryAxis = false;
    committeeChart.percentHeight = 18;

    var committeeValueAxis = new AmCharts.ValueAxis();
    //committeeValueAxis.axisAlpha = 0.1;
    committeeValueAxis.color = "#a0aab3";
    committeeChart.addValueAxis(committeeValueAxis);

    var committeeGraph = new AmCharts.StockGraph();
    committeeGraph.title = "委比";
    committeeGraph.type = "line";
    committeeGraph.useDataSetColors = false;
    committeeGraph.lineColor = "#996600";
    committeeGraph.valueField = "committee";
    committeeGraph.valueAxis = committeeValueAxis;
    committeeGraph.balloonText = "委比: <b>[[value]]</b>";
    committeeChart.addStockGraph(committeeGraph);

    ///

    var updownChart = new AmCharts.StockPanel();
    updownChart.title = "涨跌幅";
    //updownChart.showCategoryAxis = false;
    updownChart.percentHeight = 28;

    var updownValueAxis = new AmCharts.ValueAxis();
    //updownValueAxis.axisAlpha = 0.1;
    updownValueAxis.color = "#a0aab3";
    updownChart.addValueAxis(updownValueAxis);

    var updownGraph = new AmCharts.StockGraph();
    updownGraph.title = "涨跌幅";
    updownGraph.type = "line";
    updownGraph.useDataSetColors = false;
    updownGraph.lineColor = "#99cc66";
    updownGraph.valueField = "deviation";
    updownGraph.valueAxis = updownValueAxis;
    updownGraph.balloonText = "涨跌幅: <b>[[value]]</b>";
    updownChart.addStockGraph(updownGraph);

    ///

    var cursor = new AmCharts.ChartCursorSettings();
    cursor.valueBalloonsEnabled = true;
    gradeHistoryChart.chartCursorSettings = cursor;

    var scroll = new AmCharts.ChartScrollbarSettings();
    scroll.enabled = false;
    gradeHistoryChart.chartScrollbarSettings = scroll;

    gradeHistoryChart.panels = [pbChart, peChart, committeeChart, quantityChart, updownChart];
    gradeHistoryChart.write("grade_zx");
}

function initRelativeHistoryChart() {
    var openRelativeChart = new AmCharts.AmSerialChart();
    openRelativeChart.addClassNames = true;
    openRelativeChart.dataProvider = relativeData;
    openRelativeChart.categoryField = "date";

    var categoryAxis = openRelativeChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = false;
    categoryAxis.color = "#a0aab3";
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.gridColor = "#000000";
    categoryAxis.axisColor = "#555555";
    categoryAxis.color = "#a0aab3";
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

    var benchmarkOpenAxis = new AmCharts.ValueAxis();
    benchmarkOpenAxis.inside = true;
    benchmarkOpenAxis.color = "#a0aab3";
    openRelativeChart.addValueAxis(benchmarkOpenAxis);

    var stockOpenAxis = new AmCharts.ValueAxis();
    stockOpenAxis.inside = true;
    stockOpenAxis.color = "#a0aab3";
    stockOpenAxis.position = "right";
    openRelativeChart.addValueAxis(stockOpenAxis);

    var benchOpenGraph = new AmCharts.AmGraph();
    benchOpenGraph.title = "大盘";
    benchOpenGraph.type = "line";
    benchOpenGraph.valueAxis = benchmarkOpenAxis;
    benchOpenGraph.valueField = "benchmarkOpen";
    benchOpenGraph.bullet = "round";
    openRelativeChart.addGraph(benchOpenGraph);

    var stockOpenGraph = new AmCharts.AmGraph();
    stockOpenGraph.title = "该股";
    stockOpenGraph.type = "line";
    stockOpenGraph.valueAxis = stockOpenAxis;
    stockOpenGraph.valueField = "stockOpen";
    stockOpenGraph.bullet = "square";
    openRelativeChart.addGraph(stockOpenGraph);

    var openLegend = new AmCharts.AmLegend();
    openLegend.labelText = "[[title]]";
    openLegend.position = "top";
    openLegend.valueText = null;
    openLegend.color = "#a0aab3";
    openRelativeChart.legend = openLegend;

    var openCursor = new AmCharts.ChartCursor();
    openCursor.fullWidth = false;
    openRelativeChart.chartCursor = openCursor;

    openRelativeChart.write("relative_graph_open");

    ////////////////////////////////////////

    var volumeRelativeChart = new AmCharts.AmSerialChart();
    volumeRelativeChart.addClassNames = true;
    volumeRelativeChart.dataProvider = relativeData;
    volumeRelativeChart.categoryField = "date";

    var volumeCategoryAxis = volumeRelativeChart.categoryAxis;
    volumeCategoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    volumeCategoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    volumeCategoryAxis.autoGridCount = false;
    volumeCategoryAxis.color = "#a0aab3";
    volumeCategoryAxis.gridCount = 50;
    volumeCategoryAxis.gridAlpha = 0.1;
    volumeCategoryAxis.gridColor = "#000000";
    volumeCategoryAxis.axisColor = "#555555";
    volumeCategoryAxis.color = "#a0aab3";
    // we want custom date formatting, so we change it in next line
    volumeCategoryAxis.dateFormats = [{
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

    var benchmarkVolumeAxis = new AmCharts.ValueAxis();
    benchmarkVolumeAxis.inside = true;
    benchmarkVolumeAxis.color = "#a0aab3";
    benchmarkVolumeAxis.usePrefixes = true;
    volumeRelativeChart.addValueAxis(benchmarkVolumeAxis);

    var stockVolumeAxis = new AmCharts.ValueAxis();
    stockVolumeAxis.inside = true;
    stockVolumeAxis.color = "#a0aab3";
    stockVolumeAxis.position = "right";
    stockVolumeAxis.usePrefixes = true;
    volumeRelativeChart.addValueAxis(stockVolumeAxis);

    var benchVolumeGraph = new AmCharts.AmGraph();
    benchVolumeGraph.title = "大盘";
    benchVolumeGraph.type = "line";
    benchVolumeGraph.valueAxis = benchmarkVolumeAxis;
    benchVolumeGraph.valueField = "benchmarkVolume";
    benchVolumeGraph.bullet = "round";
    volumeRelativeChart.addGraph(benchVolumeGraph);

    var stockVolumeGraph = new AmCharts.AmGraph();
    stockVolumeGraph.title = "该股";
    stockVolumeGraph.type = "line";
    stockVolumeGraph.valueAxis = stockVolumeAxis;
    stockVolumeGraph.valueField = "stockVolume";
    stockVolumeGraph.bullet = "square";
    volumeRelativeChart.addGraph(stockVolumeGraph);

    var volumeLegend = new AmCharts.AmLegend();
    volumeLegend.labelText = "[[title]]";
    volumeLegend.position = "top";
    volumeLegend.valueText = null;
    volumeLegend.color = "#a0aab3";
    volumeRelativeChart.legend = volumeLegend;

    var volumeCursor = new AmCharts.ChartCursor();
    volumeCursor.fullWidth = false;
    volumeRelativeChart.chartCursor = volumeCursor;

    volumeRelativeChart.write("relative_graph_volume");

    /////////////////////////////////////////

    var devRelativeChart = new AmCharts.AmSerialChart();
    devRelativeChart.addClassNames = true;
    devRelativeChart.dataProvider = relativeData;
    devRelativeChart.categoryField = "date";

    var devCategoryAxis = devRelativeChart.categoryAxis;
    devCategoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    devCategoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    devCategoryAxis.autoGridCount = false;
    devCategoryAxis.color = "#a0aab3";
    devCategoryAxis.gridCount = 50;
    devCategoryAxis.gridAlpha = 0.1;
    devCategoryAxis.gridColor = "#000000";
    devCategoryAxis.axisColor = "#555555";
    devCategoryAxis.color = "#a0aab3";
    // we want custom date formatting, so we change it in next line
    devCategoryAxis.dateFormats = [{
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

    var benchmarkDevAxis = new AmCharts.ValueAxis();
    benchmarkDevAxis.inside = true;
    benchmarkDevAxis.color = "#a0aab3";
    benchmarkDevAxis.usePrefixes = true;
    devRelativeChart.addValueAxis(benchmarkDevAxis);

    var stockDevAxis = new AmCharts.ValueAxis();
    stockDevAxis.inside = true;
    stockDevAxis.color = "#a0aab3";
    stockDevAxis.position = "right";
    stockDevAxis.usePrefixes = true;
    devRelativeChart.addValueAxis(stockDevAxis);

    var benchDevGraph = new AmCharts.AmGraph();
    benchDevGraph.title = "大盘";
    benchDevGraph.type = "line";
    benchDevGraph.valueAxis = benchmarkDevAxis;
    benchDevGraph.valueField = "benchmarkDev";
    benchDevGraph.bullet = "round";
    devRelativeChart.addGraph(benchDevGraph);

    var stockDevGraph = new AmCharts.AmGraph();
    stockDevGraph.title = "该股";
    stockDevGraph.type = "line";
    stockDevGraph.valueAxis = stockDevAxis;
    stockDevGraph.valueField = "stockDev";
    stockDevGraph.bullet = "square";
    devRelativeChart.addGraph(stockDevGraph);

    var devLegend = new AmCharts.AmLegend();
    devLegend.labelText = "[[title]]";
    devLegend.position = "top";
    devLegend.valueText = null;
    devLegend.color = "#a0aab3";
    devRelativeChart.legend = devLegend;

    var devCursor = new AmCharts.ChartCursor();
    devCursor.fullWidth = false;
    devRelativeChart.chartCursor = devCursor;

    devRelativeChart.write("relative_graph_upDown");
    ////////////////////////////////////////
}

function initTabTableChart2() {
    var predictKDJChart = new AmCharts.AmSerialChart();

    //rsi图表的全局设置
    predictKDJChart.addClassNames = true;
    predictKDJChart.title = "KDJ";
    predictKDJChart.dataProvider = tabChartData2;
    predictKDJChart.categoryField = "date";
    //kdjChart.dataDateFormat = "YYYY-MM-DD";

    var kdjAxis = new AmCharts.ValueAxis();
    kdjAxis.inside = true;
    kdjAxis.title = "KDJ";
    kdjAxis.color = "#a0aab3";
    predictKDJChart.addValueAxis(kdjAxis);

    var kdjCategoryAxis = predictKDJChart.categoryAxis;
    kdjCategoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    kdjCategoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    kdjCategoryAxis.autoGridCount = false;
    kdjCategoryAxis.gridCount = 50;
    kdjCategoryAxis.color = "#a0aab3";
    kdjCategoryAxis.gridAlpha = 0.1;
    kdjCategoryAxis.dateFormats = [{
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
    predictKDJChart.addGraph(KGraph);

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
    predictKDJChart.addGraph(DGraph);

    var JGraph = new AmCharts.AmGraph();
    JGraph.title = "Slow J";
    JGraph.type = "line";
    JGraph.valueField = "slowJ";
    JGraph.lineColor = "#990033";
    JGraph.useDataSetColors = false;
    JGraph.balloonText = "slowJ: <b>[[value]]</b>";
    predictKDJChart.addGraph(JGraph);

    var kdjCursor = new AmCharts.ChartCursor();
    kdjCursor.valueBalloonsEnabled = true;
    kdjCursor.fullWidth = false;
    kdjCursor.cursorAlpha = 0.1;
    predictKDJChart.chartCursor = kdjCursor;

    //var kdjLegend = new AmCharts.AmLegend();
    //kdjLegend.labelText = "[[title]]";
    //kdjLegend.position = "top";
    //kdjLegend.valueText = null;
    //kdjChart.legend = kdjLegend;

    predictKDJChart.write('special_graph_kdj');

    var predictRSIChart = new AmCharts.AmSerialChart();

    //rsi图表的全局设置
    predictRSIChart.addClassNames = true;
    predictRSIChart.title = "RSI";
    predictRSIChart.dataProvider = tabChartData2;
    predictRSIChart.categoryField = "date";
    //rsiChart.dataDateFormat = "YYYY-MM-DD";

    var rsiAxis = new AmCharts.ValueAxis();
    rsiAxis.title = "RSI";
    rsiAxis.color = "#a0aab3";
    rsiAxis.inside = true;

    predictRSIChart.addValueAxis(rsiAxis);

    var rsiCategoryAxis = predictRSIChart.categoryAxis;
    rsiCategoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    rsiCategoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    rsiCategoryAxis.autoGridCount = false;
    rsiCategoryAxis.gridCount = 50;
    rsiCategoryAxis.color = "#a0aab3";
    rsiCategoryAxis.gridAlpha = 0.1;
    rsiCategoryAxis.dateFormats = [{
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
    predictRSIChart.addGraph(rsi6Graph);

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
    predictRSIChart.addGraph(rsi12Graph);

    var rsi24Graph = new AmCharts.AmGraph();
    rsi24Graph.title = "RSI 24";
    rsi24Graph.type = "line";
    rsi24Graph.valueField = "rsi24";
    rsi24Graph.lineColor = "#990033";
    rsi24Graph.useDataSetColors = false;
    rsi24Graph.balloonText = "RSI 24: <b>[[value]]</b>";
    predictRSIChart.addGraph(rsi24Graph);

    var cursor = new AmCharts.ChartCursor();
    cursor.valueBalloonsEnabled = true;
    cursor.fullWidth = false;
    cursor.cursorAlpha = 0.1;
    predictRSIChart.chartCursor = cursor;

    //var rsiLegend = new AmCharts.AmLegend();
    //rsiLegend.labelText = "[[title]]";
    //rsiLegend.position = "top";
    //rsiLegend.valueText = null;
    //predictRSIChart.legend = rsiLegend;

    predictRSIChart.write("special_graph_rsi");

    var predictBollChart = new AmCharts.AmSerialChart();
    //charts.push(bollChart);

    //rsi图表的全局设置
    predictBollChart.addClassNames = true;
    predictBollChart.title = "BOLL";
    predictBollChart.dataProvider = tabChartData2;
    predictBollChart.categoryField = "date";
    predictBollChart.columnWidth = 0.4;
    //bollChart.dataDateFormat = "YYYY-MM-DD";

    var bollAxis = new AmCharts.ValueAxis();
    bollAxis.color = "#a0aab3";
    bollAxis.title = "BOLL";
    bollAxis.inside = true;

    predictBollChart.addValueAxis(bollAxis);

    var categoryAxis = predictBollChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.color = "#a0aab3";
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
    bollGraph.fillAlphas = 0
    bollGraph.fillColors = "#eb6877";
    bollGraph.lineColor = "#eb6877";
    bollGraph.negativeFillColors = "#88cc66";
    bollGraph.negativeLineColor = "#88cc66";
    bollGraph.useDataSetColors = false;
    bollGraph.balloonText = "open: <b>[[open]]</b><br>close: <b>[[close]]</b><br>high: <b>[[high]]</b><br>low: <b>[[low]]</b>";
    predictBollChart.addGraph(bollGraph);

    var upperGraph = new AmCharts.AmGraph();
    upperGraph.title = "BOLL UPPER";
    upperGraph.type = "line";
    upperGraph.valueField = "boll_upper";
    upperGraph.lineColor = "#669999";
    upperGraph.useDataSetColors = false;
    upperGraph.balloonText = "boll upper: <b>[[value]]</b>";
    predictBollChart.addGraph(upperGraph);

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
    predictBollChart.addGraph(middleGraph);

    var lowGraph = new AmCharts.AmGraph();
    lowGraph.title = "BOLL LOW";
    lowGraph.type = "line";
    lowGraph.valueField = "boll_low";
    lowGraph.lineColor = "#990033";
    lowGraph.useDataSetColors = false;
    lowGraph.balloonText = "boll low: <b>[[value]]</b>";
    predictBollChart.addGraph(lowGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.valueBalloonsEnabled = true;
    cursor.fullWidth = false;
    cursor.cursorAlpha = 0.1;
    predictBollChart.chartCursor = cursor;

    //var bollLegend = new AmCharts.AmLegend();
    //bollLegend.labelText = "[[title]]";
    //bollLegend.valueText = null;
    //bollLegend.position = "top";
    //predictBollChart.legend = bollLegend;

    predictBollChart.write("special_graph_boll");
}

function initSpecialStragtey() {
    if(detailStrategy.DawnStarBL==true){
        initSpecialStragteyChart("detail_strategy_dawnStar", 5);
    }
    if(detailStrategy.DuskStarBL==true){
        initSpecialStragteyChart("detail_strategy_duskStar", detailStrategy.DuskStarLength);
    }
    if(detailStrategy.ShutStarBL==true){
        initSpecialStragteyChart("detail_strategy_shutStar", detailStrategy.ShutStarLength);
    }
    if(detailStrategy.HangOnBL==true){
        initSpecialStragteyChart("detail_strategy_hangOn", detailStrategy.HangOnLength);
    }
    if(detailStrategy.PregnantBL==true){
        initSpecialStragteyChart("detail_strategy_pregnant", detailStrategy.PregnantLength);
    }
    if(detailStrategy.DarkCloudeBL==true){
        initSpecialStragteyChart("detail_strategy_darkCloud", detailStrategy.DarkCloudeLength);
    }
    if(detailStrategy.DawnLightBL==true){
        initSpecialStragteyChart("detail_strategy_dawnLight", detailStrategy.DawnLightLength);
    }
    if(detailStrategy.RedSolderBL==true){
        initSpecialStragteyChart("detail_strategy_redSolder", detailStrategy.RedSolderLength);
    }
}

function initSpecialStragteyChart(id, size) {
    var stragteyChart = new AmCharts.AmSerialChart();

    var data = [];
    for(var i=chartData.length-size;i<chartData.length;i++){
        data.push(chartData[i]);
    }

    stragteyChart.dataProvider = data;
    stragteyChart.categoryField = "date";
    stragteyChart.addClassNames = true;
    stragteyChart.columnWidth = 0.2;

    var axis = new AmCharts.ValueAxis();
    axis.inside = true;
    axis.color = "#a0aab3";
    stragteyChart.addValueAxis(axis);

    var categoryAxis = stragteyChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.color = "#a0aab3";
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

    var graph = new AmCharts.AmGraph();
    graph.type = "candlestick";
    graph.title = "Value";
    graph.openField = "open";
    graph.closeField = "close";
    graph.highField = "high";
    graph.lowField = "low";
    graph.valueField = "value";
    graph.lineColor = "#cc0033";
    graph.fillColors = "#cc0033";
    graph.negativeLineColor = "#116633";
    graph.negativeFillColors = "#116633";
    graph.useDataSetColors = false;
    graph.fillAlphas = 1;
    graph.balloonText = "开盘价: <b>[[open]]</b><br>收盘价: <b>[[close]]</b><br>最低价: <b>[[low]]</b><br>最高价: <b>[[high]]</b>";
    stragteyChart.addGraph(graph);

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    stragteyChart.chartCursor = cursor;

    stragteyChart.write(id);
}

function initSeasonChart() {
    var seasonChart = new AmCharts.AmSerialChart();
    seasonChart.addClassNames = true;
    seasonChart.dataProvider = season;
    seasonChart.dataDateFormat = "YYYY-MM-DD";
    seasonChart.categoryField = "date";

    var categoryAxis = seasonChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.color = "#a0aab3";
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

    var jqmglyAxis = new AmCharts.ValueAxis();
    jqmglyAxis.color = "#a0aab3";
    seasonChart.addValueAxis(jqmglyAxis);

    var jqmgly = new AmCharts.AmGraph();
    jqmgly.type = "line";
    jqmgly.title = "加权每股利益";
    jqmgly.valueAxis = jqmglyAxis;
    jqmgly.valueField = "jqmgly";
    jqmgly.bullet = "round";
    jqmgly.balloonText = "加权每股利益: <b>[[value]]</b>";
    seasonChart.addGraph(jqmgly);

    var tzhdmgsyAxis = new AmCharts.ValueAxis();
    tzhdmgsyAxis.offset = 45;
    tzhdmgsyAxis.color = "#a0aab3";
    seasonChart.addValueAxis(tzhdmgsyAxis);

    var tzhdmgsy = new AmCharts.AmGraph();
    tzhdmgsy.type = "line";
    tzhdmgsy.title = "调整后的每股收益";
    tzhdmgsy.valueAxis = tzhdmgsyAxis;
    tzhdmgsy.valueField = "mgsy_tzh";
    tzhdmgsy.bullet = "round";
    tzhdmgsy.bulletColor = "rgb(255,255,204)";
    tzhdmgsy.lineColor = "rgb(255,255,204)";
    tzhdmgsy.useDataSetColors = false;
    tzhdmgsy.balloonText = "调整后的每股收益: <b>[[value]]</b>"
    seasonChart.addGraph(tzhdmgsy);

    var mgjzcAxis = new AmCharts.ValueAxis();
    mgjzcAxis.offset = 90;
    mgjzcAxis.color = "#a0aab3";
    seasonChart.addValueAxis(mgjzcAxis);
    //
    var mgjzc = new AmCharts.AmGraph();
    mgjzc.type = "line";
    mgjzc.title = "调整后的每股净资产";
    mgjzc.valueAxis = mgjzcAxis;
    mgjzc.valueField = "mgjzc_tzh";
    mgjzc.useDataSetColors = false;
    mgjzc.lineColor = "#990033";
    mgjzc.bullet = "round";
    mgjzc.bulletColor = "#990033";
    mgjzc.balloonText = "调整后的每股净资产: <b>[[value]]</b>";
    seasonChart.addGraph(mgjzc);

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    seasonChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    legend.valueText = null;
    legend.color = "#a0aab3";
    seasonChart.legend = legend;

    seasonChart.write("season_graph1");
}

function initSeasonChart2() {
    var seasonChart = new AmCharts.AmSerialChart();
    seasonChart.addClassNames = true;
    seasonChart.dataProvider = season;
    seasonChart.dataDateFormat = "YYYY-MM-DD";
    seasonChart.categoryField = "date";

    var categoryAxis = seasonChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.color = "#a0aab3";
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

    var jqjzcsylAxis = new AmCharts.ValueAxis();
    jqjzcsylAxis.color = "#a0aab3";
    seasonChart.addValueAxis(jqjzcsylAxis);

    var jqjzcsylGraph = new AmCharts.AmGraph();
    jqjzcsylGraph.type = "line";
    jqjzcsylGraph.title = "加权净资产收益率";
    jqjzcsylGraph.valueAxis = jqjzcsylAxis;
    jqjzcsylGraph.valueField = "jqjzcsyl";
    jqjzcsylGraph.bullet = "round";
    jqjzcsylGraph.balloonText = "加权净资产收益率: <b>[[value]]</b>";
    seasonChart.addGraph(jqjzcsylGraph);

    var zzclrlAxis = new AmCharts.ValueAxis();
    zzclrlAxis.offset = 45;
    zzclrlAxis.color = "#a0aab3";
    seasonChart.addValueAxis(zzclrlAxis);

    var zzclrlGraph = new AmCharts.AmGraph();
    zzclrlGraph.type = "line";
    zzclrlGraph.title = "总资产净利润率";
    zzclrlGraph.valueAxis = zzclrlAxis;
    zzclrlGraph.valueField = "zzcjlrl";
    zzclrlGraph.bullet = "round";
    zzclrlGraph.bulletColor = "rgb(255,255,204)";
    zzclrlGraph.lineColor = "rgb(255,255,204)";
    zzclrlGraph.useDataSetColors = false;
    zzclrlGraph.balloonText = "总资产净利润率: <b>[[value]]</b>"
    seasonChart.addGraph(zzclrlGraph);

    var zyywlrlAxis = new AmCharts.ValueAxis();
    zyywlrlAxis.offset = 90;
    zyywlrlAxis.color = "#a0aab3";
    seasonChart.addValueAxis(zyywlrlAxis);
    //
    var zyywlrlGraph = new AmCharts.AmGraph();
    zyywlrlGraph.type = "line";
    zyywlrlGraph.title = "主营业务利润率";
    zyywlrlGraph.valueAxis = zyywlrlAxis;
    zyywlrlGraph.valueField = "zyywlrl";
    zyywlrlGraph.useDataSetColors = false;
    zyywlrlGraph.lineColor = "#990033";
    zyywlrlGraph.bullet = "round";
    zyywlrlGraph.bulletColor = "#990033";
    zyywlrlGraph.balloonText = "主营业务利润率: <b>[[value]]</b>";
    seasonChart.addGraph(zyywlrlGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    seasonChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    legend.valueText = null;
    legend.color = "#a0aab3";
    seasonChart.legend = legend;

    seasonChart.write("season_graph2");
}

function initSeasonChart3() {
    var seasonChart = new AmCharts.AmSerialChart();
    seasonChart.addClassNames = true;
    seasonChart.dataProvider = season;
    seasonChart.dataDateFormat = "YYYY-MM-DD";
    seasonChart.categoryField = "date";

    var categoryAxis = seasonChart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.color = "#a0aab3";
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

    var jlrzzlAxis = new AmCharts.ValueAxis();
    jlrzzlAxis.color = "#a0aab3";
    seasonChart.addValueAxis(jlrzzlAxis);

    var jlrzzlGraph = new AmCharts.AmGraph();
    jlrzzlGraph.type = "line";
    jlrzzlGraph.title = "净利润增长率";
    jlrzzlGraph.valueAxis = jlrzzlAxis;
    jlrzzlGraph.valueField = "jlrzzl";
    jlrzzlGraph.bullet = "round";
    jlrzzlGraph.balloonText = "净利润增长率: <b>[[value]]</b>";
    seasonChart.addGraph(jlrzzlGraph);

    var jzczzlAxis = new AmCharts.ValueAxis();
    jzczzlAxis.offset = 45;
    jzczzlAxis.color = "#a0aab3";
    seasonChart.addValueAxis(jzczzlAxis);

    var jzczzlGraph = new AmCharts.AmGraph();
    jzczzlGraph.type = "line";
    jzczzlGraph.title = "净资产增长率";
    jzczzlGraph.valueAxis = jzczzlAxis;
    jzczzlGraph.valueField = "jzczzl";
    jzczzlGraph.bullet = "round";
    jzczzlGraph.bulletColor = "rgb(255,255,204)";
    jzczzlGraph.lineColor = "rgb(255,255,204)";
    jzczzlGraph.useDataSetColors = false;
    jzczzlGraph.balloonText = "净资产增长率: <b>[[value]]</b>"
    seasonChart.addGraph(jzczzlGraph);

    var zzczzlAxis = new AmCharts.ValueAxis();
    zzczzlAxis.offset = 90;
    zzczzlAxis.color = "#a0aab3";
    seasonChart.addValueAxis(zzczzlAxis);
    //
    var zzczzlGraph = new AmCharts.AmGraph();
    zzczzlGraph.type = "line";
    zzczzlGraph.title = "总资产增长率";
    zzczzlGraph.valueAxis = zzczzlAxis;
    zzczzlGraph.valueField = "zzczzl";
    zzczzlGraph.useDataSetColors = false;
    zzczzlGraph.lineColor = "#990033";
    zzczzlGraph.bullet = "round";
    zzczzlGraph.bulletColor = "#990033";
    zzczzlGraph.balloonText = "总资产增长率: <b>[[value]]</b>";
    seasonChart.addGraph(zzczzlGraph);

    var cursor = new AmCharts.ChartCursor();
    cursor.fullWidth = false;
    seasonChart.chartCursor = cursor;

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    legend.valueText = null;
    legend.color = "#a0aab3";
    seasonChart.legend = legend;

    seasonChart.write("season_graph3");
}