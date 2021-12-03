import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import StatusCard from '../StatusCard'
import styles from './index.module.less'




export interface TopCardProps{
  status:any,
  code:string,
  reason: string
}


const TopCard:React.FC<TopCardProps> = ({status='return',code,reason}) => {
  const statusData = {
    status,
    code:code || '',
    statusLabel:status==='return'?'被退回':''
  }

  return (
    <View className={styles.card}>
      <StatusCard className={styles.statusCard} {...statusData}></StatusCard>
      {
        status ==='return' && <View className={styles.row}>
        <View className={styles.label}>退回原因：</View><View className={styles.value}>{reason}</View>
      </View>
      }

      <View className={styles.line}></View>
    </View>
  )
}

export default TopCard;
