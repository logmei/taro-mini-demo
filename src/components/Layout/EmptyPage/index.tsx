import { View } from '@tarojs/components'
import React, { ReactNode } from 'react'
import TopBanner from '@/components/TopBanner'
import Styles from './index.module.less'

export interface EmptyPageProps{
  className?:string,
  isEmpty?: boolean,
  suffix?:ReactNode,
  emptyText?:string,
  topBar?:ReactNode,
  isShowTopBar?:boolean,
  isShowSuffix?:boolean
}

const Index:React.FC<EmptyPageProps> = ({
  isEmpty=false,
  suffix,
  children,
  className,
  emptyText='暂无数据',
  isShowTopBar = true,
  topBar,
  isShowSuffix = true
})=>{
  return (
    <View className={`${Styles.emptyPageStyle} ${className}`}>
      {isShowTopBar && (topBar || <TopBanner></TopBanner>)}
      {isEmpty && <View className={Styles.nothingString}>
          <View className={Styles.image}></View>
          <View className={Styles.text}>{emptyText}</View>
        </View>}
      {!isEmpty && children}
      {suffix && isShowSuffix && <View className={Styles.suffix}>{suffix}</View>}
    </View>
  )
}

export default Index