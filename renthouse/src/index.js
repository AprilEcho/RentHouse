import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from "react-router-dom";

//导入样式
import 'antd-mobile/dist/antd-mobile.css'

import 'react-virtualized/styles.css'

import './assets/fonts/iconfont.css'

import './index.css';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, document.getElementById('root')
);

