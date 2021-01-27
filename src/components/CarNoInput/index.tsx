import { Block, Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import Styles from './index.module.less'

interface CarNoInputProps{
  value:string;
  onChange?:(value:string)=>void
  onClick?:(value?:string)=>void
}
// 格式化
const formatNum = (num:string)=>{
  const newNum = num.split('')
  return newNum.join('-')
}

const CarNoInput:React.FC<CarNoInputProps>=({value,onClick})=>{
  const [areaNum,setAreaNum] = useState<string>()
  const [num,setNum] = useState<string>()

  const clickHandler=(e)=>{
    e.stopPropagation();
    if(onClick)onClick()
  }

  useEffect(()=>{
    if(value && value.length>2){
      setAreaNum(value.substr(0,2))
      setNum(formatNum(value.substr(2)))
    }
  },[value])

  return (
    <View className={Styles.CarNoInputStyle} onClick={(e)=>clickHandler(e)}>
      <View className={Styles.innerStyle}>
        <View className={Styles.spotLeft}></View>
        <View className={Styles.spotRight}></View>
        {
          value ? <Block>
           <View className={Styles.areaStyle}>{areaNum}</View> <View className={Styles.spotStyle}></View><View className={Styles.numStyle}>{num}</View>
          </Block>
          : <View style={{textAlign:'center',width:'100%'}}>请选择车牌号</View>
        }
         <View className={Styles.horizontalLeft}></View>
        <View className={Styles.horizontalRight}></View>
      </View>

    </View>
  )
}
export default CarNoInput