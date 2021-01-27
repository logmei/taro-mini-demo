import Taro from '@tarojs/taro'
import { Page } from "@/global/data";
import { getOpenidFromService, getUserInfo, loginByOpenidService } from '@/service/login';
import { reject } from 'lodash';

export const getTenantId=()=>{
  const userInfo = Taro.getStorageSync('userInfo')
  if(!userInfo){
    Taro.redirectTo({
      url:'/pages/login/index'
    })
    return
  }
  return JSON.parse(Taro.getStorageSync('userInfo')).tenantId
}

// 将params 转换为url参数
export const formatUrl = (params:Object)=>{
  let url = '1=1'
  Object.keys(params).forEach((key:string)=>{
    url+=`&${key}=`+params[key]
  })
  return url
}
// 格式化时间
export const formatTime = (time:string)=>{
  const date = new Date(time)
  return `${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`
}



// 是否继续进行分页操作
export const isProceedWithPage=(page:Page,current:number,refresh?:boolean|undefined)=>{
  if(refresh) return true
  if(page.totalPages === 0) return true
  if(page.totalPages === current-1) return false
  return true
}


// 获取用户信息
export const getUserInfoHandler=(res?:any)=>{
  // debugger
  console.log('getUserInfoHandler',res)
  Taro.getSetting({
    success:(res1)=>{
      if(res1.authSetting['scope.userInfo']){
        Taro.getUserInfo({
          success:(result)=>{
            Taro.setStorageSync('wxUserInfo',JSON.stringify(result.userInfo))
          }
        })
      }

    }
  })
}

// 自动登录
export const autoLogin=()=>{
  const openId = Taro.getStorageSync('wxAppletOpenid')
    if(!openId){
      Taro.login({
        success:(res)=>{
          getOpenidFromService({code:res.code,end:'driver'}).then((result)=>{
            Taro.setStorageSync('wxAppletOpenid',result.openid)
            loginFun(result.openid)
          })
        }
      })
    } else {
      Taro.showLoading()
      loginFun(openId)
    }
}

const loginFun = (openId:string)=>{
  loginByOpenidService({
    client_id: 'client',//string Y 客户端名称
    grant_type: 'openid', //string Y 授权类型，分implicit和password两种
    open_id: openId,// string N 微信openId，code和open_id两者必传⼀个
  }).then(res=>{
    Taro.hideLoading()
    if (res.success === false) {
      Taro.redirectTo({
        url:'/pages/login/index'
      })
      // that.setData({ responseData: res.message, prompt: true });
    } else {
      Taro.setStorageSync('access_token', res.accessToken);
      getUserInfo().then(()=>{
        Taro.switchTab({url:'/pages/index/index'})
      })
    }
  })
}

// 判断是否登陆
export const isLogin=()=>{
  debugger
  return new Promise((resovle,reject)=>{
    const UserInfo = Taro.getStorageSync('userInfo')
    if(!UserInfo){
      resovle(false)
    } else{
      resovle(true)
    }

  })


}

// 去掉所有空格
export const Trim =(letter:string)=>{
  return letter.replace(/\s/g,'')
}

