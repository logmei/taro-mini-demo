
import request from '@/utils/requestApi'


export async function LoginService(params){
  return request('/loginWx',{
    method:'post',
    data:{
      ...params
    }
  })
}
