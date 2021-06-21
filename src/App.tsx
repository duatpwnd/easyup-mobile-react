import './App.scss';
import 'src/assets/scss/common.scss'
import Header from "components/layout/Header"
import Footer from "components/layout/Footer"
import LoginModal from "components/login/LoginModal"
import { useSelector, useDispatch } from "react-redux";
import Store from "src/reducers/index"
import { Route } from "react-router-dom";
import SignUp from './views/SignUp';
import CsCenter from "./views/CsCenter.jsx"
import MyClass from "./views/MyClass.jsx"
import * as toggle from "src/action/toggle"

function App() {
  const { loginModal, mask } = useSelector((state: ReturnType<typeof Store>) => {
    console.log(state);
    return state.toggleState
  });
  console.log(loginModal, mask);
  const dispatch = useDispatch();
  const menuToggle = () => {
    dispatch(toggle.loginModal());
  }
  const maskToggle = () => {
    console.log('마스크토글');
    dispatch(toggle.maskModal({ mask: false }))
  }
  return (
    <div className="app">
      <Header></Header>
      {mask ? <div className="mask" onClick={maskToggle}></div> : null}
      {loginModal ? <LoginModal></LoginModal> : null}
      <Route path="/"></Route>
      <Route path="/signUp" component={SignUp}></Route>
      <Route path="/pwFind"></Route>
      <Route path="/csCenter" component={CsCenter}></Route>
      <Route path="/myClass" component={MyClass}></Route>
      <Footer></Footer>
    </div>
  )
}
export default App;
