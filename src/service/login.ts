
import request from '@/utils/requestApi'

export async function VerifyPhoneFun(params){
  return request('/oauth/public/send-phone-captcha',{
    method:'get',
    data:params
  })
}
