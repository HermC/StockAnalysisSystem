<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script>
    var chartData = [
        {
            "lineColor": "#ffc321",
            "date": "2012-01-01",
            "duration": 408
        },
        {
            "date": "2012-01-02",
            "duration": 482
        },
        {
            "date": "2012-01-03",
            "duration": 562
        },
        {
            "date": "2012-01-04",
            "duration": 379
        },
        {
            "lineColor": "#fd813c",
            "date": "2012-01-05",
            "duration": 501
        },
        {
            "date": "2012-01-06",
            "duration": 443
        },
        {
            "date": "2012-01-07",
            "duration": 405
        },
        {
            "date": "2012-01-08",
            "duration": 309,
            "lineColor": "#CC0000"
        },
        {
            "date": "2012-01-09",
            "duration": 287
        },
        {
            "date": "2012-01-10",
            "duration": 485
        },
        {
            "date": "2012-01-11",
            "duration": 890
        },
        {
            "date": "2012-01-12",
            "duration": 810
        }
    ];

</script>

<div class="strategy-result-wrapper">
    <div class="column-wrapper">
        <div class="column">
            <div class="row column-item">
                <span class="row-item">Total Returns</span>
                <span class="row-item">43.436%</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Annual Returns</span>
                <span class="row-item">12.741%</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Alpha</span>
                <span class="row-item">0.02934</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Beta</span>
                <span class="row-item">0.792</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Sharpe</span>
                <span class="row-item">0.4727</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Sortino</span>
                <span class="row-item">0.6203</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Information Ratio</span>
                <span class="row-item">0.000542</span>
            </div>
        </div>
        <br>
        <div class="column">
            <div class="row column-item">
                <span class="row-item">Benchmark Total</span>
                <span class="row-item">53.024%</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Benchmark Annual</span>
                <span class="row-item">15.221%</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Volatility</span>
                <span class="row-item">0.2972</span>
            </div>
            <div class="row column-item">
                <span class="row-item">MaxDrawdown</span>
                <span class="row-item">-42.0396%</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Tracking Error</span>
                <span class="row-item">0.2527</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Downside Risk</span>
                <span class="row-item">0.2264</span>
            </div>
            <div class="row column-item">
                <span class="row-item"></span>
                <span class="row-item"></span>
            </div>
        </div>
    </div>
    <div id="backtesting_graph">

    </div>
</div>
<script>
    var chart;
    AmCharts.ready(function() {
        chart = new AmCharts.AmSerialChart();
        chart.addClassNames = true;
        chart.categoryField = "date";
        chart.dataProvider = chartData;

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
        strategy_graph.title = "MACD";
        strategy_graph.valueField = "duration";
        strategy_graph.valueAxis = yAxis;
        strategy_graph.balloonText = "Returns: <b>[[value]]</b>";
        strategy_graph.compareField = "value";
        chart.addGraph(strategy_graph);

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

        chart.write("backtesting_graph");
    });

</script>