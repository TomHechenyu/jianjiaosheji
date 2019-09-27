import React, { Component } from 'react';
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import style from './index.module.scss'

class Swipe extends Component {
    render () {
        return <div>
            <div className="swiper-container">
                <ul className="swiper-wrapper">
                    <li className={"swiper-slide "+style.content}>Slide 1</li>
                </ul>
            </div>
        </div>
    }
    componentDidMount () {
        new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}
export default Swipe