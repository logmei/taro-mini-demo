import Taro from '@tarojs/taro'
import { Page } from '@/global/data'
import { getOpenidFromService, getUserInfo, loginByOpenidService } from '@/service/login'
// import dva from '@/utils/dva'

// const dispatch = dva.getDispatch()


// 将params 转换为url参数
export const formatUrl = (params: Object) => {
  let url = '1=1'
  Object.keys(params).forEach((key: string) => {
    url += `&${key}=` + params[key]
  })
  return url
}
// 格式化时间
export const formatTime = (time: string) => {
  const date = new Date(time)
  return `${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`
}

// 是否继续进行分页操作
export const isProceedWithPage = (page: Page, current: number, refresh?: boolean | undefined) => {
  if (refresh) return true
  if (page.totalPages === 0) return true
  if (page.totalPages === current - 1) return false
  return true
}

// 获取用户信息
export const getUserInfoHandler = (v?: any) => {
  // debugger
  console.log('getUserInfoHandler', v)
  Taro.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        Taro.getUserInfo({
          success: result => {
            Taro.setStorageSync('wxUserInfo', JSON.stringify(result.userInfo))
          },
        })
      }
    },
  })
}

// 自动登录
export const autoLogin = () => {
  const openId = Taro.getStorageSync('wxAppletOpenid')
  if (!openId) {
    Taro.login({
      success: res => {
        getOpenidFromService({ code: res.code, end: 'driver' }).then((result:any) => {
          Taro.setStorageSync('wxAppletOpenid', result.openid)
          loginFun(result.openid)
        })
      },
    })
  } else {
    Taro.showLoading({
      title:'加载中...',
      mask:true
    })
    loginFun(openId)
  }
}

const loginFun = (openId: string) => {
  loginByOpenidService({
    client_id: 'client', //string Y 客户端名称
    grant_type: 'openid', //string Y 授权类型，分implicit和password两种
    open_id: openId, // string N 微信openId，code和open_id两者必传⼀个
  }).then(res => {

    Taro.hideLoading()
    if (res.success === false) {
      // 强制登录
      Taro.redirectTo({
        url: '/pages/login/index?forceLogin=forceLogin',
      })
      // that.setData({ responseData: res.message, prompt: true });
    }
  })
}

// 判断是否登陆
export const isLogin = () => {
  // debugger
  return new Promise((resovle, reject) => {
    const UserInfo = Taro.getStorageSync('userInfo')
    if (!UserInfo) {
      resovle(false)
    } else {
      resovle(true)
    }
  })
}

// 去掉所有空格
export const Trim = (letter: string) => {
  return letter.replace(/\s/g, '')
}
// 相加数据
export const accAdd = (arg1, arg2) => {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }

  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
// 格式化ocr识别的内容，做格式化
export const formatOcrVal = (val: string, type: string) => {
  switch (type) {
    case 'number':
      return val.replace(/[^\d]/g, '')
    case 'letter':
      return val.replace(/[^a-zA-Z]/g, '')
    case 'digit':
      return val.replace(/[^\d|\.]/g, '')
    case 'letterAndNumber':
      return val.replace(/[^a-zA-Z|\d]/g, '')
    default:
      return val
  }
}

// 小程序内存
export const MemoryWarningFun = ()=>{
  Taro.onMemoryWarning((res)=>{
    Taro.showModal({
      title:'提示',
      content:'您的小程序内存需要清理，否则影响本应用的正常使用！',
      showCancel:false
    })
    Taro.reportMonitor('1',res?res.level:8)
  })
}
