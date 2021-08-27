import { useState, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./LoginForm.scss"
import BaseButton from "src/components/common/BaseButton"
import axios from 'axios';
import React from 'react';
import * as toggle from "src/action/modal"
import * as user from "src/action/userInfo"

const LoginForm = () => {
    console.log('LoginForm========================================');
    const [userid, setId] = useState("");
    const [userpw, setPwd] = useState("");
    const [cookies, setCookie] = useCookies();
    const dispatch = useDispatch();
    const menuToggle = (): void => {
        dispatch(toggle.modalAction({
            loginModal: false,
            mask: false,
        }
        ));
    }
    // admin
    // dnlwmvpdl#0119
    const login = () => {
        console.log(userid, userpw);
        const data = {
            action: "login",
            userid: "admin",
            userpw: "dnlwmvpdl#0119"
        }
        if (data.userid.trim().length == 0 || data.userpw.trim().length == 0) {
            dispatch(toggle.modalAction({ guideMsgModal: true, guideMessage: "아이디 또는 비밀번호를 입력해주세요", mask: true }));
        } else {
            axios.post("", JSON.stringify(data)).then((result) => {
                console.log(result)
                dispatch(user.userInfoSet({
                    userInfo: result.data.data[0].info
                }))
                setCookie('user_info', result.data.data[0]);
            })
        }
    }

    return <div className="menu-modal">
        <form className="login-form">
            <fieldset>
                <legend>로그인정보</legend>
                <input
                    type="text"
                    className="user_id"
                    placeholder="사용자명"
                    value={userid}
                    onChange={(e) => {
                        setId(e.currentTarget.value);
                    }}
                />
                <input
                    type="password"
                    className="user-pw"
                    placeholder="패스워드"
                    autoComplete="true"
                    value={userpw}
                    onChange={(e) => {
                        setPwd(e.currentTarget.value);
                    }}
                />
                <BaseButton name='로그인' handleClick={login}></BaseButton>
            </fieldset>
        </form>
        <div className="user-find">
            <Link to="/signUp" onClick={menuToggle}>
                <span >회원가입</span>
            </Link>
            <Link to="/pwFind" onClick={menuToggle}>
                <span className="forget"
                >비밀번호 분실</span>
            </Link>
        </div>
        <div className="lec-course">
            <button className="lec arrow" >강의</button>
            <button className="course arrow">코스</button>
            <button className="blog">이지채널</button>
        </div>
        <div className="support">
            <Link to="/csCenter/notice" onClick={menuToggle}>
                <button>공지사항</button>
            </Link>
            <Link to="/csCenter/faq" onClick={menuToggle}>
                <button className="faq-btn">FAQ</button>
            </Link>
            <Link to="/csCenter/inquiry" onClick={menuToggle}>
                <button>1:1문의</button>
            </Link>
        </div>
    </div>
}
export default LoginForm