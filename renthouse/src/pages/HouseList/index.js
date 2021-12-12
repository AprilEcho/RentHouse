import React, {Component} from 'react';
import SearchHeader from "../../components/SearchHeader";

// 导入样式
import styles from './index.module.css'
import {Flex} from "antd-mobile";

//获取当前定位城市信息
const {label} = JSON.parse(localStorage.getItem('hkzf_city'))

class HouseList extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部搜索导航 */}
        <Flex className={styles.header}>
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.go(-1)}
          />
          <SearchHeader cityName={label} className={styles.searchHeader}/>
        </Flex>
        {/*条件筛选栏*/}

      </div>
    );
  }
}

export default HouseList;