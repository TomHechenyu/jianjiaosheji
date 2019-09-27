import React, { Component } from 'react';
import ClassifyItem from './ClassifyItem'
import Header from './Header'

class Classify extends Component {
    state = {
        filmData:[{id:20,soft:'沙发'},{id:21,soft:'椅凳'},{id:2310,soft:'床'},{id:24,soft:'柜架'},{id:2210,soft:'餐桌'},{id:2211,soft:'茶几和边桌'},{id:2212,soft:'书桌'}],
        goods:[{id:25,soft:'灯具'},{id:26,soft:'用餐'},{id:32,soft:'时尚生活'},{id:33,soft:'收纳'},{id:27,soft:'烹饪'},{id:28,soft:'纺织品'},{id:29,soft:'家饰'},{id:31,soft:'卫浴'}]
    }
    render() {
        return (
            <div>
                <Header></Header>
                <ClassifyItem filmData={this.state.filmData} img="/images/furniture.png" {...this.props}></ClassifyItem>
                <ClassifyItem filmData={this.state.goods} img="/images/household.png" {...this.props}></ClassifyItem>
                <div style={{
                    height:'.5rem',
                    background:'white'
                }}></div>
            </div>
        );
    }
}

export default Classify;