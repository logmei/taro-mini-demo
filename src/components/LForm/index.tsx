import { Button, Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import FormLabelEdit from '../LFormLabelEdit'
import { FormItemProps, FormProps } from './data'
import Styles from './index.module.less'

interface TriggerParams {
  value:string,
  column:FormItemProps,

}

const Index:React.FC<FormProps> = ({
  title,
  columns,
  onSubmit,
  submitText,
  showRequiredIcon,
  bottom,
  disabled,
  setDisabled,
  autoFocus=false,
  blurVertify=true,
  isControlButton=true
})=>{

  const [list, setList] = useState<FormItemProps[]>([])

  const onClearHandler = (name)=>{
    setList(l=>{
      return l.map(entry=>{
        if(entry.name === name){
          entry.value = ''
          entry.errorMsg = ''
          if(setDisabled)setDisabled(true)
        }
        return entry
      })
    })
  }

  const onInputHandler = ({value,column}:TriggerParams)=>{
    setList(l=>{
      return l.map(entry=>{
        if(entry.name === column.name){
          let v = value
          if(column.formatCallBack){
            v = column.formatCallBack(value)
          }
          if(column.maxLength){
            if(v.length<=column.maxLength) entry.value = v
          }else{
            entry.value = v
          }


        }
        return entry
      })
    })
}

  const onBlurHandler = ()=>{
    if(!blurVertify) return
    vertify()
  }

  // 触发校验
  const onTriggerVertify = ({value,column}:TriggerParams)=>{
    let vertify = false
    setList(l=>{
      return l.map(entry=>{
        if(entry.name === column.name){
          entry.errorMsg=''
          if(column.required){
            if(value===''){
              entry.errorMsg=column.placeholder || '请输入'+column.label
              vertify = true
            }
          }
          if(column.verification){
            column.verification.forEach(ver=>{
              if(ver.regex && !ver.regex.test(value)){
                entry.errorMsg=ver.errorMsg
                vertify = true
                return
              }
            })
          }
        }
        return entry
      })
    })
    return vertify
  }
  // 校验
  const vertify = ()=>{
    let ret = false
    list.forEach(column=>{
      if(onTriggerVertify({value:column.value||'',column})){
        ret = true
        return
      }
    })
    if(!ret) {
      if(setDisabled)setDisabled(false)
    }
    else {
      if(setDisabled)setDisabled(true)
    }
    return ret
  }

  const submitHandler = ()=>{
    if(vertify()) return
    const result = list.reduce((last,curr)=>{
      return {...last,[curr.name]:curr.value}
    },{})
    onSubmit(result)
  }


  useEffect(()=>{
    console.log('lform...',columns)
    // 去掉清空查询条件
    setList(columns.map((column)=>({...column})))
    return ()=>{
      // setList([])
      if(setDisabled)setDisabled(true)
    }
  },[columns, setDisabled])

  return (
    <View className={Styles.formStyle}>
      <View className={Styles.title}>{title}</View>
      {
        list.map((column,index)=>{
          return (<FormLabelEdit
            {...column}
            requiredIcon={showRequiredIcon}
            key={column.name}
            title={column.label}
            onClear={()=>onClearHandler(column.name)}
          >
            {(!column.type || column.type === 'input') &&
            <Input
              autoFocus={index===0?autoFocus:false}
              type={column.fieldType||'text'}
              placeholder={column.placeholder}
              value={column.value}
              onInput={(e)=>onInputHandler({value:e.detail.value,column})}
              onBlur={()=>onBlurHandler()}
            ></Input>}
            </FormLabelEdit>)
        })
      }
      <View className={Styles.operator}>
          <Button
            className={Styles.button}
            disabled={isControlButton?disabled:false}
            onClick={submitHandler}
          >{submitText || '提交'}</Button>
        </View>
        <View className={Styles.bottom}>
          {bottom}
        </View>
    </View>
  )
}

export default Index
