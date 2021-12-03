import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import Style from './index.module.less'

const Index:React.FC<{}> = ()=>{
  return (
  <View className={Style.loginStyle}>
    <View className={Style.topBackground}></View>

  </View>)
}

export default Index
