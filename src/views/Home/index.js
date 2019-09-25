import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import Recommend from './Recommend'
import Quality from './Quality'
import LivingAtHome from './LivingAtHome'

class Home extends Component {
    render() {
        return (
            <div>
                Home
                {this.props.children}
                <Switch>
                    <Route path="/home/recommend" component={Recommend}></Route>
                    <Route path="/home/quality" component={Quality}></Route>
                    <Route path="/home/livingAtHome" component={LivingAtHome}></Route>
                </Switch>
            </div>
        );
    }
}

export default Home;