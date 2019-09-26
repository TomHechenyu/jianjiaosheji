import React from 'react'
import style from './index.module.scss'

class ClassifyLi extends React.Component {
     render () {
        return <li className={style.classlist}>
            <p>{this.props.children}</p>
            <i className={"iconfont icon-arrow-right"}></i>
        </li>
     }
}
export default ClassifyLi