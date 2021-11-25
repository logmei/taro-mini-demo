import { Button, View } from '@tarojs/components'
import React from 'react'
import Styles from './index.module.less'

export interface LButtonProps{
  leftButtonText?:string;
  rightButtonText?:string;
  onClickLeft?:()=>void;
  onClickRight?:()=>void;
}

const Index:React.FC<LButtonProps> = ({
  leftButtonText='取消',
  rightButtonText='提交',
  onClickLeft,
  onClickRight
})=>{
  const handlerClickRight = ()=>{
    onClickRight && onClickRight()
  }
  return (
    <View className={Styles.LButtonStyles}>
      <Button className={Styles.left} onClick={()=>onClickLeft && onClickLeft()}>{leftButtonText}</Button>
      <Button className={Styles.right} onClick={handlerClickRight}>{rightButtonText}</Button>
    </View>
  )
}

export default Index