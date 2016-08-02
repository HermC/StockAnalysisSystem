var mq = window.matchMedia('(max-width:1024px)');
window.onload = function(){
    initialHeader();
    perfectScroll();

    changeStockList(0);
    $("#more").bind("click",function(){
        if(!mq.matches){
            $(this).toggleClass("rotate1");
            if($(this).hasClass("rotate1")){
            $("#stockListWrapper").css("width","600px");
            }else{
            $("#stockListWrapper").css("width","270px");
            }
            $(".column_toggle").each(function(){
              $(this).toggle();
            })
        }else{
            $("#stockListWrapper").hide();
        }

    });

    $("#industry_rank_total").bind("click",function(e){
        var index = parseInt(e.target.parentNode.children[0].innerHTML);

        if(!isNaN(index)){
            changeStockList(index-1);

            var top = 5 + parseInt($(e.target.parentNode).offset().top) - parseInt($("#pointer_wrapper").offset().top);
            //$("#pointer").css("top",top+"px");

            TweenLite.to($("#pointer"), 1, {css:{"top": top+"px"}, ease: Elastic.easeOut.config(1,0.5)});
        }
    });


    window.addEventListener("resize", resizeMethod, true);
    if(mq.matches){
        styleChange();
    }
};



window.onscroll = function(){
    $("#stockListWrapper").css({
        "position":"absolute",
        "top":window.scrollY+99+"px",
        "right":0
    });
};

function resizeMethod(){
    if (mq.matches) {
        console.log('mobile');
        styleChange();
    }else{
        $("#stockListWrapper .column_hide").each(function(){
            $(this).hide();
        });
        $("#more").html("&lt;&lt;").removeClass("rotate1");
        $("#stockListWrapper").show();
    }
}

function styleChange(){
    $(".column_toggle").each(function(){
        $(this).show();
    });
    $("#more").html("X");
    $("#stockListWrapper").hide();
}



var temp = 0;

function changeStockList(index){

    var hide = "";
    if(!mq.matches){
        hide = "column_hide"
    }else{
        $("#stockListWrapper").show();
    }

    $("#stock_rank_total").html('<tr>'+
        '<th class="column_rank">排名</th>'+
        '<th class="column_name_id">股票</th>'+
        '<th class="column_last">总分</th>'+

        '<th class="column_grade column_toggle ' + hide + '">市盈率</th>'+
        '<th class="column_grade column_toggle ' + hide + '">市净率</th>'+
        '<th class="column_grade column_toggle ' + hide + '">涨跌幅</th>'+
        '<th class="column_grade column_toggle ' + hide + '">量比</th>'+
        '<th class="column_grade column_toggle ' + hide + '">委托盘</th>'+
        '</tr>'
    );


    var stockList = industry_stock[index];
    for(var i = 0;i < stockList.length;i++){
        $("#stock_rank_total").append(
            '<tr>'+
                '<td>'+stockList[i].rank+'</td>'+
                '<td>'+stockList[i].name+'<span>'+stockList[i].id+'</span></td>'+
                '<td>'+stockList[i].score+'</td>'+
                '<td class="column_toggle ' + hide + '">'+stockList[i].peAssess+'</td>'+
                '<td class="column_toggle ' + hide + '">'+stockList[i].pbAssess+'</td>'+
                '<td class="column_toggle ' + hide + '">'+stockList[i].updownAssess+'</td>'+
                '<td class="column_toggle ' + hide + '">'+stockList[i].volumeAssess+'</td>'+
                '<td class="column_toggle ' + hide + '">'+stockList[i].weibiAssess+'</td>'+
            '</tr>'
        );
    }
    Ps.update(document.querySelector("#table_wrapper"));

}

function perfectScroll(){
    var blanket = document.querySelector("#table_wrapper");
    Ps.initialize(blanket,{
        suppressScrollX:'true',
        swipePropagation:'false'
    });
}