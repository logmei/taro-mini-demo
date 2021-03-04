import { View } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import React, { useEffect } from 'react'

const Index:React.FC<{}> = ()=>{
  useEffect(()=>{
    console.log('useEffect')
  },[])

  useReady(()=>{
    console.log('ready')
  })

  useDidShow(()=>{
    console.log('show')
  })

  useDidHide(()=>{
    console.log('hide')
  })

  return (
    <View>hello world!</View>
  )
}

export default Index
