import React from 'react'
import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import DetailCard, { Columns } from '@/components/DetailCard'
import StatusCard from '../StatusCard'
import styles from './index.module.less'
import DetailRows from '../DetailRows'
import { StatusDataProps } from '../../data'
import { columnsPass, dataTest, statusData } from './columns'




export interface CardProps{
  detailColumns:Columns[],
  statusData:StatusDataProps,
  data:any,
  onClick?:(params?:any)=>void,
  buttonClick?:(params?:any) => void
}

const getButtonLabel= (status)=>{
  switch (status){
    case 'return':
      return '重新提交';
    case 'draft':
      return '编辑';
    default:
      return ''
  }
  }
const Card:React.FC<CardProps> = ({data,detailColumns,children,buttonClick,onClick}) => {

  const handlerClick = (e)=>{
    if(onClick){
      onClick()
    }
  }

  const handlerButtonClick = (e)=>{
    e.stopPropagation()
    if(buttonClick){
      buttonClick()
    }
  }

  return (
    <View className={styles.card} onClick={handlerClick}>
      <StatusCard className={styles.statusCard} {...statusData}></StatusCard>
      <View className={styles.line}></View>
      <DetailRows data={dataTest} columns={columnsPass}></DetailRows>
     {
       ['return','draft'].indexOf(statusData.status)!=-1  &&  <Button className={styles.button} onClick={handlerButtonClick}>{getButtonLabel(statusData.status)}</Button>
     }

      {children}
    </View>
  )
}

export default Card;
