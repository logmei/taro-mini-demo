import request from '@/utils/requestApi'

export async function login(params){
  return request('/login',{
    method:'post',
    data:params
  })
}
