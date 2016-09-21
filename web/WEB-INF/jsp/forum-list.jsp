<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script>
    var topicList;
    <c:if test="${topicList!=null}">
        topicList = ${topicList};
    </c:if>
//    console.log(topicList+"jfisod");
</script>

<div id="forum_list">
    <c:forEach items="${topicList}" var="topic">
        <div class="forum-list-item column">
            <img class="user-head" src="resources/img/user/default.jpg"/>
            <div class="user-name column-item u1of4">
                &nbsp;&nbsp;<span>${topic.username}</span>&nbsp;&nbsp;<span>(#${topic.userid})</span>
            </div>
            <span class="column-item forum-theme">${topic.title}</span>
            <div class="user-click">
                <span>回复:</span>&nbsp;&nbsp;<span class="reply">${topic.reply_count}</span>
                &nbsp;&nbsp;
                <span>点击:</span>&nbsp;&nbsp;<span class="click">${topic.click_count}</span>
            </div>
        </div>
    </c:forEach>
    <%--<div class="forum-list-item column">--%>
        <%--<img class="user-head" src="resources/img/user/default.jpg"/>--%>
        <%--<div class="user-name column-item u1of4">--%>
            <%--&nbsp;&nbsp;<span>用户</span>&nbsp;&nbsp;<span>(#id1)</span>--%>
        <%--</div>--%>
        <%--<span class="column-item forum-theme">这是一个主题</span>--%>
        <%--<div class="user-click">--%>
            <%--<span>回复:</span>&nbsp;&nbsp;<span class="reply">10</span>--%>
            <%--&nbsp;&nbsp;--%>
            <%--<span>点击:</span>&nbsp;&nbsp;<span class="click">10</span>--%>
        <%--</div>--%>
    <%--</div>--%>
</div>

<script>
    var topic_list = document.querySelectorAll(".forum-list-item");
    $(".forum-list-item").on("click", function() {
        var index = -1;
        for(var i=0;i<topic_list.length;i++){
            if(this==topic_list[i]){
                index = i;
                break;
            }
        }

        console.log(topicList[index]);



//        console.log(index);
//        var click = Number($(click_list[index]).html());
//        click++;
//        $(click_list[index]).html(click);
//
//        window.open("user/forum-card.do");
//
        var topic_id = topicList[index].topicid;

//        window.open("user/forum-card.do?topic_id="+topic_id);
        $.ajax({
            type: "get",
            url: "user/forum/update-click.do?topic_id="+topic_id,
            data: "json",
            success: function(data) {
                window.open("user/forum-card.do?topic_id="+topic_id);
            },
            error: function() {
                alert("网络波动,请稍后");
            }
        });
    });

    var reply_list = document.querySelectorAll(".reply");
    var click_list = document.querySelectorAll(".click");
</script>