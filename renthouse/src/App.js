import React from 'react'
import {Route, Link, Redirect} from 'react-router-dom'
import CityList from "./pages/CityList";
import Home from "./pages/Home";

import {Button} from "antd-mobile";

function App() {
  return (
    <div className="App">
      {/*配置导航菜单*/}

      {/*配置路由*/}
      {/*设置默认路由*/}
      <Route exact path="/" render={() => <Redirect to="/home"/>}/>
      <Route path="/home" component={Home}/>
      <Route path="/citylist" component={CityList}/>
    </div>
  );
}

export default App;
