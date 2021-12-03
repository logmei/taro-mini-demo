import React, { CSSProperties } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

export const StatusDataList ={
  success:{
    label:'审核成功',
    color:'#4FC480'
  },
  return:{
    label:'退回',
    color:'#E17878'
  },
  draft:{
    label:'草稿',
    color:'#E17878'
  },
  review:{
    label:'待审核',
    color:'#5F6EFF'
  }
}

export interface StatusCardProps{
  status:string,//'success'|'return'|'draft',
  statusLabel?: string,
  code:string,
  codeLabel?:string,
  time?:string,
  onClick?:()=>void,
  className?:string,
  style?:CSSProperties
}

const Index:React.FC<StatusCardProps> = ({ status = '',statusLabel='', code, codeLabel='申请编码',time,onClick, className,style }) => {
  const Icon = status ?require('./images/'+status+'.svg'):null
  return (
    <View className={`${styles.statusCard} ${className || ''}`} style={{...style}} onClick={onClick}>
      <View className={styles.icon}>{Icon && <Image src={Icon}></Image>}</View>
      <View className={styles.iconText} style={{color:StatusDataList[status].color}}>{statusLabel || StatusDataList[status].label}</View>
     {code && <View className={styles.code}>{codeLabel}:<Text>{code}</Text></View>} 
      <View className={styles.time}>{time || ''}</View>
    </View>
  )
}



export default Index;