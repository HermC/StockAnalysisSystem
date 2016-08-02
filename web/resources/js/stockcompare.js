// 各种浏览器兼容
var hidden, state, visibilityChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
    state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    state = "webkitVisibilityState";
}

// 添加监听器，在title里显示状态变化
document.addEventListener(visibilityChange, function() {
    if(document[state]=="visible"){
        console.log("1");
        var tmp = $.cookie('compareStock');
        console.log(tmp);
        if(tmp==undefined){
            location.reload();
            return;
        }else{
            var result = tmp.split(",");
            var changed = false;
            for(var i=0;i<result.length;i++){
                changed = true;
                for(var j=0;j<stocks.length;j++){
                    if(stocks[j].id==result[i]){
                        changed = false;
                        break;
                    }
                }
                if(changed==true){
                    for(var n=0;n<stockList.length;n++){
                        if(stockList[n].id==result[i]){
                            addStockDiv(stockList[n].id, stockList[n].name);
                            return;
                        }
                    }
                }
            }
        }
    }
}, false);


// 初始化
//document.title = document[state];

//此变量记录当前对比中股票的数量
var num_display = 0;
//var num_contain = 0;

var stocks;

var displayedStocksData = [];
var hideStocksData = [];

var blanketContent;

//window.onactivate = function() {
//    location.reload();
//};

window.onload = function(){
    initialHeader();

    addInputListener();
    blanketLinstener();

    if(stocks==undefined){

    }else{
        for(var i=0;i<stocks.length;i++){
            addStockDiv(stocks[i].id, stocks[i].name);
        }
    }

    generateChartsData();
    validateCharts();

    clear();
    scrollMagic();

    perfectScroll();

    toggleBlanket();
    if(document.body.clientWidth < 760){
        $("#blanket_wrapper").hide();
        $("#blanket_wrapper").height($(window).height() - 60);
        $('#blanket').css({'max-height':$(window).height()-150+'px'});

    }

    contentHtml = $("#clear_confirm").html();


};

function toggleBlanket(){
    $("#blanket_toggle").bind("click",function(){
//    console.log("click");
//    console.log($("#blanket_wrapper"));
        $("#blanket_wrapper").toggle();
        $(this).toggleClass('blanket_open');
    });

}

function addInputListener(){
    $("#blanket_wrapper").on("click","#add",function(){

        //if(num_contain>=15){
        //    alert("股票列表最多只能存放15支股票!");
        //    return;
        //}

        blanketContent = $("#blanket_wrapper").html();
        $("#blanket_wrapper").html(
            '<div class="add_input_wrapper">'+
            '<input id="add_input" type="text" placeholder="搜索股票名字或id">'+
            '<img id="add_input_clear" src="resources/img/add.png">'+
            '</div>'+
            '<h6>点击搜索结果添加至对比列表中</h6>'+
            '<ul class="add_result_wrapper">'+
            '</ul>'
        );
        $('#add_input').focus();
        add_search("");
    }).on("click","#add_input_clear",function(){
        $("#blanket_wrapper").html(blanketContent);
        //blanketLinstener();
        //clear();
    }).on("click",".add_result_wrapper li",function(){
        $("#blanket_wrapper").html(blanketContent);
        var blanket = document.querySelector("#blanket");
        Ps.destroy(blanket);
        $(".ps-scrollbar-x-rail").remove();
        $(".ps-scrollbar-y-rail").remove();
        addStockDiv($(this).find("span").html(), $(this).find("h5").html());
        blanket = document.querySelector("#blanket");
        Ps.initialize(blanket);
    });

    $("#blanket_wrapper").on("input propertychange","#add_input",function(){
        var searchContent = $(this).val();
        add_search(searchContent);
    });
}

function add_search(search){
    var searchResult = '';
    var resultNum = 0;
    var tempId;
    var tempName;
    for(var i = 0;i < stockList.length && resultNum < 10;i++){
        tempId = stockList[i].id+"";
        tempName = stockList[i].name+"";
        if(tempId.indexOf(search) != -1 || tempName.indexOf(search) != -1){
            searchResult +='<li><h5>'+tempName+'</h5><span>'+tempId+'</span></li>';
            resultNum ++;
        }
    }
    $(".add_result_wrapper").html(searchResult);
}

