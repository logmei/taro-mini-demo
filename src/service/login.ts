
import { formatUrl } from '@/utils'
import request from '@/utils/requestApi'

export async function VerifyPhoneFun(params){
  return request('/oauth/public/send-phone-captcha',{
    method:'get',
    data:params
  })
}

export async function loginFun(params){
  return request('/oauth/token/mobile?'+formatUrl(params),{
    method:'post',
  })
}

export async function getUserInfo() {
  return request('/oauth/users/self', {}).then( (res:any) =>{
    Taro.setStorageSync('userInfo', JSON.stringify(res))
    return res
  })
}

export async function getOpenidFromService(params) {
  console.log('getOpenidFromService')
}
export async function loginByOpenidService(params) {
  return request('/oauth/token/login?'+formatUrl(params),{
    method:'post'
  })
}
