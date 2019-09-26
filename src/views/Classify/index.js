import React, { Component } from 'react';
import ClassifyItem from './ClassifyItem'
import Header from './Header'

class Classify extends Component {
    state = {
        filmData:['沙发','椅凳','床','柜架','餐桌','茶几和边桌','书桌'],
        goods:['灯具','用餐','时尚生活','收纳','烹饪','纺织品','家饰','卫浴']
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