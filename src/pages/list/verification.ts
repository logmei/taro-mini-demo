import Taro from '@tarojs/taro'
/**
 *
 * @param name
 * @param callback :回调函数
 * @returns
 */
export const CheckUserName=(name:string,callback?:Function)=>{
  if(!name){
    Taro.showToast({
      title:'请添加姓名',
      icon:'none',
      success:()=>{
        if(callback) callback()
      }
    })
    return false
  }

  const reg = /^([\u4e00-\u9fa5]|\d)+$/
  let ccMatch = name.match(reg)
  if(!ccMatch){
    Taro.showToast({
      title:'姓名支持汉字和数字组合，最多支持8个汉字',
      icon:'none',
      success:()=>{
        if(callback) callback()
      }
    })
    return false
  } else {
    const chineseChartReg = /[\u4e00-\u9fa5]/g
    ccMatch = name.match(chineseChartReg)
    if(ccMatch){
      if(ccMatch.length>8){
        Taro.showToast({
          title:'姓名支持汉字和数字组合，最多支持8个汉字',
          icon:'none',
          success:()=>{
            if(callback) callback()
          }
        })
        return false
      }
    }
  }


  return true
}


export const CheckPhone = (phone:string,callback?:Function)=>{
  if(!phone){
    Taro.showToast({
      title:'请添加手机号',
      icon:'none',
      success:()=>{
        if(callback) callback()
      }
    })
    return false
  }
  const Reg = /^1\d{10}$/
  let ccMatch = phone.match(Reg)
  if(!ccMatch){
      Taro.showToast({
        title:'请填写正确手机号',
        icon:'none',
        success:()=>{
          if(callback) callback()
        }
      })
      return false
  }
  return true
}

export const CheckIdcard = (idcard:string,callback?:Function)=>{
  if(!idcard){
    Taro.showToast({
      title:'请添加身份证号',
      icon:'none',
      success:()=>{
        if(callback) callback()
      }
    })
    return false
  }
  const Reg = /^\d{17}(\d|\w)$/
  let ccMatch = idcard.match(Reg)
  if(!ccMatch){
      Taro.showToast({
        title:'请填写正确身份证号',
        icon:'none',
        success:()=>{
          if(callback) callback()
        }
      })
      return false
  }
  return true
}

// 校验图片
export const verifyByImage=(url)=>{
  return /\.png|jpg|jpeg$/.test(url)
}

export const GenderList = [

  {
    id:'1',
    label:'男'
  },
  {
    id:'0',
    label:'女'
  }
]
