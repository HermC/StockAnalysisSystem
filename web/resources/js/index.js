window.onload = function() {
    initialHeader();
    operationListener();
    showBenchLink();
};

function showBenchLink(){
    $('#bench_title ul').bind('mouseover',function(){
        $('#bench_dynamic_wrapper ul li.bench_link').each(function(){
            $(this).show();
        });
        $('.more_button').hide();
    }).bind('mouseleave',function(){
        $('#bench_dynamic_wrapper ul li.bench_link').each(function(){
            $(this).hide();
        });
        $('.more_button').show();
    });
}

function operationListener() {
    $(".operation").on("click", ".favor", function() {
        //operateFavStock(stock_id);
        operationNotice($(this.parentNode), "收藏成功!");
    });
    $(".operation").on("click", ".add", function() {
        //addCompareStock(stock_id);
        operationNotice($(this.parentNode), "添加对比成功!");
    });
}

function operationNotice(node, text){
    $(node.find("p")).html(text);
    $(node.children(".favor")).hide();
    $(node.children(".add")).hide();
    $(node.children(".operation_alert")).slideDown();
    setTimeout(function(){
        $(node.children(".operation_alert")).hide();
        $(node.children(".favor")).show();
        $(node.children(".add")).show();
    },800);
}

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

/**********************************
 *
 * 动态接口
 */


function requestDynamicData() {

    $.ajax({
        type: 'GET',
        url: "bench/active.do?id=399001",
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
    $("#dynamic_high").html(data.high);
    $("#dynamic_low").html(data.low);
    $("#dynamic_open").html(data.open);
    $("#dynamic_close").html(data.close);
    $("#dynamic_volume").html(data.volume);
    $("#dynamic_amount").html(data.amount);
    $("#dynamic_up_num").html(data.up_num);
    $("#dynamic_down_num").html(data.down_num);
    $("#dynamic_neutral_num").html(data.neutral_num);
}

window.setInterval(requestDynamicData, 5000);

/***********************
 *
 * 以下是图表
 * */

var intradayChart;

AmCharts.ready(function() {
    AmCharts.theme = AmCharts.themes.dark;
    initDynamicData();
    initDynamicChart();
});

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
    valueAxis.color = "#cccccc";
    valueAxis.inside = true;
    timeSharePanel.addValueAxis(valueAxis);

    var valueGraph = new AmCharts.StockGraph();
    valueGraph.valueField = "value";
    valueGraph.valueAxis = valueAxis;
    valueGraph.type = "smoothedLine";
    valueGraph.lineThickness = 2;
    //valueGraph.bullet = "round";
    valueGraph.bulletSize = 4;
    valueGraph.bulletBorderColor = "#ffde00";
    valueGraph.bulletBorderAlpha = 1;
    valueGraph.bulletBorderThickness = 2;
    valueGraph.lineColor = "#ffde00";
    valueGraph.useDataSetColors = false;
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
    volumeGraph.type = "column";
    //volumeGraph.cornerRadiusTop = 2;
    volumeGraph.fillAlphas = 1;
    volumeGraph.lineColor = "#ffde00";
    volumeGraph.fillColors = "#ffde00";
    volumeGraph.useDataSetColors = false;
    volumePanel.addStockGraph(volumeGraph);

    intradayChart.panels = [timeSharePanel, volumePanel];

    // OTHER SETTINGS ////////////////////////////////////
    var scrollbarSettings = new AmCharts.ChartScrollbarSettings();
    //scrollbarSettings.graph = valueGraph;
    scrollbarSettings.usePeriod = "10mm"; // this will improve performance
    scrollbarSettings.updateOnReleaseOnly = false;
    scrollbarSettings.position = "top";
    scrollbarSettings.color = "#cccccc";
    intradayChart.chartScrollbarSettings = scrollbarSettings;

    var cursorSettings = new AmCharts.ChartCursorSettings();
    cursorSettings.valueBalloonsEnabled = true;
    intradayChart.chartCursorSettings = cursorSettings;

    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.mouseWheelZoomEnabled = true;
    panelsSettings.usePrefixes = true;
    intradayChart.panelsSettings = panelsSettings;

    intradayChart.write('bench_graph_wrapper');
}