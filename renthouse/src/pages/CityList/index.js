import React, {Component} from 'react';

//导入NavBar组件
import { NavBar, Icon } from 'antd-mobile';

import './index.scss'

class CityList extends Component {
  render() {
    return (
      <div className="citylist">
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back"/> }
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
      </div>
    );
  }
}

export default CityList;