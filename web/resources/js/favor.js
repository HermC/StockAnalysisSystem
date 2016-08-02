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
        location.reload();
    }
}, false);

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

window.onload = function(){
    initialHeader();
    unfavor();
    addToCompare();
    goToStock();

    AmCharts.theme = AmCharts.themes.dark;

    var i;
    for(i=0;i<hs300Data.length;i++){
        var date = new Date(hs300Data[i].date);
        hs300Data[i].date = date.Format("yyyy-MM-dd");
    }
    for(i=0;i<sh000001Data.length;i++){
        var date = new Date(sh000001Data[i].date);
        sh000001Data[i].date = date.Format("yyyy-MM-dd");
    }
    for(i=0;i<sz399001Data.length;i++){
        var date = new Date(sz399001Data[i].date);
        sz399001Data[i].date = date.Format("yyyy-MM-dd");
    }

    generateChart(hs300Data, 0);
    generateChart(sh000001Data, 1);
    generateChart(sz399001Data, 2);

    for(var i=0;i<fav.length;i++){
        generateChart(fav[i], i+3);
    }
};

function operationNotice(text,father,flag){
    $(father).find(".operation_alert p").html(text);
    $(father).find(".favor").hide();
    $(father).find(".add").hide();
    $(father).find(".operation_alert").show();

    setTimeout(function(){
        $(father).find(".operation_alert").hide();
        $(father).find(".favor").show();
        $(father).find(".add").show();
    },1200);
}

function goToStock() {
    $(".self_items").on("click", ".self_item_info", function() {
        var stockid = $(this).find(".stock_id").html();
        if(stockid=="sh000001"){
            window.open("bench.do?id=sh000001");
            return;
        }
        if(stockid=="hs300"){
            window.open("bench.do?id=hs300");
            return;
        }
        if(stockid=="sz399001"){
            window.open("bench.do?id=sz399001");
            return;
        };
        var url = "stock.do?id="+stockid;
        console.log(url);
        window.open(url);
    });
}

function unfavor(){
    $(".self_items").on("click",".favor",function(){
        var stockid = $(this.parentNode.parentNode).find(".stock_id").html();

        console.log(stockid);

        var tmp = $.cookie('favouriteStock');
        console.log(tmp);
        if(tmp==undefined){

        }else{
            var result = tmp.split(",");
            var i;
            for(i=0;i<result.length;i++){
                if(stockid==result[i]){
                    break;
                }
            }

            result.splice(i, 1);

            if(result.length==0){
                $.cookie('favouriteStock', null, {
                    expires: -1,
                    path: '/'
                })
            }else{
                $.cookie('favouriteStock', result.join(','), {
                    expires: 10,
                    path:'/'
                })
            }
        }
        $(this.parentNode.parentNode).remove();
    });
}

function addToCompare(){
    $(".self_items").on("click",".add",function(){
        var stockid = $(this.parentNode.parentNode).find(".stock_id").html();
        console.log(stockid);
        var tmp = $.cookie('compareStock');
        console.log(tmp);
        if(tmp==undefined){
            var result = [stockid];
            $.cookie('compareStock', result.join(','), {
                path: '/'
            })
        }else{
            var result = tmp.split(",");
            for(var i=0;i<result.length;i++){
                if(stockid==result[i]){
                    operationNotice("对比栏已有这只股票",this.parentNode.parentNode,0);
                    return;
                }
            }
            result.push(stockid);
            if(result.length>15){
                result.shift();
            }
            $.cookie('compareStock', result.join(','), {
                path: '/'
            })
        }
        operationNotice("成功添加至对比栏!",this.parentNode.parentNode,0);
    });
}

function generateChart(chartData, chartid) {
    var chart = new AmCharts.AmSerialChart();
    chart.showCategoryAxis = false;

    //future图表的全局设置
    chart.addClassNames = true;
    chart.title = "";
    chart.dataProvider = chartData;
    chart.categoryField = "date";
    chart.dataDateFormat = "YYYY-MM-DD";

    chart.autoMargins = false;
    chart.marginLeft = 0;
    chart.marginRight = 5;
    chart.marginTop = 0;
    chart.marginBottom = -1;

    var axis = new AmCharts.ValueAxis();
    axis.gridAlpha = 0;
    axis.axisAlpha = 0;

    chart.addValueAxis(axis);

    var categoryAxis = chart.categoryAxis;
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.autoGridCount = false;
    categoryAxis.gridAlpha = 0;
    categoryAxis.axisAlpha = 0;
    categoryAxis.startOnAxis = true;
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
    graph.valueAxis = axis;
    graph.type = "line";
    graph.valueField = "close";
    graph.showBullet = true;
    graph.bullet = "round";
    graph.bulletSize = 10;
    graph.balloonText = "日期: <b>[[date]]</b><br>开盘: <b>[[open]]</b> 收盘: <b>[[close]]</b><br>最高: <b>[[high]]</b> 最低: <b>[[low]]</b>";
    graph.useDataSetColors = false;
    chart.addGraph(graph);

    var cursor = new AmCharts.ChartCursor();
    //cursor.fullWidth = true;
    chart.chartCursor = cursor;

    chart.write("self_item_graph_"+chartid);
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