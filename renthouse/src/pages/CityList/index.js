import React, {Component} from 'react';

//导入axios
import axios from "axios";


//导入NavBar组件
import {NavBar, Icon,Toast} from 'antd-mobile';

//导入List组件
import {List, AutoSizer} from "react-virtualized";

import './index.scss'

import {getCurrentCity} from '../../utils'
import NavHeader from "../../components/NavHeader";

//数据格式化的方法
const formatCityData = (list) => {
  const cityList = {}
  // const cityIndex = []
  //遍历list数组
  list.forEach(item => {
    //获取每一个城市的首字母
    const first = item.short.substr(0, 1)
    //判断cityList中是否有该分类
    if (cityList[first]) {
      //如果有，直接push
      cityList[first].push(item)
    } else {
      //如果没有，就先创建一个数组，然后把当前城市信息添加到数组中
      cityList[first] = [item]
    }
  })

  //获取索引数据
  const cityIndex = Object.keys(cityList).sort()

  return {
    cityList, cityIndex
  }
};
// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 封装处理字母索引的方法
const formatCityIndex = letter => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: {},
      cityIndex: [],
      //指定右侧数据索引号是否高亮
      activeIndex: 0
    }
    //创建ref对象
    this.cityListComponent = React.createRef()

  }


  async componentDidMount() {
    await this.getCityList();
    // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    //调用这个方法时需要保证List已经渲染完成
    this.cityListComponent.current.measureAllRows()
  }

  //获取城市列表数据的方法
  getCityList = async () => {
    const res = await axios.get('http://localhost:8080/area/city?level=1');
    const {cityList, cityIndex} = formatCityData(res.data.body)
    //获取热门城市数据
    const hotRes = await axios.get('http://localhost:8080/area/hot')
    // console.log(hotRes)
    cityList['hot'] = hotRes.data.body;
    cityIndex.unshift('hot');


    //获取当前定位城市
    const curCity = await getCurrentCity()

    cityList['#'] = [curCity]
    cityIndex.unshift('#')

    this.setState({
      cityList,
      cityIndex
    })


  }

  //给城市列表绑定点击事件
  changeCity = (curCity) => {
    const {label, value} = curCity
    if (HOUSE_CITY.indexOf(label) > -1) {
      localStorage.setItem('hkzf_city', JSON.stringify({label, value}))
      this.props.history.go(-1)
    } else {
      Toast.info('该城市暂无房源数据', 1, null, false)
    }
  }

  //List组件渲染每一行的方法
  rowRenderer = ({
                   key, // Unique key within array of rows
                   index, // Index of row within collection
                   isScrolling, // The List is currently being scrolled
                   isVisible, // This row is visible within the List (eg it is not an overscanned row)
                   style, // Style object to be applied to row (to position it)
                 }) => {

    //获取每一行的字母索引
    const {cityIndex, cityList} = this.state
    // console.log(cityIndex)
    const letter = cityIndex[index]
    // console.log(letter)

    //获取指定字母索引下的城市列表
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {
          cityList[letter].map(item => {
            return (
              <div className="name" key={item.value} onClick={() => this.changeCity(item)}>{item.label}</div>
            )
          })
        }
      </div>
    );
  }

  //创建动态计算每一行的高度
  getRowHeight = ({index}) => {
    // console.log(index)
    //索引+城市数量*城市高度
    const {cityList, cityIndex} = this.state
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }

  renderCityIndex = () => {
    //获取cityIndex，并且遍历渲染
    const {cityIndex, activeIndex} = this.state
    return cityIndex.map((item, index) => (
        <li className="city-index-item" key={item} onClick={() => {
          // console.log(index)
          this.cityListComponent.current.scrollToRow(index)
        }}>
          <span
            className={activeIndex === index ? 'index-active' : ''}> {item === 'hot' ? '热' : item.toUpperCase()}</span>
        </li>
      )
    )
  }

  //用于获取List组件渲染行的信息
  onRowsRendered = ({startIndex}) => {
    const {activeIndex} = this.state
    // console.log(startIndex )
    if (activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  render() {
    return (
      <div className="citylist">
      <NavHeader>城市选择</NavHeader>

        {/*城市选择列表*/}
        <AutoSizer>
          {({height, width}) => (
            <List
              ref={this.cityListComponent}
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    );
  }
}

export default CityList;