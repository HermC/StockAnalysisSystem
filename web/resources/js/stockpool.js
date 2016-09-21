/**
 * Created by Hermit on 16/8/17.
 */
//var stock_pool_list = [{"stockpoolid": 1, "stockpoolname": "股票池1", "stocks": [{"stockid": "sh600000", "stockname": "浦发银行"}], "strategy": [{"strategyid": 1, "strategyname": "策略1", "starttime": "2016-08-21"}]},
//    {"stockpoolid": 2, "stockpoolname": "股票池2", "stocks": [{"stockid": "sh600000", "stockname": "浦发银行"}], "strategy": [{"strategyid": 2, "strategyname": "策略2", "starttime": "2016-08-21"}]}];
var item_list = document.querySelectorAll(".stockpool-item");
var delete_list = document.querySelectorAll(".delete-pool");
//var delete_confirm_list = document.querySelectorAll(".delete-pool-confirm");
var edit_stock_list = document.querySelectorAll(".edit-stock");
var edit_strategy_list = document.querySelectorAll(".edit-strategy");
var my_strategy_list = document.querySelectorAll("#my_strategy .add-strategy");

var tab_list = document.querySelectorAll(".selector-item");

var pool_operated;

function initElements() {
    item_list = document.querySelectorAll(".stockpool-item");
    delete_list = document.querySelectorAll(".delete-pool");
    //delete_confirm_list = document.querySelectorAll(".delete-pool-confirm");
    edit_stock_list = document.querySelectorAll(".edit-stock");
    edit_strategy_list = document.querySelectorAll(".edit-strategy");
    my_strategy_list = document.querySelectorAll("#my_strategy .add-strategy");
    //change_name_list = document.querySelectorAll(".change-name");
    tab_list = document.querySelectorAll(".selector-item");

    if(item_list!=undefined||item_list!=null){
        $(item_list[0]).show();
    }
}

function initOuter() {
    $(".stock-editor-outer").bind("click", function(e) {
        if(e.target==this){
            //$(this).hide();
            window.location.reload();
        }
    });
}

var delete_index = -1;
var pre_shown = 0;
function initDeletePoolListener() {
    $(".selector-item").on("click", function() {
        var index = -1;
        for(var i=0;i<tab_list.length;i++){
            if(this==tab_list[i]){
                index = i;
                break;
            }
        }
        console.log(index);
        console.log(item_list[pre_shown]);
        $(item_list[pre_shown]).hide();
        $(item_list[index]).show();
        $(tab_list[pre_shown]).removeClass("selected");
        $(tab_list[index]).addClass("selected");
        pre_shown = index;
    });
    $(".delete-pool").on("click", function() {
        var index = 0;
        for(var i=0;i<delete_list.length;i++){
            if(this==delete_list[i]){
                index = i;
                break;
            }
        }
        console.log(index);
        delete_index = index;
        var stockpoolid = stock_pool_list[index].poolId;
        $.ajax({
            type: "get",
            url: "user/stockpool/delete-stockpool.do?id="+stockpoolid,
            dataType: "json",
            success: function(data) {
                if(data["success"]==false){
                    alert("删除失败,请稍后再试");
                }else{
                    //$(item_list[index]).remove();
                    //stock_pool_list.splice(delete_index, 1);
                    window.location.reload();
                }
            },
            error: function() {
                alert("删除失败,请稍后再试");
            }
        });
        //$(this).hide();
        //$(delete_confirm_list[index]).slideDown();
    });
//    $(".delete-pool-confirm").on("click", ".confirm-yes", function() {
//        var index = 0;
//        for(var i=0;i<delete_confirm_list.length;i++){
//            if(this.parentNode==delete_confirm_list[i]){
//                index = i;
//                break;
//            }
//        }
////        console.log("confirm-yes:"+index);
//        delete_index = index;
//        var stockpoolid = stock_pool_list[index].poolId;
//        $.ajax({
//            type: "get",
//            url: "user/stockpool/delete-stockpool.do?id="+stockpoolid,
//            dataType: "json",
//            success: function(data) {
//                if(data["success"]==false){
//                    alert("删除失败,请稍后再试");
//                }else{
//                    $(item_list[index]).remove();
//                    stock_pool_list.splice(delete_index, 1);
//                }
//            },
//            error: function() {
//                alert("删除失败,请稍后再试");
//            }
//        });
//    });
//    $(".delete-pool-confirm").on("click", ".confirm-no", function() {
//        var index = 0;
//        for(var i=0;i<delete_confirm_list.length;i++){
//            if(this.parentNode==delete_confirm_list[i]){
//                index = i;
//                break;
//            }
//        }
//        $(this.parentNode).hide();
//        $(delete_list[index]).show();
//    });
}

