import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import Styles from './index.module.less'

const Index:React.FC<{}> = ()=>{
  useEffect(()=>{
    console.log('useEffect')
  },[])
  return (<View className={Styles.style}>hello world！
  <View className={Styles.inner}>inner</View>
  </View>)
}

export default Index
