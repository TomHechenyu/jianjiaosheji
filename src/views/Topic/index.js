import React, { Component } from 'react';
import store from '../../Rudex'
import isShow from './actionCreator'
import TopicHeader from './TopicHeader'
import axios from 'axios'
import style from './index.module.scss'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

class Topic extends Component {
    state = {
        currentPage:2,
        sort:'onShelfTime',
        order:'desc',
		current:0.,
		linePage:0,
		item:this.urlId(),
		isShow:false,
		desc:false,
        data: [],
		lineHead:['上新','销量','价格'],
		filmData:[{id:35,soft:'All'},{id:20,soft:'沙发'},{id:21,soft:'椅凳'},{id:2310,soft:'床'},{id:24,soft:'柜架'},{id:2210,soft:'餐桌'},{id:2211,soft:'茶几和边桌'},{id:2212,soft:'书桌'}],
    }
	add;
    render() {
        return (
            <div>
                <TopicHeader {...this.props}></TopicHeader>
                <div className={style.classify_swiper} style={{background:`url('/images/10.jpg') no-repeat`}}>
                    <div className={"swiper-container "+style.slider}>
                        <ul className="swiper-wrapper">
							{
								this.state.filmData.map(((item,index)=>
									<li
									className={"swiper-slide "+style.slide+(this.state.current===index?' '+style.header_active:'')} 
									key={item.id} 
									onClick={this.updateList.bind(this,item,index)}>
										{item.soft}
									</li>
								))
							}
                        </ul>
                    </div>
                </div>
				<ul className={style.head_line}>
					{this.state.lineHead.map((res,index)=><li key={index}>
							<span 
							className={(this.state.linePage===index?style.line_page:'')} 
							onClick={this.linePageClick.bind(this,index)}>
								{res}{index===2?(this.state.desc?'↑':'↓'):null}
							</span>,
						</li>
					)}
				</ul>
                <ul className={style.list} ref="ulLastChild">
                    {
                        this.state.data.map((item,index)=>
						<li key={index}>
							<img src={item.productImg} alt=""/>
							<div className={style.prodect}>
								<p className={style.prodect_title}>{item.productTitle}</p>
								<span>￥{item.sellPrice}</span>
								{
									item.sellPrice !== item.originalPrice?
									<span className={style.origin_price}>￥{item.originalPrice}</span>
									:null
								}
							</div>
						</li>)
                    }
                </ul>
            </div>
        );
    }
	componentDidMount () {
		var start = Date.now()
		axios({
			url:'/users'
		}).then(res=>{
			console.log(res.data)
		})
	    setTimeout(()=>{
	        store.dispatch(isShow(false))
	    },0)
	    this.http(this.urlId()).then(data=>{
	        this.setState({
	            data: data.data
	        })
	    })
	    new Swiper('.swiper-container', {
	        slidesPerView: 3,
	        spaceBetween: 30,
	        freeMode: true
	    });
		window.addEventListener('scroll',this.add=()=>{
			var now = Date.now()
			if (now - start <= 300) {
				return;
			}
			start = now
			if (this.refs.ulLastChild.lastChild.getBoundingClientRect().y <= window.innerHeight) {
				this.http(this.state.item,this.state.currentPage).then(res=>{
					if(res.data.length===0){
						window.removeEventListener('scroll',this.add)
						return;
					}
					this.setState({
						currentPage:this.state.currentPage+1,
						data:[...this.state.data,...res.data]
					})
				})
			}
			if((document.documentElement.scrollTop || document.body.scrollTop) >= 400){
				this.setState({
					isShow:true
				})
			}else{
				this.setState({
					isShow:false
				})
			}
		})
	}
    componentWillUnmount () {
		window.removeEventListener('scroll',this.add)
        setTimeout(()=>{
            store.dispatch(isShow(true))
        },0)
    }
	linePageClick (index) {
		if(index===0){
			this.setState({
				sort:"onShelfTime",
				order:'desc',
				desc:false,
				currentPage:2
			},()=>{
				this.lineHttp.call(this,index)
			})
		}else if(index===1){
			this.setState({
				sort:"sales",
				order:'desc',
				desc:false,
				currentPage:2
			},()=>{
				this.lineHttp.call(this,index)
			})
		}else{
			if(this.state.desc){
				this.setState({
					sort:"price",
					order:'desc',
					desc:false,
					currentPage:2
				},()=>{
					this.lineHttp.call(this,index)
				})
			}else{
				this.setState({
					sort:"price",
					order:'asc',
					desc:true,
					currentPage:2
				},()=>{
					this.lineHttp.call(this,index)
				})
			}
			
		}
	}
	lineHttp (index) {
		this.http(this.state.item,1,this.state.sort,this.state.order).then(res=>{
			this.setState({
				data:res.data,
				linePage:index,
				currentPage:2
			})
		})
	}
	updateList (item,index) {
		this.setState({
			item:item.id,
			linePage:0,
			currentPage:2
		})
		this.http(item.id).then(res=>{
			this.setState({
				data:res.data,
				current:index
			})
		})
	}
    http (id,currentPage=1,sort="onShelfTime",order="desc") {
        return axios({
            url:`/pages/category/${id}?currentPage=${currentPage}&sort=${sort}&order=${order}`
        }).then(res=>{
            return res.data
        })
    }
    urlId () {
        return decodeURIComponent(this.props.location.search.split('?')[1].split('&')[0].split('=')[1])
    }
}

export default Topic;