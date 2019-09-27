import React from 'react'
import style from './index.module.scss'

class ClassifyLi extends React.Component {
    render () {
        return <li className={style.classlist} onClick={this.toDetail.bind(this)}>
            <p>{this.props.children}</p>
            <i className={"iconfont icon-arrow-right"}></i>
        </li>
    }
    toDetail () {
		var obj = JSON.stringify(this.props.asd)
        this.props.history.push(`/topic/inner?id=${this.props.only}&name=${this.props.name}`)
    }
}
export default ClassifyLi