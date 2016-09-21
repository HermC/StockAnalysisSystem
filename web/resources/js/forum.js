/**
 * Created by Hermit on 16/9/11.
 */

window.onload = function() {
    initButton();

    search("");
};

function initButton() {
    $("#up_forum").on("click", function() {
        //window.location.href = "user/forum-editor.do";
        window.open("user/forum-editor.do");
    });
    $("#search_button").on("click", function() {
        var keyword = $("#keyword").val();
        //searchLocal(keyword);
        console.log("jfisdf");
        search(keyword);
    });
}

function search(keyword) {
    $.ajax({
        type: "get",
        url: "user/forum/search.do?keyword="+keyword,
        dataType: "html",
        success: function(data) {
            //console.log(data);
            $(".forum-list-wrapper").html($(data));
        },
        error: function() {
            console.log("搜索失败,请稍后再试");
        }
    });
}

function searchLocal(keyword) {
    if(keyword==undefined||keyword==null||keyword==""){
        var nodes = $(".forum-theme").parent();
        $(nodes).show();
        return;
    }

    var nodes = document.querySelectorAll(".forum-theme");
    for(var i=0;i<nodes.length;i++){
        if($(nodes[i]).val().indexOf(keyword)>0){
            $($(nodes[i]).parent()).show();
        }else{
            $($(nodes[i]).parent()).hide();
        }
    }
}