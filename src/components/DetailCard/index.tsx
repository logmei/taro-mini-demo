import { View, Text } from '@tarojs/components'
import React, { ReactNode } from 'react'
import { StatusProps } from './data'
import Styles from './index.module.less'

export interface Columns{
  label:string;
  name?:string;
  callBack?:(param:any)=>void;
  emptyNoShow?:boolean;
}

interface IndexProps{
  title?:string,
  subTitle?:string;
  data:any,
  columns:Columns[],
  style?:any,
  suffix?:ReactNode,
  status?:StatusProps| string,
  suffixStatus?:string,
  onClick?:(params?:any) => void,
  childStyle?:object
}

const Index:React.FC<IndexProps> = ({
  title,
  subTitle,
  data,
  columns,
  style,
  suffix,
  status,
  suffixStatus,
  onClick,
  children,
  childStyle
})=>{
  const clickHandler = ()=>{
    if(onClick) onClick(data)
  }

  return (
    <View
      className={Styles.DetailCard}
      style={{marginBottom:'10px',...style}}
      onClick={clickHandler}
    >
    <View className={Styles.content}>
      <View className={Styles.left}>
         {title && <View className={Styles.title}>{title}</View>}
         {subTitle && <View className={Styles.subtitle}>{subTitle}</View>}
        {data && columns.map(v=>{
          const showValue = v.callBack?v.callBack(data):data[v.name||'']
          let show = true
          if(v.emptyNoShow && !showValue){
            show = false
          }
          return show && <View className={Styles.item} key={v.name}><Text>{v.label}</Text>：<Text>{v.callBack?v.callBack(data):(data[v.name||'']||'')}</Text></View>
        })}
      </View>
     <View className={Styles.right}>
      <View className={Styles.suffixStyle}>{suffix}</View>
     </View>
     <View className={Styles.statusStyle} style={typeof status!== 'string'?{background:status?.color,color:'#fff'}:''}>{status && typeof status!== 'string' ? status.name:status}</View>
     {suffixStatus &&<View className={Styles.suffixStatusStyle}>
       {suffixStatus}
     </View>
    }
    </View>


     {
       children && <View className={Styles.children} style={{...childStyle}}>{children}</View>
     }


    </View>
  )
}

export default Index
