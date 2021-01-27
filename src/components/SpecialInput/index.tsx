import { Input, Label, View } from '@tarojs/components'
import React, { useEffect, useRef, useState } from 'react'
import "taro-ui/dist/style/components/input.scss";
import Styles from './index.module.less'

interface SpecialInputProps{
  num:number,
  value?:string,
  focus?:boolean,
  disabled?:boolean,
  onChange?:(value)=>void
}

const SpecialInput:React.FC<SpecialInputProps> = ({num,value,onChange,focus,disabled})=>{

  const [val,setVal] = useState<string>(value||'');
  const [isFocus,setIsFocus] = useState<boolean>(focus||false)
  const [showCursor ,setShowCursor] = useState<boolean>(focus||false)
  const [defaultArr] = useState<Array<string>>(new Array(num).fill(''))
  const inputRef = useRef(null)

  const onInputChange = (e:any)=>{
    setVal(e.detail.value)
    if(onChange)onChange(e.detail.value)
  }

  useEffect(()=>{
    //if(inputRef.current) inputRef.current.focus()
    if(value && value.length<num) {
      setShowCursor(true)
    }
    if(value!==undefined) setVal(value)
  },[num, value])
  
  return (
    <View className={Styles.specialInput}>{
      defaultArr.map((v,index)=>{
          const activeIndex = val?val.length:0
          return <Label key={index} className={`${Styles.code} ${index===activeIndex && showCursor?Styles.active:''}`}>{val[index]}</Label>
          // return <AtInput id={`num${index}`} maxlength={1} className={Styles.input} value={v} name={`num${index}`} key={index} type="number" onChange={(input)=>onInputChange(input,index)}></AtInput>
        })
      }
      <Input 
        ref={inputRef}
        className={Styles.hideInput} 
        type='number' 
        maxlength={num}
        focus={isFocus}
        value={val}
        disabled={disabled}
        onInput={onInputChange} 
      ></Input>
    </View>
  )
}

export default SpecialInput