function perfectScroll(){
//    if(!mq700.matches){
        var blanket = document.querySelector("#blanket");
        Ps.initialize(blanket,{
            suppressScrollX:'true'
        });
//    }
}

function blanketLinstener(){
    $("#blanket_wrapper").on("click",".see",function(){
        if($(this).hasClass("hide")){
            if(num_display > 3){
                alert("对比股票只能小于等于四只！");
            }else{
                //如果在展示中的股票只数小于四只，给出股票id，调图表相应接口
                num_display++;
                $(this).removeClass("hide");
                $(this.parentNode).addClass("display");
                //console.log($(this.parentNode).find("h3").html());

                var stockid = $(this.parentNode).find("h3").html();
                var i;
                for(i=0;i<hideStocksData.length;i++){
                    if(hideStocksData[i].id==stockid){
                        break;
                    }
                }
                if(i>=hideStocksData.length){
                    $.ajax({
                        type: "GET",
                        url: path+"/compare/compareData.do?id="+stockid,
                        dataType: "json",
                        success: function(data) {
                            displayedStocksData.push(data.data);
                            generateChartsData();
                            validateCharts();
                        },
                        error: function() {
                            console.log("compare data request error");
                        }
                    });
                }else{
                    displayedStocksData.push(hideStocksData[i]);
                    hideStocksData.splice(i, 1);
                    generateChartsData();
                    validateCharts();
                }
            }
        }else{
            //展示列表中删除这只股票
            num_display--;
            $(this).addClass("hide");
            $(this.parentNode).removeClass("display");

            var stockid = $(this.parentNode).find("h3").html();
            var i;
            for(i=0;i<displayedStocksData.length;i++){
                if(displayedStocksData[i].id==stockid){
                    break;
                }
            }
            if(i>=displayedStocksData.length){

            }else{
                hideStocksData.push(displayedStocksData[i]);
                displayedStocksData.splice(i, 1);
            }
            generateChartsData();
            validateCharts();
        }

    }).on("click",".delete",function(){

        var stockid = $(this.parentNode).find("h3").html();
        var i;
        for(i=0;i<displayedStocksData.length;i++){
            if(displayedStocksData[i].id==stockid){
                displayedStocksData.splice(i, 1);
                break;
            }
        }
        for(i=0;i<hideStocksData.length;i++){
            if(hideStocksData[i].id==stockid){
                hideStocksData.splice(i, 1);
                break;
            }
        }

        deleteCompareStock(stockid);

        num_display--;
        //num_contain--;
        //不管怎样，都在blanket中删除这个股票
        $(this.parentNode).remove();

        generateChartsData();
        validateCharts();
    });
}

var contentHtml;

function clear(){
    $("#blanket_wrapper").on("click", "#clear", function() {
        $("#clear").hide();
        $("#clear_confirm").show();
        $("#clear_confirm").html(contentHtml);

        TweenLite.fromTo($("#clear_confirm"), 0.3, {css:{"margin": "10px auto 5px 30px", "width": "150px",
        "height": "35px"}}, {css:{"margin": "10px 0 0 0", "width": "100%", height: "70px"}});
    }).on("click","#clear_ok",function(){
        $("#blanket").html("");
        //清空图表
        displayedStocksData = [];
        hideStocksData = [];

        validateCharts();

        $.cookie('compareStock', null, {
            expires: -1,
            path: '/'
        });

        $("#clear").show();
        $("#clear_confirm").hide();
    }).on("click","#clear_cancel",function(){
        contentHtml = $("#clear_confirm").html();
        $("#clear_confirm").html("");
        TweenLite.fromTo($("#clear_confirm"), 0.3, {css:{"margin": "10px 0 0 0", "width": "100%", height: "70px"}}
            ,{css:{"margin": "10px auto 5px 40px", "width": "120px", "height": "35px"}, onComplete: function() {
                $("#clear_confirm").hide();
                $("#clear").show();
            }});
    }).on("mouseleave","#clear_confirm",function(){
        $("#clear").show();
        $("#clear_confirm").hide();
    });
}

