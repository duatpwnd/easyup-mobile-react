import React from 'react';
import LoginForm from "components/login/LoginForm"
import { useCookies } from 'react-cookie';
import LoginGnb from "components/login/LoginGnb"
const LoginModal = () => {
    const [cookies] = useCookies(['userId']);
    console.log(cookies);
    return cookies.userId == undefined ? <LoginForm></LoginForm> : <LoginGnb></LoginGnb>
}
export default LoginModal