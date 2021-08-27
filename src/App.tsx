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
import LectureList from "src/views/LectureList"
import * as toggle from "src/action/modal"
import * as user from "src/action/userInfo"

const App = () => {
  console.log('App========================================');
  const { loginModal, mask, guideMsgModal } = useSelector((state: ReturnType<typeof Store>) => {
    return state.modalState
  })
  const dispatch = useDispatch();
  const maskToggle = () => {
    dispatch(toggle.modalAction({ loginModal: false, mask: false, guideMsgModal: false }))
  }
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    if (cookies.user_info != null) {
      dispatch(user.userInfoSet({
        userInfo: cookies.user_info.info
      }))
    }
  }, [])
  return (
    <div className="app">
      <Header></Header>
      {mask && <div className="mask" onClick={maskToggle}></div>}
      {loginModal && <LoginModal></LoginModal>}
      {guideMsgModal && <GuideMsgModal></GuideMsgModal>}
      <Route exact path="/" component={Main}></Route>
      <Route path="/signUp" component={SignUp}></Route>
      <Route path="/pwFind"></Route>
      <Route path="/csCenter" component={CsCenter}></Route>
      <Route path="/myClass" component={MyClass}></Route>
      <Route path="/LectureDetail" component={LectureDetail}></Route>
      <Route path="/category" component={LectureList}></Route>
      <Footer></Footer>

    </div>
  )
}
export default App;
