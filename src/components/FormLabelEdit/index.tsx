import { View, Text, Label } from '@tarojs/components'
import React, { ReactNode } from 'react'
import Styles from './index.module.less'

interface FormLabelEditProps{
  title?:string;
  value?:string|number;
  suffix?:ReactNode;
  children?:ReactNode;
  onClick?:(params:any)=>void;
  style?:any;
  valueStyle?:any,
  placeholder?:string;
  required?:boolean
}

const FormLabelEdit:React.FC<FormLabelEditProps> = (
  {
    style,
    title,
    value,
    suffix,
    children,
    onClick,
    valueStyle,
    placeholder,
    required
  })=>{
  return (
    <View className={Styles.formLabelEditStyle} style={style}>
      <View onClick={onClick} className={Styles.content}>
      <View className={Styles.container}>
        {required&&<Label style={{color:"red",marginRight:'2px'}}>*</Label>}
        {title && <Text className={Styles.title}>{title}</Text>}
        <View className={`${Styles.value}`} style={valueStyle?valueStyle:''}>{children?children:(value?value:<Label className={Styles.placeholder}>{placeholder || '请输入'+title}</Label>)}</View>
      </View>
      <View className={Styles.suffix}>
        {
          suffix?suffix:''
        }
      </View>
    </View>
    </View>
    
    
  )
}
export default FormLabelEdit