import React, { Component } from 'react';
import store from '../../Rudex'
import isShow from './actionCreator'

class Topic extends Component {
    componentDidMount () {
        setTimeout(()=>{
            store.dispatch(isShow(false))
        },0)
    }
    render() {
        return (
            <div>
                Topic
            </div>
        );
    }
    componentWillUnmount () {
        setTimeout(()=>{
            store.dispatch(isShow(true))
        },0)
    }
}

export default Topic;