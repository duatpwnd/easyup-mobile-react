import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import rootReducer from "src/reducers";
import { createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const store = createStore(rootReducer);
const cookieParser = JSON.parse(Cookies.get("user_info"));
axios.defaults.baseURL = "https://www.easyupclass.com"
axios.interceptors.request.use(request => {
  request.headers.Authorization =
    "Bearer " + cookieParser.access_token;
  request.headers.common["Authorization"] =
    "Bearer " + cookieParser.access_token;
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // Edit response config
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
