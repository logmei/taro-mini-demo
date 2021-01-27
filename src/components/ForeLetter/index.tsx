import { Trim } from '@/utils';
import { Input, Label, View } from '@tarojs/components'
import React, { useEffect, useRef, useState } from 'react'
import "taro-ui/dist/style/components/input.scss";
import Styles from './index.module.less'

interface ForeLetterInputProps{
  num?:number,
  value?:string,
  focus?:boolean,
  disabled?:boolean,
  onChange?:(value)=>void
}

const colors = ['#A5C2C2','#BBD1A1','#A6A5E5','#D1B29A']

const ForeLetterInput:React.FC<ForeLetterInputProps> = ({num=4,value,onChange,focus,disabled})=>{

  const [val,setVal] = useState<string>(value||'');
  const [isFocus,setIsFocus] = useState<boolean>(focus||false)
  const [showCursor ,setShowCursor] = useState<boolean>(focus||false)
  const [defaultArr] = useState<Array<string>>(new Array(num).fill(''))
  const inputRef = useRef(null)

  const onInputChange = (e:any)=>{
    setVal(Trim(e.detail.value).toUpperCase())
    if(onChange)onChange(Trim(e.detail.value).toUpperCase())
  }

  useEffect(()=>{
    //if(inputRef.current) inputRef.current.focus()
    if(value && value.length<num){
      setShowCursor(true)
      
    }
    if(value) setVal(Trim(value).toUpperCase())
  },[num, value])
  
  return (
    <View className={Styles.foreLetter}>{
      defaultArr.map((v,index)=>{
          const activeIndex = val?val.length:0
          return <Label key={index} className={`${Styles.code} ${index===activeIndex && showCursor?Styles.active:''}`} style={{background:colors[index]}}>{val[index]}</Label>
          // return <AtInput id={`num${index}`} maxlength={1} className={Styles.input} value={v} name={`num${index}`} key={index} type="number" onChange={(input)=>onInputChange(input,index)}></AtInput>
        })
      }
      <Input 
        ref={inputRef}
        className={Styles.hideInput} 
        type='text' 
        maxlength={num}
        focus={isFocus}
        cursor={num}
        selection-start={num}
        selection-end={num}
        value={val}
        onInput={onInputChange} 
        disabled={disabled}
      ></Input>
    </View>
  )
}

export default ForeLetterInput