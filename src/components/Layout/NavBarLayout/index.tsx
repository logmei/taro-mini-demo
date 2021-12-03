import { View } from '@tarojs/components'
import React from 'react'
import LNavbar, { NavBarProps } from '@/components/LNavbar'
import Taro from '@tarojs/taro'
import Styles from './index.module.less'


export interface NavBarLayoutProps extends NavBarProps{
}

const Index:React.FC<NavBarLayoutProps> = ({
  style,
  className,
  onClickLeft,
  title,
  isShowLeft=true,
  children
})=>{
  return (
    <View className={Styles.navBarLayout}>
      <LNavbar title={title} isShowLeft={isShowLeft} style={style} className={className} onClickLeft={onClickLeft}></LNavbar>
      <View className={Styles.pageContent} style={{marginTop:(Taro.getSystemInfoSync().statusBarHeight+78)+'px'}}>{children}</View>
    </View>
  )
}

export default Index
