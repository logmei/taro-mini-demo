import Taro from '@tarojs/taro'
import { RequestOptParams } from '../../global/data';
import Config from './config'

const { request } = Taro

export const codeMessage = {
  // 200: '服务器成功返回请求的数据。',
  // 201: '新建或修改数据成功。',
  // 202: '一个请求已经进入后台排队（异步任务）。',
  // 204: '删除数据成功。',
  400: '发出的请求有错误。',
  401: '用户登陆超时或没有权限。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '发生错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams

  console.log(`http ${method || 'GET'} --> ${url} data: `, data,requestParams)

  return chain.proceed(requestParams)
    .then(response => {
      console.log(`http <-- ${url} result:`, response)

      //返回解析后的数据
      if (response.status === 200) {
        return response.data;
      }else if(codeMessage[response.status]){
        const errorText = codeMessage[response.status] || response.statusText;
        Taro.showToast({
          title:errorText,
          icon:'none',
          duration:2000
        })
        return Promise.reject(response.data);
      }else {
        //统一处理错误,或者返回 reject
        return Promise.reject(response.data);
      }
      return response
    }).catch(err => {
      //  if(data.loading === true && !loading) Taro.hideLoading()

      throw err;
    });
  }
Taro.addInterceptor(interceptor)

const Request = async (url:string,options:RequestOptParams,rest)=>{
  const wholeUrl = Config[process.env.NODE_ENV] + url;
  const method = options.method ? options.method : 'get'
  const header = {
    'content-type': options.dataType?'application/x-www-form-urlencoded':'application/json',
    'authorization':Taro.getStorageSync('userToken')
  }
  return await request({
    header,
    method,
    url:wholeUrl,
    data: { ...options.data },
    ...rest
  });
}

export default Request
