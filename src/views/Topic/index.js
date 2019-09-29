import React, { PureComponent } from 'react';
import store from '../../Rudex'
import isShow from './actionCreator'
import TopicHeader from './TopicHeader'
import axios from 'axios'
import style from './index.module.scss'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { Modal,Toast,ActivityIndicator } from 'antd-mobile';

const prompt = Modal.prompt;

class Topic extends PureComponent {
    state = {
        currentPage:2, // 数据请求 页数
        sort:'onShelfTime', //数据请求
        order:'desc', //数据请求
		current:0., //高亮
		linePage:0, //数据排序的高亮
		item:this.urlId(), //每次点击的id
		isShow:false, //回到顶部显示和隐藏
		desc:false, //价格的上下排序
		success:true, //loading...
        data: [], // 动态请求的数据
		loadName:'没有更多了', //最下方 提示
		lineHead:['上新','销量','价格'], //数据的排序
		filmData:[{id:35,soft:'All'},{id:20,soft:'沙发'},{id:21,soft:'椅凳'},{id:2310,soft:'床'},{id:24,soft:'柜架'},{id:2210,soft:'餐桌'},{id:2211,soft:'茶几和边桌'},{id:2212,soft:'书桌'}], //swiper
    }
	add; //懒加载的事件
	top; //回到顶部的事件
    render() {
		let { filmData, current, lineHead, linePage, desc, success, data, loadName, isShow } = this.state
        return (
            <div>
                <TopicHeader {...this.props}></TopicHeader>
                <div className={style.classify_swiper} style={{background:`url('/images/10.jpg') no-repeat`}}>
                    <div className={"swiper-container "+style.slider}>
                        <ul className="swiper-wrapper">
							{
								filmData.map(((item,index)=>
									<li
									className={"swiper-slide "+style.slide+(current===index?' '+style.header_active:'')} 
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
					{lineHead.map((res,index)=><li key={index}>
							<span 
							className={(linePage===index?style.line_page:'')} 
							onClick={this.linePageClick.bind(this,index)}>
								{res}{index===2?(desc?'↑':'↓'):null}
							</span>
						</li>
					)}
				</ul>
				<ActivityIndicator
					text="Loading..."
					size="large"
					animating={success}
					className={style.success}
				  />
                <ul className={style.list} ref="ulLastChild">
                    {
                        data.map((item,index)=>
						<li key={index} 
						onClick={() => prompt('数量', '请选择添加的个数', [
						  { text: '取消' },
						  { text: '添加', 
						  onPress: (value) => {
							  if(!parseFloat(value) || parseInt(value) > 99 || parseInt(value) <= 0 ){
								  Toast.info('数量错误，添加失败', 1.5);
								  return;
							  }
							  axios({
								  url:'/users',
								  method:'post',
								  data:{
									  name:item.productTitle,
									  img:item.productImg,
									  count:parseInt(value),
									  price:parseFloat(item.sellPrice)
								  }
							  }).then(res=>{
								  if(res.data.ok){
									  Toast.info('添加购物车成功', 1.5);
								  }
							  })
						  }},
						], 'default', '1')}
						>
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
				<div className={style.loadName}>{loadName}</div>
				{
					isShow?<div className={style.topic_top} onClick={this.toTop}>顶部</div>:null
				}
            </div>
        );
    }
	componentDidMount () {
		var start = Date.now()
		// axios({
		// 	url:'/users'
		// }).then(res=>{
		// 	console.log(res.data)
		// })
	    setTimeout(()=>{
	        store.dispatch(isShow(false))
	    },0)
	    this.http(this.urlId()).then(data=>{
	        this.setState({
	            data: data.data,
				success:false
	        })
	    })
	    new Swiper('.swiper-container', {
	        slidesPerView: 3,
	        spaceBetween: 30,
	        freeMode: true
	    });
		window.addEventListener('scroll',this.add=()=>{
			var now = Date.now()
			this.setState({
				loadName:'加载数据中...'
			})
			if (now - start <= 300) {
				return;
			}
			start = now
			if (this.refs.ulLastChild.lastChild.getBoundingClientRect().y <= window.innerHeight) {
				this.http(this.state.item,this.state.currentPage).then(res=>{
					if(res.data.length===0){
						window.removeEventListener('scroll',this.add)
						this.setState({
							loadName:'没有更多了'
						})
						return;
					}
					this.setState({
						currentPage:this.state.currentPage+1,
						data:[...this.state.data,...res.data],
					})
				})
			}
		})
		window.addEventListener('scroll',this.top=()=>{
			if((document.documentElement.scrollTop || document.body.scrollTop) >= 800){
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
		window.removeEventListener('scroll',this.top)
        setTimeout(()=>{
            store.dispatch(isShow(true))
        },0)
    }
	lineHeadSort = (sort,order,index,desc=false) => {
		this.setState({
			sort:sort,
			order:order,
			desc:desc,
			currentPage:2
		},()=>{
			this.lineHttp.call(this,index)
		})
	}
	linePageClick (index) {
		window.removeEventListener('scroll',this.add)
		window.addEventListener('scroll',this.add)
		if(index===0){
			this.lineHeadSort("onShelfTime","desc",index)
		}else if(index===1){
			this.lineHeadSort("sales","desc",index)
		}else{
			if(this.state.desc){
				this.lineHeadSort("price","desc",index)
			}else{
				this.lineHeadSort("price","asc",index,true)
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
		window.removeEventListener('scroll',this.add)
		window.addEventListener('scroll',this.add)
		this.setState({
			item:item.id,
			linePage:0
		})
		this.http(item.id).then(res=>{
			this.setState({
				data:res.data,
				current:index,
				currentPage:2
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
	toTop () {
		document.documentElement.scrollTop = 0
	}
	pushToCart (item) {
		console.log(item.productTitle)
		console.log(item.productImg)
		console.log(item.sellPrice)
	}
    urlId () {
        return decodeURIComponent(this.props.location.search.split('?')[1].split('&')[0].split('=')[1])
    }
}

export default Topic;