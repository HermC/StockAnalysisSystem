/**
 * Created by Hermit on 16/8/26.
 */
var selected;
var delete_simulator_list;

window.onload = function() {
    selected = $(".selected");
    delete_simulator_list = document.querySelectorAll(".delete-simulator");
    simulator_list = document.querySelectorAll(".simulator-name");

    initButtonListener();
    initDateListener();
    initSimulatorListener();
};

function initButtonListener() {
    $(".selector-item").on("click", function() {
        $(selected).removeClass("selected");
        selected = this;
        $(this).addClass("selected");

        var state = $(this).html();
        var running = $(".is-running").parent();
        var stopped = $(".is-stopped").parent();
        if(state=="全部"){
            $(running.parent()).show();
            $(stopped.parent()).show();
        }else if(state=="进行中"){
            $(running.parent()).show();
            $(stopped.parent()).hide();
        }else if(state=="已结束"){
            $(running.parent()).hide();
            $(stopped.parent()).show();
        }
    });
    $(".simulator-list .delete-simulator").on("click", function() {
        var index = -1;
        for(var i=0;i<delete_simulator_list.length;i++){
            if(this==delete_simulator_list[i]){
                index = i;
                break;
            }
        }
        //console.log(index);
        var simulator_id = simulator_list_data[index].tradeid;
        $.ajax({
            type: "get",
            url: "user/simulator/delete-simulator.do?id="+simulator_id,
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.success==true){
                    window.location.reload();
                }
            },
            error: function() {
                alert("删除失败,请稍后再试");
            }
        });
    });
    $("#add_new_simulator_button").on("click", function() {
        $(".add-new-simulator-wrapper").slideDown();
    });
    $("#add_cancel").on("click", function() {
        $(".add-new-simulator-wrapper").hide();
    });
    $("#add_confirm").on("click", function() {
        var name = $("#simulator_name").val();
        if(name==undefined||name==null||name==""){
            $("#simulator_name").val("请输入一个名称");
            return;
        }

        var use_strategy = $("#strategy_selection").val();
        if(use_strategy==undefined||use_strategy==null||use_strategy==""){
            alert("请选择一个策略!");
            return;
        }

        var start_amount = $("#start_amount").val();
        if(isNaN(start_amount)){
            alert("资金必须是数字!");
            return;
        }

        var start_time = $("#start_date").val();
        console.log(start_time);
        if(start_time==undefined||start_time==null||start_time==""){
            alert("请选择开始时间!");
            return;
        }

        var pool = $("#stockpool_selection").val();
        if(pool==undefined||pool==null||pool==""){
            alert("请选择股票池!");
            return;
        }

        var result = "name="+name+"&strategy="+use_strategy+"&start_amount="+start_amount+"&start_time="+start_time+"&pool="+pool;

        $.ajax({
            type: "post",
            url: "user/simulator/add-new-simulator.do",
            data: result,
            dataType: "json",
            success: function(data) {
                console.log(data);
                window.location.reload();
            },
            error: function() {
                alert("添加失败,请稍后再试");
            }
        });
    });
}

var simulator_list;
function initSimulatorListener() {
    //$(".simulator-list").on("click", function() {
    //    var index = -1;
    //    for(var i=0;i<simulator_list.length;i++){
    //        if(this==simulator_list[i]){
    //            index = i;
    //            break;
    //        }
    //    }
    //    console.log(index);
    //});
}

function initDateListener() {
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: "month"
    });
    $("#start_date").datetimepicker("setStartDate", getNowFormatDate());
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}