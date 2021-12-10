import React, {Component} from 'react';
import axios from "axios";
import NavHeader from "../../components/NavHeader";
import styles from './index.module.css'
// 解决脚手架中全局变量访问的问题
const BMapGL = window.BMapGL
// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}

class Map extends Component {

  componentDidMount() {
    this.initMap()
  }

  //初始化地图
  initMap = () => {

    //获取当前定位城市
    const {label, value} = JSON.parse(localStorage.getItem('hkzf_city'));
    // console.log(label, value)

    //初始化地图实例
    var map = new BMapGL.Map("container");
    // //设置中心坐标
    // var point = new window.BMapGL.Point(116.404, 39.915);
    // //初始化地图
    // map.centerAndZoom(point, 15);

    //创建地址解析器实例
    const myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(label, async (point) => {
      if (point) {
        //初始化地图
        map.centerAndZoom(point, 11);

        map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
        map.addControl(new BMapGL.ZoomControl());// 添加缩放控件

        //获取房源数据
        const res = await axios.get(`http://localhost:8080/area/map?id=${value}`);
        // console.log(res)
        res.data.body.forEach(item=>{
          //为每一条数据添加覆盖物
          const {
            label:areaName,
            coord:{longitude,latitude},
            count,
            value} = item
          const areaPoint = new BMapGL.Point(longitude,latitude)
          var opts = {
            position: areaPoint, // 指定文本标注所在的地理位置
            offset: new BMapGL.Size(-35, -35) // 设置文本偏移量
          };
          // 创建文本标注对象
          //设置setContent之后，第一个参数就失效了
          const label = new BMapGL.Label('', opts);

          //给label对象添加唯一标识
          label.id = value

          // 设置房源覆盖物内容
          label.setContent(`
          <div class="${styles.bubble}">
            <p class="${styles.name}">${areaName}</p>
           <p>${count}套</p>
         </div>
        `)

          // 自定义文本标注样式
          label.setStyle(labelStyle);

          //添加点击事件
          label.addEventListener('click', () => {
            //放大地图
            map.centerAndZoom(areaPoint, 13)

            //清除覆盖物
            map.clearOverlays()
          })

          //添加覆盖物到地图
          map.addOverlay(label);
        })
      } else {
        alert('您选择的地址没有解析到结果！');
      }
    }, label)
  }

  render() {
    return (
      <div className={styles.map}>
        <NavHeader
          // onLeftClick={()=>{console.log('点击左侧按钮')}}
        >
          地图找房
        </NavHeader>
        {/*地图容器*/}
        <div id="container" className={styles.container}/>
      </div>
    );
  }
}

export default Map;