import { Input, Label, View, Text } from '@tarojs/components'
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
  const [focusPosition,setFocusPosition] = useState<number>(0)
  const [handChoose,setHandChoose] = useState<boolean>(false)
  const inputRef = useRef<any>(null)

  const onInputChange = (e:any)=>{
    const newVal = e.detail.value
    setVal(newVal)
    if(onChange)onChange(newVal)
    if(newVal.length===num){
      setHandChoose(false)
    }
    if(e.detail.keyCode===8){
      setFocusPosition(pos=>pos-1)
    }else{
      setFocusPosition(pos=>pos+1)
    }
  }

  const HandlerClick = (index:number)=>{
    console.log('HandlerClick.....',index)
    setHandChoose(true)
    setFocusPosition(index+1)
    if(inputRef) inputRef.current.focus()
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
        let active = false
        if(showCursor){
          // if(handChoose){
          //   active = index === focusPosition-1
          // }else{
            if(val.length<num){
              const activeIndex = val?val.length:0
              active = index===activeIndex
            }
          // }
        }
          return <Label 
            key={'num'+index} 
            className={`${Styles.code} ${active?Styles.active:''} ${handChoose && index === focusPosition-1?Styles.selected:''}`}
            onClick={()=>HandlerClick(index)}
          >
            {val[index] && <Text className={Styles.text}>{val[index]}</Text>}</Label>
          // return <AtInput id={`num${index}`} maxlength={1} className={Styles.input} value={v} name={`num${index}`} key={index} type="number" onChange={(input)=>onInputChange(input,index)}></AtInput>
        })
      }
      <Input 
        ref={inputRef}
        className={Styles.hideInput} 
        type='number' 
        maxlength={num}
        focus={isFocus}
        cursor={focusPosition}
        selection-start={focusPosition-1}
        selection-end={focusPosition}
        value={val}
        disabled={disabled}
        onInput={onInputChange} 
      ></Input>
    </View>
  )
}

export default SpecialInput