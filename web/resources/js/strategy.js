/**
 * Created by Hermit on 16/8/27.
 */
var delete_strategy_list;
var strategy_list;

function initButtonListener() {
    $(".strategy-list .delete-strategy").on("click", function() {
        var index = -1;
        for(var i=0;i<delete_strategy_list.length;i++){
            if(this==delete_strategy_list[i]){
                index = i;
                break;
            }
        }
        console.log(index);
        var strategy_id = strategy_list_data[index].strategyid;
        $.ajax({
            type: "get",
            url: "user/strategy/delete-strategy.do?strategy_id="+strategy_id,
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.success==true){
                    window.location.reload();
                }else{
                    alert("删除失败,请稍后再试");
                }
            },
            error: function() {
                alert("删除失败,请稍后再试");
            }
        });
    });
    $(".strategy-item .strategy-info").bind("click", function(e) {
        var index = -1;
        for(var i=0;i<strategy_list.length;i++){
            if(this==strategy_list[i]){
                index = i;
                break;
            }
        }
        window.open("user/strategy-editor.do?strategy_id="+strategy_list_data[index].strategyid);
    });
    $("#add_new_strategy").on("click", function() {
        window.open("user/strategy-editor.do?isNew=true");
    });
}

window.onload = function() {
    delete_strategy_list = document.querySelectorAll(".delete-strategy");
    strategy_list = document.querySelectorAll(".strategy-item .strategy-info");

    initButtonListener();
};