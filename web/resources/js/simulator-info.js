/**
 * Created by Hermit on 16/8/27.
 */

window.onload = function() {
    initStartStop();
    initChart();
    initStrategyRunning(simulator_info.dailyResultPos);
};

function initStartStop() {
    if(state=="1"){
        $("#start").hide();
        $("#stop").show();
    }else{
        $("#start").show();
        $("#stop").hide();
    }

    $("#start").on("click", function() {
        $.ajax({
            type: "get",
            url: "user/simulator/restart-simulator.do?id="+simulator_id,
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.success==true){
                    state = "0";
                    $("#start").hide();
                    $("#stop").show();
                }else{
                    alert("重启失败,请稍后再试");
                }
            },
            error: function() {
                alert("重启失败,请稍后再试");
            }
        });
    });
    $("#stop").on("click", function() {
        $.ajax({
            type: "get",
            url: "user/simulator/stop-simulator.do?id="+simulator_id,
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.success==true){
                    state = "1";
                    $("#start").show();
                    $("#stop").hide();
                }else{
                    alert("关闭失败,请稍后再试");
                }
            },
            error: function() {
                alert("关闭失败,请稍后再试");
            }
        });
    });
}

var chart;
function initChart() {
    AmCharts.theme = AmCharts.themes.dark;
    chart = new AmCharts.AmSerialChart();
    chart.addClassNames = true;
    chart.categoryField = "date";
    chart.dataProvider = simulator_info.dailyResultPos;

    var yAxis = new AmCharts.ValueAxis();
    chart.addValueAxis(yAxis);

    var categoryAxis = chart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 50;
    categoryAxis.position = "bottom";
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

    var strategy_graph = new AmCharts.AmGraph();
    strategy_graph.type = "line";
    strategy_graph.title = "Total Return";
    strategy_graph.valueField = "total_returns";
    strategy_graph.valueAxis = yAxis;
    strategy_graph.balloonText = "Returns: <b>[[value]]</b>";
    chart.addGraph(strategy_graph);

    var bench_graph = new AmCharts.AmGraph();
    bench_graph.type = "line";
    bench_graph.title = "Total Return";
    bench_graph.valueField = "benchmark_total_returns";
    bench_graph.valueAxis = yAxis;
    bench_graph.balloonText = "Bench Returns: <b>[[value]]</b>";
    chart.addGraph(bench_graph);

    var cursor = new AmCharts.ChartCursor();
    cursor.valueBalloonsEnabled = true;
//        cursor.fullWidth = false;
    cursor.cursorAlpha = 0.6;

    chart.chartCursor = cursor;

    var scrollbarSettings = new AmCharts.ChartScrollbar();
//        scrollbarSettings.usePeriod = "10mm"; // this will improve performance
    scrollbarSettings.updateOnReleaseOnly = false;
//        scrollbarSettings.categoryAxis = categoryAxis;
    scrollbarSettings.color = "#a0aab3";

    chart.chartScrollbar = scrollbarSettings;

    chart.write("dailyResultGraph");
}

function initStrategyRunning(data) {
    var array = new Array();
    var i;
    for(i=0;i<data.length;i++){
        var str = data[i].trades;
        if(str.length>2){
            //var first = str.indexOf();
            var jstr = str.substring(8, str.length-3);
            jstr = jstr.replace(/Timestamp/, "");
            array.push(eval("("+jstr+")"));
        }
    }
    //console.log(array);
    $("#trade_result_wrapper").html("");
    for(i=0;i<array.length;i++){
        var item = array[i];
        var date = item.date;
        var price = new Number(item.price);
        date = date.substring(0, date.length-1);
        $("#trade_result_wrapper").append("" +
            "<div class='column'>" +
            "   <span class='column-item'>"+date+"</span>" +
            "   <span class='column-item'>"+item.order_book_id+"</span>" +
            "   <span class='column-item'>"+price.toFixed(2)+"</span>" +
            "   <span class='column-item'>"+item.amount+"</span>" +
            "</div>");
    }
}