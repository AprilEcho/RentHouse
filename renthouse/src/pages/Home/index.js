import React, {Component} from 'react';
import {Route} from "react-router-dom";
import News from "../News";
import HouseList from "../HouseList";
import Profile from "../Profile";
import Index from "../Index";
// 导入TabBar
import {TabBar} from 'antd-mobile'

import './index.css'


// TabBar 数据
const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]

class Home extends Component {
  state = {
    selectedTab: this.props.location.pathname
  }

  //路由切换tabBar组件不高亮
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps)
    if (prevProps.location.pathname !== this.props.location.pathname) {
      //路由发生切换
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  //渲染TabBar.Item
  renderTabBarItem = () => {
    return tabItems.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`}/>}
        selectedIcon={<i className={`iconfont ${item.icon}`}/>}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path
          })
          // 路由切换
          this.props.history.push(item.path)
        }}
      ></TabBar.Item>
    ))
  }

  render() {
    return (
      <div className="home">
        {/*渲染子路由*/}
        <Route exact path="/home" component={Index}/>
        <Route path="/home/list" component={HouseList}/>
        <Route path="/home/news" component={News}/>
        <Route path="/home/profile" component={Profile}/>
        {/*底部组件*/}
        <TabBar tintColor="#21b97a" barTintColor="white" noRenderContent={true}>
          {/*每个item*/}
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    );
  }
}

export default Home;