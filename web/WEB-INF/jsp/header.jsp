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
            <li class="menu-item"><a class="login">登录</a></li>
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
                <li class="menu-item"><a class="login">登录</a></li>
            </ul>
        </div>
    </div>

    <div id="user_login_wrapper" class="full" style="display: none">
        <div id="login_form_wrapper">
            <form id="login_form" name="login_form" style="display: block">
                <div class="login-title"><img src="resources/img/logo_s.png"/> Login</div>
                <div class="input-item">
                    <div class="input-labels">
                        <label>Username:</label>
                        <label id="error_user_info" class="input-alert"></label>
                    </div>
                    <input type="text" name="username"/>
                </div>
                <div class="input-item">
                    <div class="input-labels">
                        <label>Password:</label>
                        <label id="error_password_info" class="input-alert"></label>
                    </div>
                    <input type="password" name="password"/>
                </div>
                <div class="login-bottom">
                    <button id="login_register" class="login-bottom-item" type="button">Register</button>
                    <button id="login_submit" class="login-bottom-item" type="button">Login</button>
                </div>
            </form>
            <form id="register_form" name="register_form" style="display: none">
                <div class="login-title"><img src="resources/img/logo_s.png"/> Register</div>
                <div class="input-item">
                    <div class="input-labels">
                        <label>Username:</label>
                        <label id="repeat_username_info" class="input-alert"></label>
                    </div>
                    <input type="text" name="username"/>
                </div>
                <div class="input-item">
                    <div class="input-labels">
                        <label>Password:</label>
                        <label id="different_password_info" class="input-alert"></label>
                    </div>
                    <input type="password" name="password"/>
                </div>
                <div class="input-item">
                    <div class="input-labels">
                        <label>Confirm Password:</label>
                    </div>
                    <input type="password" name="confirm_password"/>
                </div>
                <label id="register_success" style="display: none">注册成功!</label>
                <div class="login-bottom">
                    <button id="register_back" class="login-bottom-item" type="button">Back</button>
                    <button id="register_submit" class="login-bottom-item" type="button">Register</button>
                </div>
            </form>
        </div>
    </div>
</div>