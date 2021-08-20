import "./LoginGnb.scss"
import BaseButton from "../common/BaseButton"
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Store from "src/reducers/index"
import LectureList from "components/login/LectureList"
import * as user from "src/action/userInfo"
import React from "react";

const LoginGnb = () => {
    console.log('LoginGnb========================================');
    const [lectureList, lectureListActive] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: ReturnType<typeof Store>) => {
        return (state.userInfoSet.userInfo) as { [key: string]: any }
    })
    const logout = () => {
        removeCookie('user_info');
        dispatch(user.userInfoSet({
            userInfo: null
        }))
    }
    return (
        lectureList == false ? <div className="menu_modal">
            <div className="profile">
                <span className="profile_ico">
                    <img
                        src={userInfo.profile_image}
                        alt="프로필 이미지"
                        title="프로필 이미지"
                    />
                </span>
                <h2>{userInfo.username}</h2>
                <h3>{userInfo.email}</h3>
            </div>
            <div className="lnb_menu">
                <button className="lnb arrow" onClick={() => lectureListActive(true)}>강의</button>
                <button
                    className="lnb arrow">
                    코스
                </button>
                <button
                    className="lnb"
                >
                    이지채널
                </button>
                <Link to="myClass">
                    <button
                        className="lnb arrow"
                    >
                        내강의실
                    </button>
                </Link>
                <button
                    className="lnb"
                >
                    이지잡
                </button>
                <button
                    className="lnb"
                >
                    개인정보 확인/수정
                </button>
            </div>
            <div className="support">
                <button
                >
                    공지사항
                </button>
                <button
                    className="faq_btn"
                >
                    FAQ
                </button>
                <button
                >
                    1:1문의
                </button>
            </div>
            <div className="logout">
                <BaseButton name='로그아웃' handleClick={logout}></BaseButton>
            </div>
        </div> : <LectureList eventHandler={lectureListActive}></LectureList>

    )
}
export default React.memo(LoginGnb)