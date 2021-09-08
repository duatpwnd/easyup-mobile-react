import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "./Main.scss"
import { useCookies } from 'react-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import BaseSearchInput from 'src/components/common/BaseSearchInput';
import Category from 'src/components/main/Category';
import Hoc from 'src/components/Hoc';
import SwiperCore, {
    Autoplay
} from 'swiper/core';
SwiperCore.use([Autoplay]);
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
const LectureList = (prop) => {
    console.log(prop);
    return (
        <div className="section swiper_section" >
            <div className="title-header">
                <h2 className="title">{prop.title}</h2>
                <Link to={{
                    pathname: "/category", state: {
                        title: "전체",
                        category_code: "ALL",
                        action: "get_course_list",
                        keyword: "",
                        pageCurrent: 1,
                        order: prop.title == '추천강의' ? 'type_rating' : 'type_date',
                    }
                }} className="more-view-btn" >전체보기</Link>
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
                {prop.lecture != undefined ? prop.lecture.map((item, index) => (
                    <SwiperSlide key={index} className="slide">
                        <div className="item">
                            <Link to={{
                                pathname: "/lectureDetail",
                                state: {
                                    id: item.id
                                }
                            }}>
                                <span className="lecture-list">
                                    <img src={item.image_url} />
                                </span>
                            </Link>
                            <div className="evaluate">
                                <h4 >{item.teachers}</h4>
                                <h2 className="subtitle">{item.title}</h2>
                                <span className="score">{item.ranking}</span>
                                {item.price.is_free ? <h1 className="free">
                                    FREE
                                </h1> : <span className="price" >
                                    {item.price.format_original != item.price.format_final ? <del
                                        className="original"
                                    >{item.price.format_original}</del> : ""
                                    }
                                    <span className="final">{item.price.format_final}</span>
                                </span>
                                }
                            </div>
                        </div>
                    </SwiperSlide>
                )) : ""}
            </Swiper>
        </div >
    )
}
const Main = ({ data }) => {
    console.log('Main========================================', data);
    const title = useRef([
        "이지업에서 쉽고 빠르게 성장하세요!",
        "소스도 먼저 코딩하는 놈이 낫다",
        "발 없는 소스가 천리간다",
        "고와도 내 코드 미워도 내 코드",
        "내가 짠 코드가 세상을 바꾼다",
        "짰슈?",
        "응 짰슈.",
    ])
    const [keyword, search] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory();
    const lectureSearch = () => {
        history.push({
            pathname: "/category",
            state: {
                action: "get_course_list",
                pageCurrent: 1,
                order: "type_date",
                keyword: keyword,
                category_code: "ALL",
            }
        })
    }
    useEffect(() => {
        // 새로고침감지
        const isOnIOS =
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPhone/i);
        const eventName = isOnIOS ? "pagehide" : "beforeunload";
        window.addEventListener(eventName, (event) => {
            setCookie('search_title', {
                num: cookies.search_title.num + 1,
            });
            if (cookies.search_title.num + 1 >= title.current.length) {
                setCookie('search_title', {
                    num: 0,
                });
            }
        });
        if (cookies.search_title == undefined) {
            setCookie('search_title', {
                num: 0,
            });
        }
    }, [])
    return (
        <main >
            <Swiper
                slidesPerView={1}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => ""}
                onSlideChange={() => ""}
            >
                {data.banner != undefined ? data.banner.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.image_url} />
                    </SwiperSlide>

                )) : ""}
            </Swiper>

            <div className="section search-section">
                <h2 className="main-title">
                    {cookies.search_title != undefined ? title.current[cookies.search_title.num] : ""}
                </h2>
                <BaseSearchInput placeholder="배우고 싶은 강의를 입력해보세요." keywordEvent={search} buttonEvent={lectureSearch} >
                </BaseSearchInput>
            </div>
            <Category></Category>
            <LectureList title="추천강의" lecture={data.popular_lecture}></LectureList>
            <Channel channel={data.techblog_post}></Channel>
            <LectureList title="인기강의" lecture={data.latest_lecture}></LectureList>
        </main >
    )
}
export default Hoc({
    action: "main_page_list",
})(React.memo(Main, (prev, next) => {
    console.log('@@@@@@@@@@@@@@@a', prev, next);
    if (prev.data != next.data) {
        return false;
    } else {
        return true;
    }
}))