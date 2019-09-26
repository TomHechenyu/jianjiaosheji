import React from 'react'
import style from './index.module.scss'
import ClassifyLi from './ClassifyLi'

class ClassifyItem extends React.Component {
    state = {
        filmData: [],
        img:""
    }
    render () {
        return <div className={style.item}>
            <img src={this.state.img} alt="" onClick={this.toDetail.bind(this)}/>
            <ul>
                {
                    this.state.filmData.map(data=>
                        <ClassifyLi key={data} {...this.props}>{data}</ClassifyLi>
                    )
                }
            </ul>
        </div>
    }
    static getDerivedStateFromProps (newProps) {
        return {
            filmData:newProps.filmData,
            img:newProps.img
        }
    }
    toDetail () {
        this.props.history.push(`/topic/111`)
    }
}

export default ClassifyItem