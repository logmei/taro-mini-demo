import React from 'react'
import { View, Text, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

export const StatusDataList ={
  success:'审核成功',
  return:'退回',
  draft:'草稿'
}

export interface Columns{
  label:string;
  name:string;
  callBack?:(param:any)=>void;
  emptyNoShow?:boolean;
  value?:any;
}

export interface DetailRowsProps{
  data:any,
  columns:any[],
}

const Index:React.FC<DetailRowsProps> = ({ data,columns }) => {
  return (
    <View className={`${styles.detailRows}`} >
       {data && columns.map(v=>{
         return <View className={styles.item} key={v.name}><Text className={styles.label_item}>{v.label}:</Text><Text className={styles.value_item}>{v.callBack?v.callBack(data):data[v.name]}</Text></View>
          })}
    </View>
  )
}



export default Index;
