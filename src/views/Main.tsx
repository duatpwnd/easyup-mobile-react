import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "./Main.scss"
import { useCookies } from 'react-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import BaseSearchInput from 'src/components/common/BaseSearchInput';
import Category from 'src/components/main/Category';
import LatestLecture from 'src/components/main/LatestLecture';
import RecommendLecture from 'src/components/main/RecommendLecture';
import Channel from 'src/components/main/Channel';
import Hoc from 'src/components/Hoc';
import SwiperCore, {
    Autoplay
} from 'swiper/core';
SwiperCore.use([Autoplay]);
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
            <RecommendLecture lecture={data.popular_lecture}></RecommendLecture>
            <Channel channel={data.techblog_post}></Channel>
            <LatestLecture lecture={data.latest_lecture}></LatestLecture>
        </main >
    )
}
export default Hoc({
    action: "main_page_list",
})(Main)