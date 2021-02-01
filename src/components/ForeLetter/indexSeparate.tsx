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
  const [showCursor ,setShowCursor] = useState<boolean>(focus||false)
  const [defaultArr,setDefaultArr] = useState<Array<string>>(new Array(num).fill(''))

  const onInputChange = (e:any,index:number)=>{
    let input = ''
    if(e.detail.value){
      if(/^[a-zA-Z]{1}$/.test(e.detail.value)){
        input = e.detail.value.toUpperCase()
      }else{
        Taro.showToast({
          title:'请输入英文单词'
        })
        return
      }
    }
    const newArr = defaultArr.splice(index,1,input)
    setDefaultArr(newArr)
    if(onChange)onChange(newArr.toString())
  }

  useEffect(()=>{
    //if(inputRef.current) inputRef.current.focus()
    if(value && value.length<num){
      setShowCursor(true)
      
    }
    if(value) setVal(Trim(value).toUpperCase())
  },[num, value])
  
  return (
    <View className={Styles.foreLetterSeparate}>{
      defaultArr.map((v,index)=>{
          const activeIndex = val?val.length:0
          // return <Label key={index} className={`${Styles.code} ${index===activeIndex && showCursor?Styles.active:''}`} style={{background:colors[index]}}>{val[index]}</Label>
          return <Input 
            id={`num${index}`} 
            disabled={disabled}
            maxlength={1} 
            className={Styles.input} 
            value={v} name={`num${index}`} 
            key={index} type="text" 
            onInput={(e)=>onInputChange(e,index)}
          ></Input>
        })
      }
      {/* <Input 
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
      ></Input> */}
    </View>
  )
}

export default ForeLetterInput