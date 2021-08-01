import { useState } from 'react';
import "./LoginForm.scss"
import BaseButton from "src/components/common/BaseButton"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import LoginGnb from "src/components/login/LoginGnb"
import { useDispatch } from "react-redux";
import * as toggle from "src/action/toggle"

const LoginForm = () => {
    const [isLogin, loginComplete] = useState(true)
    const [userid, setId] = useState("");
    const [userpw, setPwd] = useState("");
    const [cookies, setCookie] = useCookies();
    const dispatch = useDispatch();
    const menuToggle = (): void => {
        dispatch(toggle.loginModal());
    }
    const login = () => {
        console.log('login');
        const data = {
            action: "login",
            userid: userid,
            userpw: userpw
        }
        console.log(data);
        if (userid.trim().length == 0 || userpw.trim().length == 0) {
            dispatch(toggle.guideMsgModal({ message: "아이디 또는 비밀번호를 입력해주세요" }));
        } else {


            axios.post("/main/mobileAPI/v1.php", JSON.stringify(data)).then((result) => {
                setCookie('user_info', result.data.data[0]);
                loginComplete(false)
            })
        }
    }
    return (isLogin ? <div className="menu-modal">
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
            <Link to="/pwFind">
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
            <Link to="/csCenter/notice">
                <button>공지사항</button>
            </Link>
            <Link to="/csCenter/faq">
                <button className="faq-btn">FAQ</button>
            </Link>
            <Link to="/csCenter/inquiry">
                <button>1:1문의</button>
            </Link>
        </div>
    </div> : <LoginGnb></LoginGnb>)
}
export default LoginForm