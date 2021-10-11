
import request from '@/utils/requestApi'


export async function LoginService(params){
  return request('/loginWx',{
    method:'post',
    data:{
      ...params
    }
  })
}

export async function testService(params:any) {
  return new Promise(resolve=>{
    resolve({success:true,message:'success',value:'test'})
  })
}
