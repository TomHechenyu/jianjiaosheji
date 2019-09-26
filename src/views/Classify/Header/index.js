import React from 'react'
import style from './index.module.scss'
import { Toast, WhiteSpace, WingBlank } from 'antd-mobile';

class ClassifyHeader extends React.Component {
    render () {
        return <div className={style.header}>
            <div className={style.classify_input} onClick={()=>{
                Toast.info('功能暂未开发',1.5);
            }}>
                <i className={"iconfont icon-sousuo "+style.search}></i>
                <span>搜索我的尖叫好物</span>
            </div>
            <WingBlank>
                <WhiteSpace />
            </WingBlank>
        </div>
    }
}

export default ClassifyHeader