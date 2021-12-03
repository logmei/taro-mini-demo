import React, { CSSProperties } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'




export interface FormImageProps{
  title:string,
  imageName:string,
  url?:string,
  onClick?:(params?:any)=>void,
  style?:CSSProperties
}

const FormImage:React.FC<FormImageProps> = ({title,imageName,url,onClick,style}) => {
 const handlerClick = ()=>{
   if(onClick) onClick(url)
 }
 const icon = require('@/asset/'+imageName+'.svg')
  return (
    <View className={styles.FormImage} onClick={handlerClick} style={{...style}}>
      <View className={styles.title}>{title}</View>
      <Image mode="aspectFit" src={url || icon} className={styles.image}></Image>
    </View>
  )
}

export default FormImage;