import './App.scss';
import 'src/assets/scss/common.scss'
import Header from "src/components/layout/Header"
import Footer from "src/components/layout/Footer"
import LoginModal from "src/components/login/LoginModal"
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';
import { Route } from "react-router-dom";
import Store from "src/reducers/index"
import SignUp from './views/SignUp';
import Main from './views/Main';
import CsCenter from "./views/CsCenter"
import MyClass from "./views/MyClass"
import LectureDetail from "./views/LectureDetail"
import GuideMsgModal from "src/components/common/GuideMsgModal"
import * as toggle from "src/action/modal"
import * as user from "src/action/userInfo"

const App = () => {
  const { loginModal, mask, guideMsgModal } = useSelector((state: ReturnType<typeof Store>) => {
    return state.modalState
  })
  const dispatch = useDispatch();
  const maskToggle = () => {
    dispatch(toggle.maskModal({ mask: false }))
  }
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    if (cookies.user_info != null) {
      console.log('유저정보있습니다.');
      dispatch(user.userInfoSet({
        userInfo: cookies.user_info.info
      }))
    }
  })
  return (
    <div className="app">
      <Header></Header>
      {mask ? <div className="mask" onClick={maskToggle}></div> : null}
      {loginModal ? <LoginModal></LoginModal> : null}
      {guideMsgModal ? <GuideMsgModal></GuideMsgModal> : null}
      <Route exact path="/" component={Main}></Route>
      <Route path="/signUp" component={SignUp}></Route>
      <Route path="/pwFind"></Route>
      <Route path="/csCenter" component={CsCenter}></Route>
      <Route path="/myClass" component={MyClass}></Route>
      <Route path="/LectureDetail" component={LectureDetail}></Route>
      <Footer></Footer>
    </div>
  )
}
export default App;
