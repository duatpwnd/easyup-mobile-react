import './App.scss';
import 'src/assets/scss/common.scss'
import Header from "src/components/layout/Header"
import Footer from "src/components/layout/Footer"
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
import styled from "styled-components";
import LectureList from "src/views/LectureList"
import LoginForm from "components/login/LoginForm"
import LoginGnb from "components/login/LoginGnb"
import * as toggle from "src/action/modal"
import * as user from "src/action/userInfo"
const Mask = () => {
  const { mask } = useSelector((state: ReturnType<typeof Store>) => {
    return state.modalState
  })
  const dispatch = useDispatch();
  const maskToggle = () => {
    dispatch(toggle.modalAction({ loginModal: false, mask: false, guideMsgModal: false }))
  }
  return (
    mask ? <div className="mask" onClick={maskToggle}></div> : null
  )
}
// 로그인 모달
const LoginModal = () => {
  const { modalState, userInfoSet } = useSelector((state: ReturnType<typeof Store>) => {
    console.log(state);
    return state
  })
  return modalState.loginModal ? userInfoSet.userInfo == null ? <LoginForm></LoginForm> : <LoginGnb></LoginGnb> : null
}
// 안내 메시지 모달 :: S 
const GuideModal = () => {
  const { guideMsgModal, guideMessage } = useSelector((state: ReturnType<typeof Store>) => {
    return state.modalState
  });
  return guideMsgModal ? <StyledDiv>
    <P className="contents" dangerouslySetInnerHTML={{ __html: guideMessage as string }}>
    </P>
    <Button className="ok" >확인</Button>
  </StyledDiv> : null
}
const StyledDiv = styled.div`
  background: white;
  max-width: 720px;
  width: 80%;
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
`;
const P = styled.p`
    font-size: 16px;
    text-align: center;
    margin-bottom: 20px;
`;
const Button = styled.button`
  text-align: center;
  width: 50%;
`;
// 안내 메시지 모달 :: E 
const App = () => {
  console.log('App========================================');
  const dispatch = useDispatch();
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
      <Mask></Mask>
      <LoginModal></LoginModal>
      <GuideModal></GuideModal>
      <Route exact path="/" component={Main}></Route>
      <Route path="/signUp" component={SignUp}></Route>
      <Route path="/pwFind"></Route>
      <Route path="/csCenter" component={CsCenter}></Route>
      <Route exact path="/myClass" component={MyClass}></Route>
      <Route path="/LectureDetail" component={LectureDetail}></Route>
      <Route path="/category" component={LectureList}></Route>
      <Footer></Footer>
    </div>
  )
}
export default App;
