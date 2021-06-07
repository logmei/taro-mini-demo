import Taro from '@tarojs/taro'
import { RequestOptParams } from '../../global/data';
import log from '../log';
import Config from './config'

const { request, uploadFile } = Taro
// 获取当前帐号信息
const accountInfo = Taro.getAccountInfoSync();

// env类型
export const env = accountInfo.miniProgram.envVersion;
console.log('...........................',env)
if(!env){
  console.error("获取运行环境失败!");
}
export const apiUrl = process.env.NODE_ENV === 'production' && env?Config[env].apiUrl:Config[process.env.NODE_ENV].apiUrl

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
  // const { method, data, url } = requestParams

  // console.log(`http ${method || 'GET'} --> ${url} data: `, data,requestParams)

  return chain.proceed(requestParams)
    .then(response => {
      // console.log(`http <-- ${url} result:`, response)
      log.setFilterMsg('response')
      log.info(response)
      //返回解析后的数据
      if (response.statusCode === 200 || response.statusCode === 204) {
        return response.data;
      }else if(response.statusCode === 401){
        Taro.clearStorageSync()
        Taro.showToast({
          title: '登录过期',
          icon: "none",
          duration: 2000,
          mask:true,
          success: function () {
            Taro.redirectTo({
              url:'/pages/login/index'
            })
          }
        })
        return Promise.reject(response.data);
      }else if(codeMessage[response.statusCode]){
        const errorText = codeMessage[response.statusCode] || response.statusText;
        Taro.showToast({
          title:errorText,
          icon:'none',
          duration:2000,
          mask:true
        })
        log.error(response.data)
        return Promise.reject(response.data);
      }else {
        //统一处理错误,或者返回 reject
        log.error(response.data)
        return Promise.reject(response.data);
      }
      return response
    }).catch(err => {
      //  if(data.loading === true && !loading) Taro.hideLoading()
      Taro.showToast({
        title: JSON.stringify(err),
        icon:'none',
        duration:2000,
        mask:true
      })
      log.error(err);
      return Promise.reject(err);
    });
  }
Taro.addInterceptor(interceptor)

const Request:any = async (url:string,option:RequestOptParams,rest?:any)=>{
  const options = {...option}
  const wholeUrl = apiUrl + url;
  const method = (options && options.method) ? options.method : 'get'
  const authorization = Taro.getStorageSync('access_token')
  //'application/x-www-form-urlencoded'
  const header = {
    'content-type': options.contentType || 'application/json',
    'authorization':authorization,
  }
  log.setFilterMsg('request')
  log.info('request:'+wholeUrl,'authorization:'+authorization,'params:'+JSON.stringify(options.data))

  return await request({
    header,
    method,
    url:wholeUrl,
    timeout:30000,
    data: { ...options.data },
    ...rest
  });
}

export default Request;



const UploadFileApi = async (url:string,option:RequestOptParams,rest?:any)=>{
  const options = {...option}
  const wholeUrl = apiUrl + url;
  const authorization = Taro.getStorageSync('access_token')
  const header = {
    'content-type': 'multipart/form-data',
    'authorization':authorization,
  }
  // Taro.showModal({
  //   content:'调用地址'+wholeUrl
  // })
  log.setFilterMsg('request')
  log.info('UploadRequest:'+wholeUrl,'authorization:'+authorization,'params:'+JSON.stringify(options.data))
  return await uploadFile({
    header,
    url:wholeUrl,
    name:'file',
    timeout:30000,
    formData: { ...options.data },
    filePath:option.filePath || ''
  }).then(response=>{
    log.setFilterMsg('response')
    log.info(response)
    // Taro.showModal({
    //   content:'返回结果'+JSON.stringify(response)
    // })
    //返回解析后的数据
    if (response.statusCode === 200 || response.statusCode === 204) {
      return response.data;
    }else if(response.statusCode === 401){
      Taro.clearStorageSync()
      Taro.showToast({
        title: '登录过期',
        icon: "none",
        duration: 2000,
        mask:true,
        success: function () {
          Taro.redirectTo({
            url:'/pages/login/index'
          })
        }
      })
    }else if(codeMessage[response.statusCode]){
      const errorText = codeMessage[response.statusCode] || 'error';
      Taro.showToast({
        title:errorText,
        icon:'none',
        duration:2000,
        mask:true
      })
      log.error(response.data)
      return Promise.reject(response.data);
    }else {
      log.error(response.data)
      //统一处理错误,或者返回 reject
      return Promise.reject(response.data);
    }
    return response
  }).catch(err=>{
    log.error(JSON.stringify(err))
    Taro.showToast({
      title:JSON.stringify(err),
      icon:'none',
      duration:2000,
      mask:true
    })
  });
}

export {
  UploadFileApi
}
