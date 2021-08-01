import './App.scss';
import 'src/assets/scss/common.scss'
import Header from "src/components/layout/Header"
import Footer from "src/components/layout/Footer"
import LoginModal from "src/components/login/LoginModal"
import { useSelector, useDispatch } from "react-redux";
import Store from "src/reducers/index"
import { Route } from "react-router-dom";
import SignUp from './views/SignUp';
import Main from './views/Main';
import CsCenter from "./views/CsCenter.jsx"
import MyClass from "./views/MyClass.jsx"
import * as toggle from "src/action/toggle"

const App = () => {
  const { loginModal, mask } = useSelector((state: ReturnType<typeof Store>) => {
    return state.toggleState
  })
  const dispatch = useDispatch();
  const maskToggle = () => {
    dispatch(toggle.maskModal({ mask: false }))
  }
  return (
    <div className="app">
      <Header></Header>
      {mask ? <div className="mask" onClick={maskToggle}></div> : null}
      {loginModal ? <LoginModal></LoginModal> : null}
      <Route path="/" component={Main}></Route>
      <Route path="/signUp" component={SignUp}></Route>
      <Route path="/pwFind"></Route>
      <Route path="/csCenter" component={CsCenter}></Route>
      <Route path="/myClass" component={MyClass}></Route>
      <Footer></Footer>
    </div>
  )
}
export default App;