function addStockDiv(id, name) {
    var ids = $("#blanket li div h3");
    if(ids!=undefined){
        for(var i=0;i<ids.length;i++){
            if($(ids[i]).html()==id){
                return;
            }
        }
    }
    if(id==undefined) return;
    $("#blanket").prepend(
        '<li class="stock_blanket_item">'+
        '<div class="see hide"></div>'+
        '<div class="stock_info">'+
        '<h2>'+name+'</h2>'+
        '<h3>'+id+'</h3>'+
        '</div>'+
        '<img class="delete" src="resources/img/delete.png">'+
        '</li>');

    addCompareStock(id);

    //num_contain++;
}

function scrollMagic(){
    if(!mq700.matches){
        var controller = new ScrollMagic.Controller();

        var pinBlanket = new ScrollMagic.Scene()
            .addTo(controller)
            .setPin("#blanket_wrapper");
    }
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

        if(result.length>15){
            result.shift();
        }

        result.push(id);
    }else{
        result = [id];
    }
    $.cookie('compareStock', result.join(','), {
        path: '/'
    });
    console.log($.cookie('compareStock'));
}

function deleteCompareStock(id) {
    var tmp = $.cookie('compareStock');
    if(tmp==undefined) return;
    var stocks = tmp.split(",");
    for(var i=0;i<stocks.length;i++){
        if(stocks[i]==id){
            stocks.splice(i, 1);
            break;
        }
    }
    if(stocks.length==0){
        $.cookie('compareStock', null, {
            expires: -1,
            path: '/'
        });
    }else{
        $.cookie('compareStock', stocks.join(","), {
            path: '/'
        });
    }
}

/////////////////======================================================
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

var radarData = [{
    key: "后复权价"
}, {
    key: "换手率"
}, {
    key: "市盈率"
}, {
    key: "市净率"
}, {
    key: "量比"
}];

var futureData = [];
var MACDData = [];
var volumeData = [];
var totalMoneyData = [];
var RSIData = [];
var KDJData = [];
var bollData = [];

var radarChart;
var futureChart;
var MACDChart;
var RSIChart;
var KDJChart;
var bollChart;

var colors = ["rgb(156,122,186)", "#ffff66", "#99cc66", "#55bbee", "#2A0CD0", "#CD0D74", "#CC0000", "#00CC00", "#0000CC", "#DDDDDD", "#999999", "#333333", "#990000"];

AmCharts.ready(function() {
    AmCharts.theme = AmCharts.themes.dark;

    //initCompareStock();

    initRadarChart();
    initFutureChart();
    initMACDChart();
    initKDJChart();
    initRSIChart();
    initBollChart();
});

/****************************************
 * 图表数据的转换
 * */
