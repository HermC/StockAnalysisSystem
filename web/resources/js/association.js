/**
 * Created by Hermit on 16/9/11.
 */


window.onload = function() {
    association_list = document.querySelectorAll("#association_list .table-item");

    initListener();
    initAssociation();
};

function initListener() {
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
    $("#association_list .table-item").on("click", function() {
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