
import Taro from '@tarojs/taro'
import React, {Component } from 'react'
/* dva */
import {Provider} from 'react-redux'
import dva from './utils/dva'
import models from './models/index'
import 'taro-ui/dist/style/index.scss'
// 全局样式
// import './styles/base.scss'

const dvaApp = dva.createApp( {
  initialState: {},
  models: models,
} );
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      // 云开发初始化
      // Taro.cloud.init({env:'',traceUser: true,})
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store} >
        {this.props.children }
      </Provider>
    )
  }
}

export default App