function validateCharts() {
    initRadarChart();
    initFutureChart();
    initKDJChart();
    initRSIChart();
    initMACDChart();
    initBollChart();
}
function generateChartsData() {

    if(displayedStocksData.length==0) return;

    radarData = [{
        key: "委比"
    }, {
        key: "涨跌幅"
    }, {
        key: "市净率"
    }, {
        key: "市盈率"
    }, {
        key: "量比"
    }];
    futureData = [];
    MACDData = [];
    volumeData = [];
    totalMoneyData = [];
    RSIData = [];
    KDJData = [];
    bollData = [];

    var i, j;
    for(i=0;i<displayedStocksData.length;i++){
        radarData[0][displayedStocksData[i].id] = displayedStocksData[i].stockGradeVO.weibiAssess;
        radarData[1][displayedStocksData[i].id] = displayedStocksData[i].stockGradeVO.updownAssess;
        radarData[2][displayedStocksData[i].id] = displayedStocksData[i].stockGradeVO.peAssess;
        radarData[3][displayedStocksData[i].id] = displayedStocksData[i].stockGradeVO.pbAssess;
        radarData[4][displayedStocksData[i].id] = displayedStocksData[i].stockGradeVO.volumeAssess;
    }
    var length = displayedStocksData[0].tabTablesDatas.length;
    for(i=0;i<length;i++){
        var date = displayedStocksData[0].tabTablesDatas[i].date;

        //var futureJson = {"date": date};
        var MACDJson = {"date": date};
        var volumeJson = {"date": date};
        var totalMoneyJson = {"date": date};
        var RSIJson = {"date": date};
        var KDJJson = {"date": date};
        var bollJson = {"date": date};

        for(j=0;j<displayedStocksData.length;j++){
            var id = displayedStocksData[j].id;
            var otherData = displayedStocksData[j].tabTablesDatas;

            //futureJson[id] = otherData[i].future;
            MACDJson[id] = otherData[i].macd;
            volumeJson[id] = otherData[i].volume;
            totalMoneyJson[id] = otherData[i].amount;
            RSIJson[id] = otherData[i].rsi12;
            KDJJson[id] = otherData[i].slowK;
            bollJson[id] = otherData[i].boll_middle;
        }

        //futureData.push(futureJson);
        MACDData.push(MACDJson);
        volumeData.push(volumeJson);
        totalMoneyData.push(totalMoneyJson);
        RSIData.push(RSIJson);
        KDJData.push(KDJJson);
        bollData.push(bollJson);
    }

    var today = new Date();

    var date_1 = new Date();
    date_1.setDate(today.getDate() + 1);
    var futureJson1 = {"date": date_1};
    for(j=0;j<displayedStocksData.length;j++){
        var id = displayedStocksData[j].id;
        var future = displayedStocksData[j].forecastData;
        futureJson1[id] = future.close_middle_fst;
    }
    futureData.push(futureJson1);

    length = displayedStocksData[0].forecastData.length;
    for(i=0;i<length;i++){
        var date = displayedStocksData[0].forecastData[i].date;

        var future = {"date": date};

        for(j=0;j<displayedStocksData.length;j++){
            var id = displayedStocksData[j].id;
            var futureJson = displayedStocksData[j].forecastData;

            future[id] = futureJson[i].price_middle;
        }

        futureData.push(future);
    }
}

function initRadarChart() {
    radarChart = new AmCharts.AmRadarChart();
    radarChart.dataProvider = radarData;
    radarChart.categoryField = "key";
    radarChart.colors = colors;

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0.5;
    valueAxis.minimum = 0;
    valueAxis.dashLength = 3;
    valueAxis.axisTitleOffset = 20;
    valueAxis.gridCount = 5;
    radarChart.addValueAxis(valueAxis);

    for(var i=0;i<displayedStocksData.length;i++){
        var graph = new AmCharts.AmGraph();
        graph.title = displayedStocksData[i].name;
        graph.valueField = displayedStocksData[i].id;
        graph.bullet = "round";
        graph.balloonText = "score: [[value]]";
        radarChart.addGraph(graph);
    }

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "left";
    radarChart.legend = legend;

    // WRITE
    radarChart.write("compare_grade");
}

function initFutureChart() {
    futureChart = new AmCharts.AmSerialChart();
    futureChart.dataProvider = futureData;
    futureChart.categoryField = "date";
    futureChart.colors = colors;
    //bpForecastChart.dataDateFormat = "YYYY-MM-DD";

    var categoryAxis = futureChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = false;
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

    for(var i=0;i<displayedStocksData.length;i++){
        var axis = new AmCharts.ValueAxis();
        axis.offset = i*45;
        futureChart.addValueAxis(axis);

        var graph = new AmCharts.AmGraph();
        graph.type = "line";
        graph.title = displayedStocksData[i].name;
        graph.balloonText = displayedStocksData[i].name+": <b>[[value]]</b>";
        graph.valueAxis = axis;
        graph.valueField = displayedStocksData[i].id;
        graph.bullet = "round";
        futureChart.addGraph(graph);
    }

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    futureChart.legend = legend;

    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
    futureChart.addChartCursor(chartCursor);

    futureChart.write('compare_forecast');
}

