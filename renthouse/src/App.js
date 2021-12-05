import React from 'react'
import {Route, Link} from 'react-router-dom'
import CityList from "./pages/CityList";
import Home from "./pages/Home";

import {Button} from "antd-mobile";

function App() {
  return (
    <div className="App">
      {/*配置导航菜单*/}
      <ul>
        <li><Link to="/home">首页</Link></li>
        <li><Link to="/citylist">城市选择</Link></li>
      </ul>
      {/*配置路由*/}
      <Route path="/home" component={Home}/>
      <Route path="/citylist" component={CityList}/>
    </div>
  );
}

export default App;
