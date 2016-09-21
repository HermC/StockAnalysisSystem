/**
 * Created by Hermit on 16/8/16.
 */
var isEdit = false;
var jcropApi;

function initListener() {
    $("#user_info_edit").on("click", function() {
        if(!isEdit){
            $(".edit-container").slideDown(1000);
            $(this).removeClass("fa-pencil");
            $(this).addClass("fa-remove");
            isEdit = true;
        }else{
            $(".edit-container").hide();
            $(this).removeClass("fa-remove");
            $(this).addClass("fa-pencil");
            isEdit = false;
        }
    });
    $("#change_img").on("change", function() {
        if(jcropApi!=undefined){
            jcropApi.destroy();
        }

        var f = document.getElementById("change_img").files[0];
        var src = window.URL.createObjectURL(f);
        $("#view_img").css({
            width: "auto",
            height: "auto"
        });
        $("#view_img").attr("src", src);
        $("#cut_img").attr("src", src);
        $("#view_img").Jcrop({
            aspectRatio: 1,
            onSelect: function() {
                var imgScale = jcropApi.tellScaled();
                var imgWH = jcropApi.getWidgetSize();
                $("#x").val(imgScale.x);
                $("#y").val(imgScale.y);
                $("#w").val(imgScale.w);
                $("#h").val(imgScale.h);
                $("#realW").val(imgWH[0]);
                $("#realH").val(imgWH[1]);
                var option = {
                    url: "user/cutimg.do",
                    cache: false,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        var url = data.url+"?rnd="+Math.random();
                        console.log(url);
                        $("#cut_img").attr("src", url);
                    }
                };
                console.log(option);
                $("#img_form").ajaxSubmit(option);
            }
        }, function(){
            jcropApi = this;
            var imgWH = jcropApi.getWidgetSize();
            jcropApi.animateTo([0, 0, imgWH[0], imgWH[1]]);
        });
    });
    $("#choose_file").on("click", function() {
        $("#change_img").click();
    });
    $("#confirm_file").on("click", function() {
        var file = $("#change_img").val();
        if(file==undefined||file==null||file==""){
            $("#file_state").html("请选择一个文件");
            return;
        }
        $.ajax({
            type: "GET",
            url: "user/changeimg.do",
            dataType: "json",
            success: function(data) {

            },
            error: function() {
                $("#file_state").addClass("change-failed");
                $("#file_state").html("更改失败");
            },
            complete: function() {
                if(jcropApi!=undefined){
                    jcropApi.destroy();
                }
                $("#view_img").attr("src", "");
                $("#view_img").css({
                    width: 0,
                    height: 0
                });
                $("#cut_img").attr("src", "");
                $("#change_img").val("");
            }
        });
    });
    $("#confirm_nick_name").on("click", function() {
        var nick_name = document.nick_name_form.nick_name.value;
        if(nick_name==undefined||nick_name==null||nick_name==""){
            $("#nick_name_state").removeClass("change-success");
            $("#nick_name_state").addClass("change-failed");
            $("#nick_name_state").html("昵称不能为空");
            return;
        }
        $.ajax({
            type:"GET",
            url: "user/changenickname.do",
            dataType: "json",
            success: function(data) {
                $("#nick_name_state").removeClass("change-failed");
                $("#nick_name_state").addClass("change-success");
                $("#nick_name_state").html("更改成功");
                $(".user-nickname").html(data.nick_name);
            },
            error: function() {
                $("#nick_name_state").removeClass("change-success");
                $("#nick_name_state").addClass("change-failed");
                $("#nick_name_state").html("更改失败");
            }
        });
    });
    $("#confirm_password").on("click", function() {
        var old_password = document.password_form.old_password.value;
        var new_password = document.password_form.new_password.value;
        var confirm_password = document.password_form.confirm_password.value;

        if(old_password==undefined||old_password==null||old_password==""){
            $("#password_state").removeClass("change-success");
            $("#password_state").addClass("change-failed");
            $("#password_state").html("旧密码不能为空");
            return;
        }
        if(new_password==undefined||new_password==null||new_password==""){
            $("#password_state").removeClass("change-success");
            $("#password_state").addClass("change-failed");
            $("#password_state").html("新密码不能为空");
            return;
        }
        if(confirm_password!=new_password){
            $("#password_state").removeClass("change-success");
            $("#password_state").addClass("change-failed");
            $("#password_state").html("两次输入的密码不同");
            return;
        }

        $.ajax({
            type: "POST",
            url: "user/changepassword.do",
            data: $("#password_form").serialize(),
            dataType: "json",
            success: function(data) {
                var state = data.state;
                console.log(data);
                if(data.success==true){
                    $("#password_state").removeClass("change-failed");
                    $("#password_state").addClass("change-success");
                    $("#password_state").html(state);
                }else{
                    $("#password_state").removeClass("change-success");
                    $("#password_state").addClass("change-failed");
                    $("#password_state").html(state);
                }
            },
            error: function() {
                $("#password_state").removeClass("change-success");
                $("#password_state").addClass("change-failed");
                $("#password_state").html("修改失败");
            },
            complete: function() {
                document.password_form.old_password.value = "";
                document.password_form.new_password.value = "";
                document.password_form.confirm_password.value = "";
            }
        });
    });
    $("#add_new_association").on("click", function() {
        $(".new-association-wrapper").slideDown();
        $(".js-example-basic-multiple").select2();
    })
    $("#cancel_new_association").on("click", function() {
        $(".new-association-wrapper").hide();
    });
    $("#confirm_new_association").on("click", function() {
        var name = $("#new_association_name").val();
        var members = $("#new_association_memebers").val()+"";
        //console.log(members);

        var data = "name="+name+"&memebers="+members;
        $.ajax({
            type: "post",
            url: "user/add-association.do",
            data: data,
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.success==true){
                    window.location.reload();
                }
            },
            error: function() {
                alert("添加失败,请稍后再试");
            }
        });
    });
}

var association_list;
function initAssociation() {
    $(".association-outer").on("click", function() {
        $(this).hide();
    });
    $(".association-wrapper .table-item").on("click", function() {
        var index = -1;
        for(var i=0;i<association_list.length;i++){
            if(this==association_list[i]){
                index = i;
                break;
            }
        }
        console.log(index);
        if(index!=-1){
            $(".association-outer").show();
            var association = associationList[index];
            var members = association.members;

            console.log(association);

            $("#association_id").html(association.sgid);
            $("#association_memeber_wrapper").html("");
            for(i=0;i<members.length;i++){
                $("#association_memeber_wrapper").append("" +
                    "<div class='column'>" +
                    "   <span class='column-item'>"+members[i].UserId+"</span>" +
                    "   <span class='column-item'>"+members[i].UserName+"</span>" +
                    "   <span class='column-item'>"+members[i].maxearn+"</span>" +
                    "</div>");
            }
        }
    });
}

window.onload = function() {
    association_list = document.querySelectorAll(".association-wrapper .table-item");

    initListener();
    initAssociation();
};