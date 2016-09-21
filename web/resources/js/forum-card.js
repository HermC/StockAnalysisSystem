/**
 * Created by Hermit on 16/9/11.
 */

window.onload = function() {
    reply_button_list = document.querySelectorAll(".reply-button");

    initReplyButton();
};

var reply_button_list;
function initReplyButton() {
    $(".reply-button").on("click", function() {
        var index = -1;
        for(var i=0;i<reply_button_list.length;i++){
            if(this==reply_button_list[i]){
                index = i;
                break;
            }
        }

        var scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        //console.log(index);

        isTopic = false;
        var reply = topicInfo.replyPos[index];
        id_reply = reply.replyid;
        var name = reply.username;
        showReplyEditor(name, scrollTop);
    });
    $(".reply-editor-container").bind("click", function(e) {
        if(e.target==this){
            $(this).hide();
            //window.location.reload();
        }
    });
    $("#reply_topic").on("click", function() {
        var scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);

        isTopic = true;
        id_reply = topicInfo.topicid;
        var name = topicInfo.username;
        showReplyEditor(name, scrollTop);
    });
    $("#upload_reply").on("click", function() {
        var content = $("#reply_content").val();
        content = content.replace(/"/g, "\\\"");

        var topic_id = topicInfo.topicid;

        var data = "isTopic="+isTopic+"&content="+content+""+"&topic_id="+topic_id+"&reply_id="+id_reply;

        console.log(data);

        $.ajax({
            type: "post",
            url: "user/forum/update-reply.do",
            data: data,
            dataType: "json",
            success: function(data) {
                //console.log(data);
                window.location.reload();
            },
            error: function(){

            }
        });
    });
}

var isTopic = true;
var id_reply;
function showReplyEditor(id, offsetTop) {
    //id_reply = id;
    $("#reply_id").html("#"+id);
    $(".reply-editor-wrapper").css("margin-top", (offsetTop+150)+"px");
    $("#reply_content").val("");
    $(".reply-editor-container").show();
}