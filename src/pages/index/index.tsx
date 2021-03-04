import React, { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

interface IndexProps{
  name:string;
  dispatch:Dispatch
}

const Index:React.FC<IndexProps> = ({name,dispatch})=>{

  useEffect(()=>{
      dispatch({
      type:'common/saveStorageSync',
      payload:{
        aaa:'22222'
      }
    })
  }

  )

    return (
      <View className='index'>
        <Text>---{name}---</Text>
        <AtButton type='primary'>I need Taro UI</AtButton>
        <Text>Taro UI </Text>
        <AtButton type='primary' circle>支持</AtButton>
        <Text>共建？</Text>
        <AtButton type='secondary' circle>来</AtButton>
      </View>
    )

}

export default connect(({common   /* 需要哪些模块都写在这里 */    }) => {
  console.log('common...',common)
  return {
  name: common.name,   // 这里定义的值会传给页面的props
}})(Index)
