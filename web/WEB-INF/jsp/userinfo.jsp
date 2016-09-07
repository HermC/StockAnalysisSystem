<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String url = request.getScheme()+"://"+ request.getServerName()+request.getRequestURI()+"?"+request.getQueryString();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">

    <title>用户-Ascending</title>

    <link type="text/css" rel="stylesheet" href="/resources/plugin/bootstrap-3.3.5/dist/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/plugin/select2-4.0.3/dist/css/select2.min.css"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/reset.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/common.css" />">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/bundle/userinfo.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/plugin/font-awesome-4.6.3/css/font-awesome.min.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/plugin/Jcrop-0.9.12/css/jquery.Jcrop.min.css"/>">

    <script>
        var userList;
        <c:if test="${userList!=null}">
            userList = ${userList};
        </c:if>
        var associationList;
        <c:if test="${associationList!=null}">
            associationList = ${associationList};
        </c:if>
        console.log(associationList);
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-3.3.5/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/select2-4.0.3/dist/js/select2.full.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/Jcrop-0.9.12/js/jquery.Jcrop.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/jquery.form.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/userinfo.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>
</head>
<body>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
</jsp:include>
<div id="main-page">
    <div class="association-outer" style="display: none">
        <div class="association-info-wrapper">
            <h1>社群#<span id="association_id">1</span></h1>
            <br>
            <h2>社群成员</h2>
            <div class="column table-header">
                <span class="column-item">成员ID</span>
                <span class="column-item">成员名称</span>
                <span class="column-item">个人收益</span>
            </div>
            <div id="association_memeber_wrapper">
                <%--<c:forEach items="${userList}" var="user" varStatus="s">--%>
                    <%--<div class="column">--%>
                        <%--<span class="column-item">${user.UserId}</span>--%>
                        <%--<span class="column-item">${user.}</span>--%>
                    <%--</div>--%>
                <%--</c:forEach>--%>
                <div class="column">
                    <span class="column-item">成员1</span>
                    <span class="column-item">成员1</span>
                    <span class="column-item">12%</span>
                </div>
                <div class="column">
                    <span class="column-item">成员2</span>
                    <span class="column-item">成员2</span>
                    <span class="column-item">12%</span>
                </div>
                <div class="column">
                    <span class="column-item">成员3</span>
                    <span class="column-item">成员3</span>
                    <span class="column-item">12%</span>
                </div>
            </div>
        </div>
    </div>
    <div class="user-body">
        <div class="user-img-container">
            <img id="user_info_img" src="resources/img/user/default.jpg"/>
        </div>
        <div class="user-id-container">
            <span class="user-nickname">finominon</span> <i id="user_info_edit" class="fa fa-pencil"></i> <a href="logout.do" title="登出" class="fa fa-power-off"></a>
        </div>

        <div class="edit-container" style="display: none">
            <h3>头像编辑</h3>
            <br>
            <form id="img_form">
                <img id="view_img"/>
                <input id="change_img" style="display: none" type="file" name="img_file"/>
                <input type="hidden" id="x" name="x"/>
                <input type="hidden" id="y" name="y"/>
                <input type="hidden" id="w" name="w"/>
                <input type="hidden" id="h" name="h"/>
                <input type="hidden" id="realW" name="realW"/>
                <input type="hidden" id="realH" name="realH"/>
            </form>
            <br>
            <button id="choose_file" class="edit-button" type="button"><i class="fa fa-plus"></i> 选择文件</button>
            <button id="confirm_file" class="edit-button" type="button"><i class="fa fa-check"></i> 确认更改</button>
            <label id="file_state" class="change-failed"></label>
            <img id="cut_img"/>

            <br>

            <h3>用户昵称</h3>
            <form id="nick_name_form" name="nick_name_form">
                <div class="column">
                    <label class="form-label column-item u1of4">昵称:</label>
                    <input class="column-item" type="text" name="nick_name" value="finominon"/>
                    <!--<span class="column-item"></span>-->
                </div>
            </form>
            <button id="confirm_nick_name" class="edit-button" type="button"><i class="fa fa-check"></i> 确认更改</button>
            <label id="nick_name_state" class="change-success"></label>

            <br>
            <br>

            <h3>密码更改</h3>
            <form id="password_form" name="password_form">
                <div class="column">
                    <label class="form-label column-item u1of4">原密码:</label>
                    <input class="column-item" type="password" name="old_password"/>
                    <!--<span class="column-item"></span>-->
                </div>
                <div class="column">
                    <label class="form-label column-item u1of4">新密码:</label>
                    <input class="column-item" type="password" name="new_password"/>
                    <!--<span class="column-item"></span>-->
                </div>
                <div class="column">
                    <label class="form-label column-item u1of4">新密码确认:</label>
                    <input class="column-item" type="password" name="confirm_password"/>
                    <!--<span class="column-item"></span>-->
                </div>
            </form>
            <button id="confirm_password" class="edit-button" type="button"><i class="fa fa-check"></i> 确认更改</button>
            <label id="password_state" class="change-success"></label>
        </div>

        <div class="info-container">
            <h3>用户操作</h3>
            <br>
            <div class="column">
                <span class="column-item">策略 <b>4</b></span>
                <span class="column-item">回测 <b>8</b></span>
                <span class="column-item">模拟交易 <b>2</b></span>
            </div>

            <br>
            <br>

            <h3>社群</h3>
            <br>
            <button id="add_new_association" class="edit-button" type="button"><i class="fa fa-plus"></i> 新建社群</button>
            <div class="new-association-wrapper" style="display: none">
                <div class="column">
                    <label class="column-item u1of4">社群名称</label>
                    <input id="new_association_name" type="text" class="column-item"/>
                </div>
                <div class="column">
                    <label class="column-item u1of4">社群成员</label>
                    <select id="new_association_memebers" class="column-item js-example-basic-multiple" multiple="multiple">
                        <c:forEach items="${userList}" var="user" varStatus="s">
                            <option value="${user.UserId}">${user.UserId}--${user.UserName}</option>
                        </c:forEach>
                    </select>
                </div>
                <br>
                <div class="column" style="float: right">
                    <button id="confirm_new_association" class="edit-button" type="button">确认新增</button>
                    &nbsp;
                    <button id="cancel_new_association" class="edit-button" type="button">取消新增</button>
                </div>
                <br>
            </div>
            <br>
            <br>
            <div class="association-wrapper">
                <table>
                    <tr class="table-header">
                        <td>社群ID</td>
                        <td>社群名称</td>
                        <td>社群收益</td>
                    </tr>
                    <c:forEach items="${assocationList}" var="assocation" varStatus="s">
                        <tr class="table-item">
                            <td>${assocation}</td>
                            <td>${assocation}</td>
                            <td>${assocation}</td>
                        </tr>
                    </c:forEach>
                    <tr class="table-item">
                        <td>1</td>
                        <td>Hello</td>
                        <td>12%</td>
                    </tr>
                    <tr class="table-item">
                        <td>2</td>
                        <td>World</td>
                        <td>16%</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
</body>
</html>
