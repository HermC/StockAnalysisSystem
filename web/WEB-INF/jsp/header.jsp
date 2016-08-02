<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<div id="header">
    <div class="header-wrapper">
        <div class="logo"><a href="index.do" target="_blank"><img src="resources/img/title.png"></a></div>
        <div class="input-wrapper" style="display: none">
            <div class="search-icon"></div>
            <input id="search_input" type="text" placeholder="输入股票id或名字">
        </div>

        <ul class="menu">
            <li id="search_toggle" class="search-icon">
            </li>
            <li class="menu-item"><a href="recommand.do" target="_blank">推荐</a></li>
            <li class="menu-item"><a href="industry.do" target="_blank"> 行业</a></li>
            <li class="menu-item"><a href="compare.do" target="_blank"> 对比</a></li>
            <li class="menu-item"><a href="favor.do" target="_blank">收藏</a></li>
            <li id="menu_toggle">
            </li>
        </ul>
    </div>
    <div id="search_outer" class="full" style="display: none">
        <div class="search_result-wrapper">
            <div class="header-wrapper">
                <div class="search_result">
                    <h5>搜索结果：</h5>
                </div>
            </div>
        </div>
    </div>
    <div id="menu_outer" class="full" style="display: none">
        <div class="menu_wrapper">
            <ul>
                <li class="menu-item"><a  href="recommand.do" target="_blank"> 推荐</a></li>
                <li class="menu-item"><a href="industry.do" target="_blank"> 行业</a></li>
                <li class="menu-item"><a href="compare.do" target="_blank"> 对比</a></li>
                <li class="menu-item"><a href="favor.do" target="_blank">自选</a></li>
            </ul>
        </div>
    </div>
</div>