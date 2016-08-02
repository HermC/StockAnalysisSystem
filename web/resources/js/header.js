var mq700 = window.matchMedia('(max-width:700px)');
function initialHeader(){
    toggleSearch();
    inputListener();
    menu();
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