function initEditStockListener() {
    $(".edit-stock").on("click", function() {
        var index = 0;
        for(var i=0;i<edit_stock_list.length;i++){
            if(this==edit_stock_list[i]){
                index = i;
                break;
            }
        }
        console.log(index);
        var scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        showStockEditor(index, scrollTop);
    });
    $("#stock_search").on("focus", function() {
        $(this).val("");
    });
    $("#stock_search").bind("input propertychange", function() {
        var search_content = $(this).val();
        $("#stock_search_info").show();
        search(search_content);
    });
    $("#stock_editor .stock-editor-wrapper").bind("click", function(e) {
        if(e.target!=document.getElementById("stock_search_info")){
            $("#stock_search_info").hide();
        }
    });
}

var newStrategyIsOpen = false;
function initEditStrategyListener() {
    $(".edit-strategy").on("click", function() {
        var index = 0;
        for(var i=0;i<edit_strategy_list.length;i++){
            if(this==edit_strategy_list[i]){
                index = i;
                break;
            }
        }
//        console.log(index);
        var scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        showStrategyEditor(index, scrollTop);
    });
    $("#add_new_strategy").on("click", function() {
        if(!newStrategyIsOpen){
            $(this).html("<i class='fa fa-close'></i> 取消新增");
            $("#new_strategy").slideDown();
            newStrategyIsOpen = true;
        }else{
            $(this).html("<i class='fa fa-plus'></i> 新增策略");
            $("#new_strategy").hide();
            newStrategyIsOpen = false;
        }
    });
    $("#my_strategy .add-strategy").on("click", function() {
        var index = 0;
        for(var i=0;i<my_strategy_list.length;i++){
            if(this==my_strategy_list[i]){
                index = i;
                break;
            }
        }
        console.log(index);
    });
}

//var change_name_list;
//function initChangeNameListener() {
//    $(".change-name").on("click", function() {
//        // var index = -1;
//        // for(var i=0;i<change_name_list.length;i++){
//        //
//        // }
//        $(this).hide();
//        $($(this.parentNode).find(".change-name-input")).show();
//        $($(this.parentNode).find(".change-name-input")).focus();
//    });
//    $(".change-name-input").on("blur", function() {
//        var index = -1;
//        for(var i=0;i<change_name_list.length;i++){
//            if(this==change_name_list[i]){
//                index = i;
//                break;
//            }
//        }
//
//        var id = stock_pool_list[index].poolId;
//        var name = $(this).val();
//
//        $.ajax({
//            type: "get",
//            url: "user/stockpool/update-name.do?id="+id+"&name="+name,
//            dataType: "json",
//            success: function(data) {
//                $(this).hide();
//                $($(this.parentNode).find(".change-name")).html($(this).val());
//                $($(this.parentNode).find(".change-name")).show();
//            },
//            error: function() {
//                alert("修改失败,请稍后再试");
//            }
//        });
//    })
//}

function initAddStockPoolListener() {
    $("#add_stock_pool").on("click", function() {
        $(".add-stockpool").slideDown();
    });
    $("#cancel_new_stockpool").on("click", function() {
        $(".add-stockpool").hide();
    });
    $("#confirm_new_stockpool").on("click", function() {
        var name = $("#new_stockpool_name").val();
        console.log(name);
        if(name==undefined||name==null||name==""){
            $("#new_stockpool_name").val("请输入一个名称");
            return;
        }
        $.ajax({
            type: "get",
            url: "user/stockpool/add-new-stockpool.do?name="+name,
            dataType: "json",
            success: function(data) {
                //console.log(data);
                //var new_stock_pool = data.newStockPool;
                ////console.log(data);
                //$(".add-stockpool").hide();
                if(data.success==true){
                    window.location.reload();
                }
            },
            error: function() {
                alert("添加失败,请稍后再试");
            }
        })
    });
}


