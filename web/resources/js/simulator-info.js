/**
 * Created by Hermit on 16/8/27.
 */

window.onload = function() {
    initStartStop();
}

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
                if(data.success=="true"){
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