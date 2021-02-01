import { Trim } from '@/utils';
import { Input, Label, View, Text } from '@tarojs/components'
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
  const [focusPosition,setFocusPosition] = useState<number>(0)
  const [handChoose,setHandChoose] = useState<boolean>(false)
  const inputRef = useRef<any>(null)

  const onInputChange = (e:any)=>{
    console.log('onInputChange....e....',e)
    const newVal = Trim(e.detail.value).toUpperCase()
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
    // setFocusPosition(newVal.length)
    // return newVal
  }

  const HandlerClick = (index:number)=>{
    console.log('HandlerClick.....',index)
    setHandChoose(true)
    setFocusPosition(index+1)
    if(inputRef) inputRef.current.focus()
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
            key={index} 
            className={`${Styles.code} ${active?Styles.active:''} ${handChoose && index === focusPosition-1?Styles.selected:''}`} 
            style={{background:colors[index]}}
            onClick={()=>HandlerClick(index)}
          >{val[index] && <Text className={Styles.text}>{val[index]}</Text>}</Label>
          // return <AtInput id={`num${index}`} maxlength={1} className={Styles.input} value={v} name={`num${index}`} key={index} type="number" onChange={(input)=>onInputChange(input,index)}></AtInput>
        })
      }
      <Input 
        ref={inputRef}
        className={Styles.hideInput} 
        type='text' 
        maxlength={num}
        focus={isFocus}
        cursor={focusPosition}
        selection-start={focusPosition-1}
        selection-end={focusPosition}
        value={val}
        onInput={onInputChange} 
        disabled={disabled}
      ></Input>
    </View>
  )
}

export default ForeLetterInput