import React, { CSSProperties } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

export interface ButtonOperatorProps{
  className?:string,
  style?:CSSProperties,
  onClick?:(params?:any)=>void
}

const ButtonOperator:React.FC<ButtonOperatorProps> = ({className,style,children,onClick}) => {
  const handlerClick = ()=>{
    if(onClick) onClick()
  }
  return (
      <View className={`${styles.buttonOperator} ${className || ''}`} style={{...style}} onClick={handlerClick}>{children}</View>
  )
}



export default ButtonOperator;