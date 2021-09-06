import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import rootReducer from "src/reducers";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { createLogger } from "redux-logger"
const cookies = new Cookies();
const logger = createLogger()
export const store = createStore(rootReducer, applyMiddleware(logger));
axios.defaults.baseURL = "https://www.easyupclass.com/main/mobileAPI/v1.php"
axios.interceptors.request.use(request => {
  const userInfo = cookies.get("user_info")
  if (userInfo != undefined) {
    request.headers.Authorization =
      "Bearer " + userInfo.access_token;
    request.headers.common["Authorization"] =
      "Bearer " + userInfo.access_token;
  }
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if (response.data.type == "token") {
    console.log('토큰에러');
    // 토큰이없을경우 마지막 url 기억
    // store.commit("userStore/referer", router.currentRoute.fullPath);
    store.dispatch({
      type: "modal/MODAL_CHANGE",
      payload: {
        guideMsgModal: true,
        guideMessage: "아이디 또는 비밀번호를 입력해주세요"
      }
    });
    // Vue.logOut();
  }
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
