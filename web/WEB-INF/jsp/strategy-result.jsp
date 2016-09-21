<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="strategy-result-wrapper">
    <div class="column-wrapper">
        <div class="column">
            <div class="row column-item">
                <span class="row-item">Total Returns</span>
                <span id="total_returns" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Annual Returns</span>
                <span id="annual_returns" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Alpha</span>
                <span id="alpha" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Beta</span>
                <span id="beta" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Sharpe</span>
                <span id="sharpe" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Sortino</span>
                <span id="sortino" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Information Ratio</span>
                <span id="ratio" class="row-item">0</span>
            </div>
        </div>
        <br>
        <div class="column">
            <div class="row column-item">
                <span class="row-item">Benchmark Total</span>
                <span id="benchmark_total" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Benchmark Annual</span>
                <span id="benchmark_annual" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Volatility</span>
                <span id="volatility" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">MaxDrawdown</span>
                <span id="max_drawdown" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Tracking Error</span>
                <span id="tracking_error" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item">Downside Risk</span>
                <span id="downside_risk" class="row-item">0</span>
            </div>
            <div class="row column-item">
                <span class="row-item"></span>
                <span class="row-item"></span>
            </div>
        </div>
    </div>
    <div id="backtesting_graph">

    </div>

    <br>
    <h1><img src="resources/img/logo_s.png"/> 买卖情况</h1>
    <br>
    <div class="column">
        <span class="column-item">时间</span>
        <span class="column-item">股票</span>
        <%--<span class="column-item">订单编号</span>--%>
        <span class="column-item">价格</span>
        <span class="column-item">数量</span>
    </div>
    <div id="running_output" class="running-output column-wrapper">

    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
</div>
