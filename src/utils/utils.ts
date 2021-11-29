
import Taro from '@tarojs/taro';

export function showErrorToast(msg) {
  Taro.showToast({
    title: msg,
    image: '../asset/icon_error.png'
  })
}

export function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    Taro.reLaunch({
      url: '/pages/login/index'
    });
    return false;
  } else {
    Taro.redirectTo({
      url: url
    });
  }
}

export const showFormatDate = (val: string) => {
  if (!val || val.length < 10) return val
  return val.substr(0, 10)
}

// type:'start'开始，‘end’结束
export const saveFormatDate = (val: string, type: string) => {
  if (type.toLowerCase().indexOf('start') != -1) {
    return val + ' 00:00:00'
  } else if (type.toLowerCase().indexOf('end') != -1) {
    return val + ' 23:59:59'
  }
}
