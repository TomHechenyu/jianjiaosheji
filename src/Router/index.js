import React from 'react'
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
import App from '../App'
import Home from '../views/Home'
import Classify from '../views/Classify'
import Cart from '../views/Cart'
import Message from '../views/Message'
import Mine from '../views/Mine'
import Login from '../views/Login'
import Topic from '../views/Topic'
function islogin(){
    return false
}
const router=(
    <HashRouter>
        <App>
            <Switch>
                {/* 首页 */}
            <Route path="/home" component={Home}></Route>
            {/* 分类 */}
            <Route path="/classify" component={Classify}></Route>
            {/* 购物车 */}
            <Route path="/cart" render={()=>{
                return islogin()?<Message></Message>:<Redirect to="/login"></Redirect>
                }}></Route>
                {/* 消息 */}
            <Route path="/message" render={()=>{
                return islogin()?<Message></Message>:<Redirect to="/login"></Redirect>
                }}></Route>
                {/* 我的 */}
            <Route path="/mine" render={()=>{
                return islogin()?<Message></Message>:<Redirect to="/login"></Redirect>
                }}></Route>
                {/* 登录 */}
            <Route path="/login" component={Login}></Route>
            {/* Topic动态路由 */}
            <Route path="/topic/:myid" component={Topic}></Route>
            {/* 默认页面 */}
            <Redirect from="/" to="/home"></Redirect>
            </Switch>
        </App>
    </HashRouter>
)
export default router