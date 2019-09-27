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
            <img src={this.state.img} alt=""/>
            <ul>
                {
                    this.state.filmData.map(data=>
                        <ClassifyLi key={data.id} {...this.props} only={data.id} name={data.soft}>{data.soft}</ClassifyLi>
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
}

export default ClassifyItem