function initMACDChart() {
    MACDChart = new AmCharts.AmSerialChart();
    MACDChart.dataProvider = MACDData;
    MACDChart.categoryField = "date";
    MACDChart.colors = colors;
    //MACDChart.dataDateFormat = "YYYY-MM-DD";

    var categoryAxis = MACDChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = false;
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

    var axis = new AmCharts.ValueAxis();
    axis.inside = true;
    MACDChart.addValueAxis(axis);

    for(var i=0;i<displayedStocksData.length;i++){
        var graph = new AmCharts.AmGraph();
        graph.type = "column";
        graph.valueAxis = axis;
        graph.title = displayedStocksData[i].name;
        graph.balloonText = displayedStocksData[i].name+": <b>[[value]]</b>";
        graph.valueField = displayedStocksData[i].id;
        graph.fillAlphas = 1;
        MACDChart.addGraph(graph);
    }

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    MACDChart.legend = legend;

    //var scrollbar = new AmCharts.ChartScrollbar();
    //scrollbar.graphType = "line";
    //MACDChart.addChartScrollbar(scrollbar);

    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
    MACDChart.addChartCursor(chartCursor);

    MACDChart.write('macd_graph');

    //zoomChart(MACDChart, MACDData);
}

function initRSIChart() {
    RSIChart = new AmCharts.AmSerialChart();
    RSIChart.dataProvider = RSIData;
    RSIChart.categoryField = "date";
    RSIChart.colors = colors;
    //RSIChart.dataDateFormat = "YYYY-MM-DD";

    var categoryAxis = RSIChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = false;
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

    var axis = new AmCharts.ValueAxis();
    axis.inside = true;
    RSIChart.addValueAxis(axis);

    for(var i=0;i<displayedStocksData.length;i++){
        var graph = new AmCharts.AmGraph();
        graph.type = "line";
        graph.valueAxis = axis;
        graph.title = displayedStocksData[i].name;
        graph.balloonText = displayedStocksData[i].name+": <b>[[value]]</b>";
        graph.valueField = displayedStocksData[i].id;
        graph.fillAlphas = 0;
        RSIChart.addGraph(graph);
    }

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    RSIChart.legend = legend;

    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
    RSIChart.addChartCursor(chartCursor);

    RSIChart.write('rsi_graph');
}

function initKDJChart() {
    KDJChart = new AmCharts.AmSerialChart();
    KDJChart.dataProvider = KDJData;
    KDJChart.categoryField = "date";
    KDJChart.colors = colors;
    //KDJChart.dataDateFormat = "YYYY-MM-DD";

    var categoryAxis = KDJChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = false;
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

    var axis = new AmCharts.ValueAxis();
    axis.inside = true;
    KDJChart.addValueAxis(axis);

    for(var i=0;i<displayedStocksData.length;i++){
        var graph = new AmCharts.AmGraph();
        graph.type = "line";
        graph.valueAxis = axis;
        graph.title = displayedStocksData[i].name;
        graph.balloonText = displayedStocksData[i].name+": <b>[[value]]</b>";
        graph.valueField = displayedStocksData[i].id;
        graph.fillAlphas = 0;
        KDJChart.addGraph(graph);
    }

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    KDJChart.legend = legend;

    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
    KDJChart.addChartCursor(chartCursor);

    KDJChart.write('kdj_graph');
}

function initBollChart() {
    bollChart = new AmCharts.AmSerialChart();
    bollChart.dataProvider = bollData;
    bollChart.categoryField = "date";
    bollChart.colors = colors;
    //bollChart.dataDateFormat = "YYYY-MM-DD";

    var categoryAxis = bollChart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.autoGridCount = false;
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

    for(var i=0;i<displayedStocksData.length;i++){
        var axis = new AmCharts.ValueAxis();
        axis.inside = true;
        axis.color = "rgba(255,255,255,0)";
        bollChart.addValueAxis(axis);

        var graph = new AmCharts.AmGraph();
        graph.type = "line";
        graph.valueAxis = axis;
        graph.title = displayedStocksData[i].name;
        graph.balloonText = displayedStocksData[i].name+": <b>[[value]]</b>";
        graph.valueField = displayedStocksData[i].id;
        graph.fillAlphas = 0;
        bollChart.addGraph(graph);
    }

    var legend = new AmCharts.AmLegend();
    legend.labelText = "[[title]]";
    legend.position = "top";
    bollChart.legend = legend;

    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
    bollChart.addChartCursor(chartCursor);

    bollChart.write('boll_graph');
}