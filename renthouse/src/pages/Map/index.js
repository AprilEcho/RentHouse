import React, {Component} from 'react';

import NavHeader from "../../components/NavHeader";

import './index.scss'
class Map extends Component {
  componentDidMount() {
    //初始化地图实例
    var map = new window.BMapGL.Map("container");
    //设置中心坐标
    var point = new window.BMapGL.Point(116.404, 39.915);
    //初始化地图
    map.centerAndZoom(point, 15);
  }

  render() {
    return (
      <div className="map">
        <NavHeader
          // onLeftClick={()=>{console.log('点击左侧按钮')}}
        >
          地图找房
        </NavHeader>
        {/*地图容器*/}
        <div id="container"/>
      </div>
    );
  }
}

export default Map;