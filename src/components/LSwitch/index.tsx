import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { CSSProperties, useState } from 'react'
import Styles from './index.module.less'


export interface LSwitchProps{
  className?:string;
  style?:CSSProperties;
  value:boolean;
  onChange:(params)=>void;
}

const Index:React.FC<LSwitchProps> = ({
  className,
  value,
  onChange
})=>{
  const [checked,setChecked] = useState<boolean>(value)

  const handlerChange = ()=>{
    setChecked(v=>{
      onChange(!v)
     return !v})

  }

  return (
      <View
        className={`${Styles.lswitchClass} ${checked? Styles.lswitch_checked:''} ${className}`}
        onClick={handlerChange}
      >
        <View className={Styles.point}></View>
      </View>

  )
}

export default Index
