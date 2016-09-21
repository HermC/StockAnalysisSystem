<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String url = request.getScheme()+"://"+ request.getServerName()+request.getRequestURI()+"?"+request.getQueryString();
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<base href="<%=basePath%>">
<script>
    var stockList = ${stockList};
    var navIndex = ${param.navIndex};
</script>
<div id="main-nav">
    <div class="user-info">
        <a target="_self" href="user.do">
            <div class="user-img-container">
                <img id="user-img" src="resources/img/user/default.jpg"/>
            </div>
            <div id="user-name" class="user-nickname">${userInfo.UserName}</div>
        </a>
    </div>

    <div class="main-nav-container">
        <%--<div class="nav-search-wrapper">--%>
            <%--<input type="text"/>--%>
        <%--</div>--%>
        <div class="nav-input-wrapper">
            <div class="search-icon"></div>
            <input id="nav_search_input" type="text" placeholder="输入股票id或名字">
            <div id="nav_search_result" style="display: none">

            </div>
        </div>
        <br>
        <a class="main-nav-item" href="index.do" target="_self">
            <img src="resources/img/icon/icon_stockMarket.png" class="main-nav-point"/>
            <p class="main-nav-target">股市行情</p>
        </a>
        <a class="main-nav-item" href="industry.do" target="_self">
            <img src="resources/img/icon/icon_industry.png" class="main-nav-point"/>
            <p class="main-nav-target">行业情况</p>
        </a>
        <a class="main-nav-item" href="compare.do" target="_self">
            <img src="resources/img/icon/icon_compare.png" class="main-nav-point"/>
            <p class="main-nav-target">股票对比</p>
        </a>
        <br>
        <a class="main-nav-item" href="user/stockpool.do" target="_self">
            <img src="resources/img/icon/icon_favor.png" class="main-nav-point"/>
            <p class="main-nav-target">股票池</p>
        </a>
        <a class="main-nav-item" href="user/strategy-list.do" target="_self">
            <img src="resources/img/icon/icon_strategy.png" class="main-nav-point"/>
            <p class="main-nav-target">策略</p>
        </a>
        <a class="main-nav-item" href="user/simulator-list.do" target="_self">
            <img src="resources/img/icon/icon_trade.png" class="main-nav-point"/>
            <p class="main-nav-target">模拟交易</p>
        </a>
        <br>
        <a class="main-nav-item" href="user/association.do" target="_self">
            <img src="resources/img/icon/icon_trade.png" class="main-nav-point"/>
            <p class="main-nav-target">社群</p>
        </a>
        <a class="main-nav-item" href="user/forum-list.do" target="_self">
            <img src="resources/img/icon/icon_trade.png" class="main-nav-point"/>
            <p class="main-nav-target">论坛</p>
        </a>
    </div>
    <script>
        var list = document.querySelectorAll(".main-nav-item");

        $(list[navIndex]).addClass("main-nav-item-selected");

        $("body").bind("click", function(e) {
            if(e.target!=document.getElementById("nav_search_result")){
                $("#nav_search_result").hide();
            }
        });

        $("#nav_search_input").bind("input propertychange",function(){
            $("#nav_search_result").show();
            var searchContent = $(this).val();
            console.log(searchContent);
            searchNav(searchContent);
        });

        function searchNav(search){
            var searchResult = "";
            var resultNum = 0;
            var tempId;
            var tempName;
            for(var i = 0;i < stockList.length && resultNum < 10;i++){
                tempId = stockList[i].id+"";
                tempName = stockList[i].name+"";
                if(tempId.indexOf(search) != -1 || tempName.indexOf(search) != -1){
                    searchResult +='<a class="nav-search-item" target="_self" href="stock.do?id='+tempId+'"><span>'+tempName+'</span>&nbsp;&nbsp;&nbsp;<span>'+tempId+'</span></a>';
                    resultNum ++;
                }
            }
            $("#nav_search_result").html(searchResult);
        }
    </script>
</div>
</html>