var delete_stock_list;
function showStockEditor(index, offsetTop) {
    console.log(index);
    pool_operated = index;
    var stock_pool = stock_pool_list[index];
    var stocks = stock_pool.stockinfolist;
    $("#stock_editor .stock-editor-wrapper").css("margin-top", (offsetTop+80)+"px");
    $("#stock_editor .stock-editor-wrapper h2").html("<strong>#"+stock_pool.poolId+"</strong> "+stock_pool.poolName+"");
    $("#stock_in_pool").html("");
    for(var i=0;i<stocks.length;i++){
        var stock = stocks[i];
        $("#stock_in_pool").append("" +
            "<div class='column'>" +
            "   <i class='fa fa-close column-item u1of10 delete-stock'></i><span class='column-item'>"+stock.stockid+"</span><span class='column-item'>"+stock.stockname+"</span>" +
            "</div>");
    }
    deleteStockListener();
    $("#stock_editor").show();
}

var delete_strategy_list;
function showStrategyEditor(index, offsetTop) {
    var stock_pool = stock_pool_list[index];
    var strategys = stock_pool.strategy;
    console.log(strategys);
    $("#strategy_editor .stock-editor-wrapper").css("margin-top", (offsetTop+80)+"px");
    $("#strategy_editor .stock-editor-wrapper h2").html("<strong>#"+stock_pool.stockpoolid+"</strong> "+stock_pool.stockpoolname+"");
    $("#strategy_running").html("");
    for(var i=0;i<strategys.length;i++){
        var strategy = strategys[i];
        $("#strategy_running").append("" +
            "<div class='column'>" +
            "   <i class='fa fa-close column-item u1of10 delete-strategy'></i>" +
            "<span class='column-item'>"+strategy.strategyid+"</span>" +
            "<span class='column-item'>"+strategy.strategyname+"</span>" +
            "<span class='column-item'>"+strategy.starttime+"</span> " +
            "</div>")
    }
    delete_strategy_list = document.querySelectorAll("#strategy_running .delete-strategy");
    $("#strategy_running .delete-strategy").on("click", function() {
        var index = -1;
        for(var i=0;i<delete_strategy_list.length;i++){
            if(this==delete_strategy_list[i]){
                index = i;
                break;
            }
        }
        console.log(index);
    });
    $("#strategy_editor").show();
}

function search(search) {
    console.log(search);
    var tempId;;
    var tempName;
    var resultNum = 0;
    $("#stock_search_info").html("");
    for(var i = 0;i < stockList.length && resultNum < 10;i++){
        tempId = stockList[i].id+"";
        tempName = stockList[i].name+"";
        if(tempId.indexOf(search) != -1 || tempName.indexOf(search) != -1){
            $("#stock_search_info").append("" +
                "<div class='column' onclick='addNewStock(\""+tempId+"\", \""+tempName+"\")'>" +
                "   <span class='column-item'>"+tempId+"</span><span class='column-item'>"+tempName+"</span>" +
                "</div>");
            resultNum++;
        }
    }
//    for(var i=0;i<10;i++){
//        $("#stock_search_info").append("" +
//            "<div class='column' onclick='addNewStock(\""+search+"\")''>" +
//            "   <span class='column-item'>"+tempId+"</span><span class='column-item'>"+search+"</span>" +
//            "</div>");
//    }
//    $("")
}

