import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import style from './index.module.scss'

class Tabber extends Component {
    render() {
        return (
            <ul className={style.tabber}>
                <li><NavLink to="/home" activeClassName={style.active} replace>
                    <i className={"iconfont icon-shouye"}></i>首页</NavLink></li>
                <li><NavLink to="/classify" activeClassName={style.active} replace>
                    <i className={"iconfont icon-fenlei"}></i>分类</NavLink></li>
                <li><NavLink to="/cart" activeClassName={style.active} replace>
                    <i className={"iconfont icon-gouwuche"}></i>购物车</NavLink></li>
                <li><NavLink to="/message" activeClassName={style.active} replace>
                    <i className={"iconfont icon-xiaoxi"}></i>消息</NavLink></li>
                <li><NavLink to="/mine" activeClassName={style.active} replace>
                    <i className={"iconfont icon-wo"}></i>我</NavLink></li>
            </ul>
        );
    }
}

export default Tabber;