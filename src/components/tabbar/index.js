import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import style from './index.module.scss'

class Tabber extends Component {
    render() {
        return (
            <div className={style.tabber}>
                <ul>
                <li><NavLink to="/home" activeClassName={style.active}>首页</NavLink></li>
                <li><NavLink to="/classify" activeClassName={style.active}>分类</NavLink></li>
                <li><NavLink to="/cart" activeClassName={style.active}>购物车</NavLink></li>
                <li><NavLink to="/message" activeClassName={style.active}>消息</NavLink></li>
                <li><NavLink to="/mine" activeClassName={style.active}>我</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default Tabber;