var global_stockid;
var global_stockname;
function addNewStock(stockid, stockname) {
    global_stockid = stockid;
    global_stockname = stockname;

    if(stockid==undefined||stockid==null||stockid==""){
        return;
    }

    var list = $("#stock_in_pool .column .column-item");
    for(var i=0;i<list.length;i++){
        if($(list[i]).html()==stockid){
            return;
        }
    }

    var stockpool = stock_pool_list[pool_operated];
    if(stockpool==undefined||stockpool==null||stockpool==""){
        return;
    }

    var stockpoolid = stockpool.poolId;
    var data = "id="+stockpoolid+"&stockid="+stockid;

    $.ajax({
        type: "post",
        url: "user/stockpool/add-stock.do",
        async: false,
        data: data,
        dataType: "json",
        success: function(data) {
            console.log(data);

            addNewStockDiv(global_stockid, global_stockname);
        },
        error: function() {
            alert("添加股票失败,请稍后再试");
        }
    });

}

function addNewStockDiv(stockid, stockname) {
    var list = $("#stock_in_pool .column .column-item");
    for(var i=0;i<list.length;i++){
        if($(list[i]).html()==stockid){
            return;
        }
    }

    $("#stock_in_pool").append("" +
        "<div class='column'>" +
        "   <i class='fa fa-close column-item u1of10 delete-stock'></i>" +
        "   <span class='column-item'>"+stockid+"</span>" +
        "   <span class='column-item'>"+stockname+"</span>" +
        "</div>");
    //var table = $(item_list[pool_operated]).find(".stock-table table");
    //var table_items = $(table).find("tr");
    //if(table_items.length%2==0){
    //    $(table).append("" +
    //        "<tr class='odd'>" +
    //        "   <td>"+stockid+"</td>" +
    //        "   <td>"+stockid+"</td>" +
    //        "   <td>"+stockid+"</td>" +
    //        "</tr>");
    //}else{
    //    $(table).append("" +
    //        "<tr class='even'>" +
    //        "   <td>"+stockid+"</td>" +
    //        "   <td>"+stockid+"</td>" +
    //        "   <td>"+stockid+"</td>" +
    //        "</tr>");
    //}

    deleteStockListener();
}

var global_delete_stock_index;
function deleteStockListener() {
    $("#stock_in_pool .delete-stock").off("click");
    delete_stock_list = document.querySelectorAll("#stock_in_pool .delete-stock");
    $("#stock_in_pool .delete-stock").on("click", function() {
        var index = -1;
        for(var i=0;i<delete_stock_list.length;i++){
            if(this==delete_stock_list[i]){
                index = i;
                break;
            }
        }
        //console.log(index);
        //deleteStock(index);
        if(index==-1){
            return;
        }

        global_delete_stock_index = index;

        var stockpool = stock_pool_list[pool_operated];
        if(stockpool==undefined||stockpool==null||stockpool==""){
            return;
        }

        var stockpoolid = stockpool.stockpoolid;
        var stocks = stockpool.stockinfolist;
        var stockid = stocks[index].stockid;

        stockpoolid = "";

        var data = "id="+stockpoolid+"&stockid="+stockid;

        console.log(data);

        $.ajax({
            type: "post",
            url: "user/stockpool/delete-stock.do",
            data: data,
            dataType: "json",
            success: function(data) {
                console.log(data);
                deleteStock(global_delete_stock_index);
            },
            error: function() {
                alert("删除失败,请稍后再试");
            }
        })
    });
}

function deleteStock(index) {
    console.log("delete"+index);
    //$("#stock_in_pool")
    var list = document.querySelectorAll("#stock_in_pool .column");
    $(list[index]).remove();
    var table = $(item_list[pool_operated]).find(".stock-table table");
    var table_items = $(table).find("tr");
    $(table_items[index]).remove();
    for(var i=0;i<table_items.length;i++){
        $(table_items[i]).removeClass("even");
        $(table_items[i]).removeClass("odd");
        if(i%2==0){
            $(table_items[i]).addClass("even");
        }else{
            $(table_items[i]).addClass("odd");
        }
    }
}

window.onload = function() {
    initElements();
    initOuter();
    initDeletePoolListener();
    initEditStockListener();
    initEditStrategyListener();
    //initChangeNameListener();
    initAddStockPoolListener();
};