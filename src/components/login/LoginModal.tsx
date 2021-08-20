import LoginForm from "components/login/LoginForm"
import LoginGnb from "components/login/LoginGnb"
import { useSelector } from "react-redux";
import Store from "src/reducers/index"
import React from "react";
const LoginModal = () => {
    console.log('LoginModal========================================');
    const userInfo = useSelector((state: ReturnType<typeof Store>) => {
        return (state.userInfoSet.userInfo) as { [key: string]: any }
    })
    console.log(userInfo);
    return userInfo == null ? <LoginForm></LoginForm> : <LoginGnb></LoginGnb>
}
export default LoginModal