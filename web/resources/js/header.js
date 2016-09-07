var mq700 = window.matchMedia('(max-width:700px)');
function initialHeader(){
    toggleSearch();
    inputListener();
    menu();
    login();
}

function menu(){
    $("#menu_toggle").bind("click",function(){
        $("#menu_outer").toggle();
    })
    $("#menu_outer").bind("click",function(){
        $(this).hide();
    })
}

function toggleSearch(){
    $("#search_toggle").bind("click",function(){
        if($(this).hasClass("search-close")){
            $(this).removeClass("search-close");
            $("#search_input").val("");
            $(".input-wrapper").hide();
            $("#search_outer").hide();
             if(mq700.matches){
                $(".logo").html('<img src="resources/img/title.png">')
            }
        }else{
            $(this).addClass("search-close");
            $(".input-wrapper").show();
            $("#search_outer").slideDown();
            $("#search_input").focus();
            search("");
            if(mq700.matches){
                $(".logo").html('<img src="resources/img/title_s.png">')
            }
        }
    });
    $("#search_outer").bind("click",function(e){
        if(e.target == this){
            $("#search_toggle").removeClass("search-close");
            $("#search_input").val("");
            $(".input-wrapper").hide();
            $(".full").hide();
        }
    });
}

function login() {
    $(".login").on("click", function() {
        $(".header-wrapper").hide();
        $("#user_login_wrapper").show();
    });
    $("#login_register").on("click", function() {
        $("#login_form").hide();
        $("#register_form").show();
    });
    $("#register_back").on("click", function() {
        $("#register_form").hide();
        $("#login_form").show();
    });
    $("#user_login_wrapper").bind("click", function(e) {
        if(e.target == this){
            $(".header-wrapper").show();
            $(this).hide();
        }
    });
    $("#login_form input").bind("focus", function() {
        $("#error_user_info").html("");
        $("#error_password_info").html("");
    });
    $("#register_form input").bind("focus", function() {
        $("#repeat_username_info").html("");
        $("#different_password_info").html("");
        $("#register_failed").hide();
        $("#register_success").hide();
    });
    $("#login_submit").on("click", function() {
        var form = document.login_form;

        var username = form.username.value;
        var password = form.password.value;

        if(username==undefined||username==null||username==""){
            $("#error_user_info").html("用户名不能为空");
            return;
        }

        if(password==undefined||password==null||password==""){
            $("#error_password_info").html("密码不能为空");
            return;
        }

        $.ajax({
            type: "POST",
            url: "login.do",
            data: $("#login_form").serialize(),
            dataType: "json",
            beforeSend: function() {
                $("#login_submit").attr("disabled", true);
            },
            success: function(data) {
                console.log(data);
                if(data.success==true){
                    window.location.href = "index.do";
                }else{
                    if(data.state=="用户名不存在"){
                        $("#error_user_info").html(data.state);
                    }else{
                        $("#error_password_info").html(data.state);
                    }
                }
            },
            error: function() {

            },
            complete: function() {
                $("#login_submit").attr("disabled", false);
            }
        });
    });
    $("#register_submit").on("click", function() {
        var form = document.register_form;

        var nickname = form.nickname.value;
        var password = form.password.value;
        var confirm_password = form.confirm_password.value;

        if(nickname==undefined||nickname==null||nickname==""){
            $("#repeat_username_info").html("昵称不能为空");
            return;
        }

        if(password==undefined||password==null||password==""){
            $("#different_password_info").html("密码不能为空");
            return;
        }

        if(confirm_password!=password){
            $("#different_password_info").html("两次输入的密码不同");
            return;
        }

        $.ajax({
            type: "POST",
            url: "register.do",
            data: $("#register_form").serialize(),
            dataType: "json",
            beforeSend: function() {
                $("#register_submit").attr("disabled", true);
            },
            success: function(data) {
                if(data.success==true){
                    var userid = data.userid;
                    $("#register_userid").html(userid);
                    $("#register_wrapper").hide();
                    $("#register_success").show();
                }
            },
            error: function() {
                $("#register_failed").show();
                $("#register_submit").attr("disabled", false);
            },
            complete: function() {

            }
        });
    });
}

function inputListener(){
    $("#search_input").bind("input propertychange",function(){
        var searchContent = $(this).val();
        search(searchContent);
    });
}

function search(search){
    var searchResult = '<h5>搜索结果：</h5>';
    var resultNum = 0;
    var tempId;
    var tempName;
    for(var i = 0;i < stockList.length && resultNum < 10;i++){
        tempId = stockList[i].id+"";
        tempName = stockList[i].name+"";
        if(tempId.indexOf(search) != -1 || tempName.indexOf(search) != -1){
            searchResult +='<a target="_blank" href="stock.do?id='+tempId+'"><h6><span>'+tempName+'</span>'+tempId+'</h6></a>';
            resultNum ++;
        }
    }
    $(".search_result").html(searchResult);
}

/******************************************************
 * 添加/删除自选股
 */
function operateFavStock(stock_id) {
    var tmp = $.cookie('favouriteStock');
    var isExist = false;
    var result;

    if(tmp!=undefined){
        result = tmp.split(",");

        var i;
        for(i=0;i<result.length;i++){
            if(result[i]==stock_id){
                isExist = true;
                break;
            }
        }

        if(result[0]=="null"){
            result.shift();
        }

        if(isExist){
            //删除
            result.splice(i, 1);
            if(result.length==0){
                $.cookie('favouriteStock', null, {
                    expires: -1,
                    path: '/'
                });
                return;
            }
            $("#favor").attr("src", "resources/img/favor_o.png");
            operationNotice("取消收藏!");
        }else{
            //添加
            result.push(stock_id);
            $("#favor").attr("src", "resources/img/favor.png");
            operationNotice("收藏成功!");
        }
    }else{
        result = [stock_id];
        $("#favor").attr("src", "resources/img/favor.png");
        operationNotice("收藏成功!");
    }

    $.cookie('favouriteStock', result.join(','), {
        expires: 10,
        path: '/'
    });

    console.log($.cookie('favouriteStock'));
}