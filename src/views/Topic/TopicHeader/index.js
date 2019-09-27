import React from 'react'
import style from './index.module.scss'

class TopicHeader extends React.Component {
    render () {
        return <div className={style.topic_header}>
            <i className={"iconfont icon-shouye"} onClick={()=>{
                this.props.history.push('/home')
            }}></i>
            <span>{this.title()}</span>
            <i className={"iconfont icon-fenlei"} onClick={()=>{
                this.props.history.push('/classify')
            }}></i>
        </div>
    }
    title () {
        return decodeURIComponent(this.props.location.search.split('&')[1].split('=')[1])
    }
}
export default TopicHeader