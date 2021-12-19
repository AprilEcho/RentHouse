import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import CityList from "./pages/CityList";
import Home from "./pages/Home";
import Map from "./pages/Map";
import HouseDetail from "./pages/HouseDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthRoute from "./components/AuthRoute";
import Rent from "./pages/Rent";
import RentAdd from "./pages/Rent/Add";
import RentSearch from "./pages/Rent/Search";
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
      {/*配置登陆后才能访问的页面*/}
      <AuthRoute exact path="/rent" component={Rent}></AuthRoute>
      <AuthRoute path="/rent/add" component={RentAdd}></AuthRoute>
      <AuthRoute path="/rent/search" component={RentSearch}></AuthRoute>
    </div>
  );
}

export default App;
