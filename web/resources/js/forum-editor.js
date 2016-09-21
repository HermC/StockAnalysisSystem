/**
 * Created by Hermit on 16/9/11.
 */

window.onload = function() {
    initEditor();
    initButton();
};

function initEditor() {
    $('#trumbowyg-editor').trumbowyg({
        fullscreenable: false,
        closeable: false,
        btns: ['btnGrp-semantic',
            '|', 'btnGrp-justify',
            '|', 'horizontalRule']
    });
}

function initButton() {
    $("#upload").on("click", function() {
        var title = $("#theme").val();
        if(title==undefined||title==null||title==""){
            alert("主题不能为空");
            return;
        }

        title = title.replace(/"/g, "\\\"");

        var data = "content="+$("#trumbowyg-editor").val()+"&title="+title;
        data = data.replace(/"/g, "\\\"");

        $.ajax({
            type: "post",
            url: "user/forum/update-card.do",
            data: data,
            dataType: "json",
            success: function(data) {
                console.log(data);
                window.location.href = "user/forum-list.do";
            },
            error: function() {
                alert("发布失败,请稍后再试");
            }
        });
    });
}

