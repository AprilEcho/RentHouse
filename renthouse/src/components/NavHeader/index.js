import React from 'react'
import {NavBar} from "antd-mobile";

//导入WithRouter
import {withRouter} from 'react-router-dom'

import PropTypes from 'prop-types'

import './index.scss'

function NavHeader({children, history, onLeftClick}) {
  const defaultHeader = () => history.go(-1)
  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back"/>}
      onLeftClick={onLeftClick || defaultHeader}
    >{children}</NavBar>
  )
}

// 添加props校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func
}

export default withRouter(NavHeader)