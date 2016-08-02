<%--
  Created by IntelliJ IDEA.
  User: Hermit
  Date: 16/7/20
  Time: 17:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <title>LoginTest</title>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>

    <!-- Insert this line after script imports -->
    <script>if (window.module) module = window.module;</script>

    <script>
        function sub() {
            console.log($("#formid").serialize());

            $.ajax({
                type: "POST",
                url: "login.do",
                data: $('#formid').serialize(),
                async: false,
                success: function(data) {

                },
                error: function(state) {
                    alert(state);
                }
            });
        }
    </script>
</head>
<body>
    <form id="formid">
        <div><input type="text" name="a" value="1" id="a" /></div>
        <div><input type="text" name="b" value="2" id="b" /></div>
        <div><input type="hidden" name="c" value="3" id="c" /></div>
        <div>
            <textarea name="d" rows="8" cols="40">4</textarea>
        </div>
        <div><select name="e">
            <option value="5" selected="selected">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select></div>
        <div>
            <input type="checkbox" name="f" value="8" id="f" />
        </div>
    </form>
    <button name="Submit" onclick="sub()">Submit</button>
</body>
</html>
