import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import CityList from "./pages/CityList";
import Home from "./pages/Home";
import Map from "./pages/Map";
import HouseDetail from "./pages/HouseDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthRoute from "./components/AuthRoute";
function App() {
  return (
    <div className="App">
      {/*配置导航菜单*/}

      {/*配置路由*/}
      {/*设置默认路由*/}
      <Route exact path="/" render={() => <Redirect to="/home"/>}/>
      <Route path="/home" component={Home}/>
      <Route path="/citylist" component={CityList}/>
      <Route path="/map" component={Map}/>
      {/* 房源详情的路由规则： */}
      <Route path="/detail/:id" component={HouseDetail} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile}/>
    </div>
  );
}

export default App;
