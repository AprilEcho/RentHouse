import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";

//导入样式
import 'antd-mobile/dist/antd-mobile.css'
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, document.getElementById('root')
);

