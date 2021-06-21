import "./LoginGnb.scss"
import BaseButton from "../common/BaseButton"
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { Link } from "react-router-dom";
import LoginForm from "components/login/LoginForm"
const LoginGnb = () => {
    const [isLogout, logoutComplete] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies();
    const logout = () => {
        removeCookie('userId');
        logoutComplete(false)
    }
    return (
        isLogout ? <div className="menu_modal">
            <div className="profile">
                <span className="profile_ico">
                </span>
                <h2></h2>
                <h3></h3>
            </div>

            <div className="lnb_menu">
                <button className="lnb arrow">강의</button>
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
        </div> : <LoginForm></LoginForm>
    )
}
export default LoginGnb