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
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <link type="text/css" rel="stylesheet" href="/resources/plugin/bootstrap-3.3.5/dist/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/plugin/select2-4.0.3/dist/css/select2.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/plugin/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/plugin/font-awesome-4.6.3/css/font-awesome.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/plugin/codemirror/lib/codemirror.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/plugin/codemirror/theme/twilight.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/plugin/jsPlumb/css/jsPlumbToolkit-defaults.css">
    <link type="text/css" rel="stylesheet" href="/resources/plugin/jsPlumb/css/jsPlumbToolkit-demo.css">
    <link type="text/css" rel="stylesheet" href="/resources/plugin/jsPlumb/css/app.css">
    <link type="text/css" rel="stylesheet" href="/resources/bundle/reset.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/bundle/common.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/bundle/strategy-editor.css"/>
    <script type="text/x-jtk-templates" src="resources/plugin/jsPlumb/templates.html"></script>

    <script>
        var isNew = ${isNew};
        var strategy;
        var isCode = true;
        var strategy_id;
        if(isNew==true){

        }else{
            <c:if test="${strategy!=null}">
                strategy = ${strategy};
            </c:if>
            console.log(strategy);
            if(strategy.isJson=="1"){
                isCode = false;
            }else{
                isCode = true;
            }
            strategy_id = strategy.strategyid;
        }
    </script>

    <!-- Insert this line above script imports  -->
    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <script type="text/javascript" rel="script" src="resources/js/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/amcharts.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/amstockchart/serial.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-3.3.5/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/select2-4.0.3/dist/js/select2.full.min.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/jsPlumb/js/jsPlumb-2.1.4.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/jsPlumb/js/jsPlumbToolkit-1.0.24.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/codemirror/lib/codemirror.js"></script>
    <script type="text/javascript" rel="script" src="resources/plugin/codemirror/mode/python/python.js"></script>
    <script type="text/javascript" rel="script" src="resources/js/strategy-editor.js"></script>

    <!-- Insert this line after script imports  -->
    <script>if (window.module) module = window.module;</script>

    <title>策略编辑-Ascending</title>
</head>
<body>
<jsp:include page="usernav.jsp" flush="true">
    <jsp:param name="userInfo" value="${userInfo}"/>
</jsp:include>
<div id="main-page">
    <div class="strategy-editor-container" style="display: block">
        <span id="strategy_back"><i class="fa fa-arrow-left"></i> 返回列表</span>
        <br>
        <br>
        <h1>策略编辑</h1>
        <br>
        <c:if test="${isNew!=true}">
            &nbsp;&nbsp;<span>策略名称</span>&nbsp;<input id="strategy_name" type="text" value="${strategy.strategyname}"/>
        </c:if>
        <c:if test="${isNew==true}">
            &nbsp;&nbsp;<span>策略名称</span>&nbsp;<input id="strategy_name" type="text" value=""/>
        </c:if>
        <button id="save" class="edit-button" type="button"><i class="fa fa-save"></i> 保存</button>
        <br>
        <br>
        <div class="strategy-config">
            <button id="change_model" class="edit-button" type="button">采用流程图模式</button>
            <div class="config-wrapper" style="display: inline">
                &nbsp;
                <span>时间区间</span>
                <input id="start_time" size="16" type="text" readonly class="form_datetime">
                <label class="line"></label>
                <input id="end_time" size="16" type="text" readonly class="form_datetime">
                &nbsp;
                <span>起始金额</span>
                <input id="start_amount" type="text">
                <button id="start_simulator" class="edit-button" type="button"><i class="fa fa-play"></i> 开始模拟</button>
            </div>
        </div>
        <br>
        <div class="strategy-editor">
            <div id="strategy_code">
                <textarea id="strategy_code_editor" style="display: block"></textarea>
            </div>
            <div class="jtk-demo-main-wrapper" id="jtk_demo_flowchart" style="display: none">
                <div id="choose_stocks_wrapper" class="column">
                    <span class="column-item u1of4">添加股票运行:</span>
                    <select id="choose_stocks" class="js-example-basic-multiple column-item" multiple="multiple">
                        <option>1</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                    </select>
                </div>
                <br>
                <div class="jtk-demo-main" id="jtk-demo-flowchart">
                    <!-- the node palette -->
                    <div class="sidebar node-palette">
                        <ul>
                            <li jtk-node-type="question" title="Drag to add new">
                                选择
                            </li>
                            <li jtk-node-type="action" title="Drag to add new">
                                操作
                            </li>
                        </ul>
                    </div>

                    <!-- this is the main drawing area -->
                    <div class="jtk-demo-canvas">
                        <!-- controls -->
                        <div class="controls">
                            <i class="fa fa-arrows selected-mode" mode="pan" title="Pan Mode">Move</i>
                            <i class="fa fa-pencil" mode="select" title="Select Mode">Edit</i>
                            <i class="fa fa-home" reset title="Zoom To Fit">Home</i>
                        </div>
                        <!-- miniview -->
                        <div class="miniview"></div>
                    </div>
                </div>
            </div>
            <textarea id="strategy_code_console" readonly>日志:</textarea>
        </div>
        <br>
        <br>
    </div>
    <br>
    <br>
    <br>
    <div class="strategy-running-result">
        <h1>策略结果</h1>
        <br>
        <jsp:include page="strategy-result.jsp"></jsp:include>
    </div>
</div>
</body>
</html>
