import { View, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import SearchIcon from '@/asset/searchIcon.png'
import { debounce } from '@/utils'
import React, { CSSProperties } from 'react'
import Styles from './index.module.less'


export interface LTextAreaProps{
  className?:string;
  contentClassName?:string;
  placeholderClassName?:string;
  style?:CSSProperties;
  searchValue:string;
  onChange:(params)=>void;
  placeholder?:string
}

const Index:React.FC<LTextAreaProps> = ({
  className,
  contentClassName,
  placeholderClassName,
  style,
  searchValue,
  onChange,
  placeholder
})=>{

  const handleChange = debounce((e)=>{
    // console.log('handleChange...',e.detail.value)
    onChange(e.detail.value)
  },500,true)


  return (
      <View className={`${Styles.LSearchBar} ${className}`} style={{...style}}>
        <View className={`${Styles.search} ${contentClassName}`}>
        <Image src={SearchIcon}></Image>
        <Input
          placeholderClass={`${Styles.placeholder} ${placeholderClassName}`}
          placeholder={placeholder || '搜索'}
          onInput={handleChange}
          value={searchValue}
        ></Input>
        </View>

      </View>
  )
}

export default Index
