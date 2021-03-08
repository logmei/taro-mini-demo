
import { LoginService } from '@/service/login'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { AtButton, AtForm, AtInput } from 'taro-ui'
import Style from './index.module.less'

const Index:React.FC<{}> = ()=>{

  const [name,setName] = useState('')
  const [pwd,setPwd] = useState('')

  useEffect(()=>{
    console.log('useEffect')
  },[])

  const handlerSubmit = ()=>{
    console.log(`submit:name-${name},pwd-${pwd}`)
    LoginService({name,pwd}).then(res=>{
      console.log('login response',res)
      Taro.showToast({
        title:res,
        icon:'success',
        success:()=>{
          Taro.navigateTo({url:'/pages/index/index'})
        }
      })

    })
  }
  const handlerReset = ()=> {
    console.log('onReset')
    setName('')
    setPwd('')

  }

  const handlerChange = (value,keyname)=>{
    switch (keyname){
      case 'name':
        setName(value)
        break
      case 'pwd':
        setPwd(value)
        break
      default:

    }
  }
  return (
  <View className={Style.loginStyle}>
    <View className={Style.title}>登录页面</View>
    <AtForm
      onSubmit={handlerSubmit}
      onReset={handlerReset}
    >
    <AtInput
      name='name'
      title='用户名'
      type='text'
      placeholder='输入用户名'
      value={name}
      onChange={(v)=>handlerChange(v,'name')}
    />
    <AtInput
      name='pwd'
      title='密码'
      type='password'
      placeholder='输入密码'
      value={pwd}
      onChange={(v)=>handlerChange(v,'pwd')}
    />
    <AtButton className={Style.button} type='primary' onClick={handlerSubmit}>提交</AtButton>
    <AtButton className={Style.button} onClick={handlerReset}>重置</AtButton>
  </AtForm>
  </View>)
}

export default Index
