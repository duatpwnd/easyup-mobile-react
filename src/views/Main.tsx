import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Main.scss"
import { useCookies } from 'react-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import BaseSearchInput from 'src/components/common/BaseSearchInput';
import Category from 'src/components/main/Category';
import RecommendLecture from 'src/components/main/RecommendLecture';
import Channel from 'src/components/main/Channel';
import SwiperCore, {
    Autoplay
} from 'swiper/core';
SwiperCore.use([Autoplay]);
const Main = () => {
    const title = useRef([
        "이지업에서 쉽고 빠르게 성장하세요!",
        "소스도 먼저 코딩하는 놈이 낫다",
        "발 없는 소스가 천리간다",
        "고와도 내 코드 미워도 내 코드",
        "내가 짠 코드가 세상을 바꾼다",
        "짰슈?",
        "응 짰슈.",
    ])
    const [list, listSet] = useState<{ [key: string]: any }>({})
    const [keyword, search] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();
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
        const data = {
            action: "main_page_list",
        };
        axios.post("/main/mobileAPI/v1.php", JSON.stringify(data)).then((result) => {
            console.log('메인페이지 api:', result);
            listSet(result.data.data);
        })
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
                {list.banner != undefined ? list.banner.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.image_url} />
                    </SwiperSlide>

                )) : ""}
            </Swiper>

            <div className="section search-section">
                <h2 className="main-title">
                    {cookies.search_title != undefined ? title.current[cookies.search_title.num] : ""}
                </h2>
                <BaseSearchInput placeholder="배우고 싶은 강의를 입력해보세요."
                    right={
                        <button
                            className="search-btn"
                        ></button>
                    }
                >
                </BaseSearchInput>
            </div>
            <Category></Category>
            <RecommendLecture lecture={list.popular_lecture}></RecommendLecture>
            <Channel channel={list.techblog_post}></Channel>
        </main >
    )
}
export default Main