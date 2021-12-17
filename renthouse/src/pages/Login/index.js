import React, {Component} from 'react';

import {Flex, WingBlank, WhiteSpace, Toast} from 'antd-mobile'

import {Link} from 'react-router-dom'

import {withFormik} from 'formik'

// 导入 API
import {API} from '../../utils/api'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

class Login extends Component {
  // state = {
  //   username: '',
  //   password: ''
  // }
  // //获取用户名和密码
  // getUserName = (e) => {
  //   this.setState({
  //     username: e.target.value
  //   })
  // }
  // getPassword = (e) => {
  //   this.setState({
  //     password: e.target.value
  //   })
  // }
  //表单提交
  // handleSubmit = async (e) => {
  //   e.preventDefault()
  //   // const {username, password} = this.state
  //   const res = await API.post('/user/login', {
  //     username,
  //     password
  //   })
  //   const {status, body, description} = res.data
  //   if (status === 200) {
  //     //登录成功
  //     localStorage.setItem('hkzf_token',body.token)
  //     console.log(res);
  //     this.props.history.go(-1)
  //   } else {
  //     // 登录失败
  //     Toast.info(description, 2, null, false)
  //   }
  //
  // }

  render() {
    // const {username, password} = this.state

    //通过props获取高阶组件传递进来的属性
    const {values, handleSubmit, handleChange} = this.props

    return (
      <div className={styles.root}>
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl"/>
        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            {/* 账号 */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={values.username}
                onChange={handleChange}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 密码 */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}


//使用withFormik高阶组件包装Login，为Login提供组件和方法
Login = withFormik({
  //提供状态
  mapPropsToValues: () => ({username: '', password: ''}),
  //表单的提交事件
  handleSubmit: async (values, {props}) => {
    const res = await API.post('/user/login', {
      username: values.username,
      password: values.password
    })
    const {status, body, description} = res.data
    if (status === 200) {
      //登录成功
      localStorage.setItem('hkzf_token', body.token)
      console.log(res);
      //无法在该方法获取this的路由信息
      props.history.go(-1)
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }
})(Login)


export default Login;