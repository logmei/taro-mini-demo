import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { CSSProperties, useEffect } from 'react'
import leftArrowIcon from '../../asset/leftArrow.png'
import Styles from './index.module.less'

export interface NavBarProps{
  style?:CSSProperties,
  className?:string,
  isShowLeft?:boolean,
  onClickLeft?:(params?:any)=>void,
  title:string
}

const Index:React.FC<NavBarProps> = ({style,className,onClickLeft,title,isShowLeft=true})=>{

  const handlerClickLeft = ()=>{
    if(onClickLeft){
      onClickLeft()
    }else{
      Taro.navigateBack()
    }
  }

  useEffect(()=>{
    console.log('nav bar ',Taro.getSystemInfoSync().statusBarHeight)
  },[])
  return (
    <View className={`${Styles.navbarStyle} ${className}`} style={{paddingTop:(Taro.getSystemInfoSync().statusBarHeight+10)+'px',...style}}>
      {
        isShowLeft &&
        <View className={Styles.leftStyle} onClick={handlerClickLeft}>
          <Image src={leftArrowIcon}></Image>
        </View>
      }

       <View className={Styles.title}>{title || '标题'}</View>
    </View>
  )
}

export default Index
