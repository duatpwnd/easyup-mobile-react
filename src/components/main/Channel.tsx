import { Link } from "react-router-dom";
import "./Channel.scoped.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
const Channel = (prop) => {
    console.log('채널@@@@@@@@@@@@@@@@@@@')
    return (
        <div className="section swiper_section blog-section" >
            <div className="title-header">
                <h2 className="title">이지채널</h2>
                <span className="more-view-btn" >전체보기</span
                >
            </div>
            <Swiper
                spaceBetween={8}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => ""}
                onSlideChange={() => ""}
            >
                {prop.channel != undefined ? prop.channel.map((item, index) => (
                    <SwiperSlide key={index} className="slide">
                        <div className="item">
                            <span className="lecture-list">
                                <img src={item.thumbnail} />
                            </span>
                            <h2 className="subtitle" v-html="list.title"></h2>
                            <span className="date"
                            >{item.wdate_format} {item.writer}</span
                            >
                        </div>
                    </SwiperSlide>
                )) : ""}
            </Swiper>
        </div >
    )

}
export default Channel