import React, {Component} from 'react';
import {Carousel, Flex, Grid, WingBlank} from 'antd-mobile';

import axios from "axios";

//导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

import {getCurrentCity} from "../../utils";

import './index.scss'

// 导入搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  }
]

//获取地理位置信息
// navigator.geolocation.getCurrentPosition(position => {
//   console.log(position)
// })

class Index extends Component {
  state = {
    //轮播图状态数据
    swipers: [],
    isSwiperLoaded: false,
    //租房小组数据
    groups: [],
    //最新资讯
    news: [],
    // 当前城市名称
    curCityName: '上海'

  }
  //获取轮播图数据
  getSwipers = async () => {
    const res = await axios.get('http://localhost:8080/home/swiper');
    // console.log(res)
    this.setState(() => {
      return {
        swipers: res.data.body,
        isSwiperLoaded: true
      }
    })
  }

  //获取租房小组数据
  getGroups = async () => {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'area=AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    this.setState({
      groups: res.data.body
    })
  }

  //获取最新资讯
  async getNews() {
    const res = await axios.get(
      'http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    )

    this.setState({
      news: res.data.body
    })
  }

  async componentDidMount() {
    //获取数据
    this.getSwipers();

    //获取租房小组数据
    this.getGroups();

    //获取最新数据
    this.getNews()

    //获取当前城市名称
    // var myCity = new window.BMapGL.LocalCity();
    // myCity.get( async res=>{
    //   // console.log(res)
    //   const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
    //   // console.log(result)
    //   this.setState({
    //     curCityName:result.data.body.label
    //   })
    // });
    const curCity = await getCurrentCity()
    this.setState({
      curCityName:curCity.label
    })
  }

  //渲染轮播图结构
  renderSwipers = () => {
    return (
      this.state.swipers.map(item => (
        <a
          key={item.id}
          href="http://itcat.cn"
          style={{display: 'inline-block', width: '100%', height: 212}}
        >
          <img
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
            style={{width: '100%', verticalAlign: 'top'}}
          />
        </a>
      ))
    )
  }

  //渲染导航菜单
  renderNav = () => {
    return navs.map(item => (
      <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
        <img src={item.img} alt=""/>
        <h2>{item.title}</h2>
      </Flex.Item>
    ))
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  render() {
    return (
      <div className="index">
        {/*轮播图*/}
        <div className="swiper">
          {
            this.state.isSwiperLoaded ?
              <Carousel autoplay={true} infinite>
                {this.renderSwipers()}
              </Carousel> : ''
          }
          {/* 搜索框 */}
          <SearchHeader cityName={this.state.curCityName} />
        </div>
        {/*导航菜单*/}
        <Flex className="nav">
          {this.renderNav()}
        </Flex>

        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>

          {/* 宫格组件 */}
          <Grid
            data={this.state.groups}
            columnNum={2}
            // 不设置为正方形
            square={false}
            // 是否有边框
            hasLine={false}
            renderItem={item => (
              <Flex className="group-item" justify="around" key={item.id}>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt=""/>
              </Flex>
            )}
          />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>

      </div>
    );
  }
}

export default Index;