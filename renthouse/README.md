# 好客租房
- 首页
- 找房
- 资讯
- 我的

## 首页
### 轮播图滑动问题
- 轮播图手动滑动过程控制台报错，这是轮播图的自动轮播与浏览器的阻止默认事件冲突，可取消浏览器的默认行为
- /node_modules/react-dom/cjs/react-dom.development.js中注掉event.preventDefault();

## 找房
### 地图找房
- 在地图找房中点击小区覆盖物时移动到可视区域中间，视频中源码为e.changedTouches会报错
- 现在浏览器改成e.domEvent.changedTouches

### 我的
### 登录
- 登录设计过程用户名和密码接口出现问题
- 删掉数据库中users表id等于5的数据，并重新插入一条新数据
- INSERT INTO `users` VALUES (5, 'test2', NULL, NULL, '1', NULL, 'test2', NULL, 0, '/img/avatar.png', '好客_880495', 0, NULL, '2019-07-07 03:46:27', '2019-07-07 03:46:27');