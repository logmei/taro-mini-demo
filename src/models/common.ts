import { testService } from '@/service/login';
import Taro from '@tarojs/taro';

export interface CommonState{
  name: string
}

export default {
  namespace: 'common', // 这是模块名
  state: { // 初始化数据
    name:'111',
    accessToken: Taro.getStorageSync('accessToken') || '',
    isSubscribe: !!Taro.getStorageSync('isSubscribe'),
  },

  effects: {
    // 异步方法, 在这里可以用put调用同步的方法
    // generator  这里的方法第二个参数都是{call, put }, call调用异步方法, put 可以调用reducers中的方法
    * saveStorageSync({payload, cb }, {call, put }) {
      for (let index = 0; index <  Object.keys(payload).length; index++) {
        yield call(Taro.setStorage, {
          key: Object.keys(payload)[index],
          data: payload[Object.keys(payload)[index]]
        });
      }
      cb && cb();
      yield put({
        type: 'save', // 方法名
        payload,// 参数
      })
    },
    * test({payload,cb},{call,put,select}){
    Taro.showLoading({title:'加载中'})
      const state = yield select(models=>{
        return models.common
      })
      console.log('state',state)
      const response = yield call(testService,{imageSrc:payload.imageSrc})
      Taro.hideLoading()
      if(!response) Taro.showToast({title:'接口调用出错，请联系管理员'})
      if(response.success){
        if(response.rows.length===0) {
          Taro.showToast({title:'失败',icon:'none'})
          return
        }
        console.log(payload)
        yield put({
          type: 'save',
          payload: {
            name : state.name+'-'+response.value
          }
        })
        cb && cb();
      }

    }
  },

  reducers: { // 同步方法
    save(state, {payload }) {
      return {...state, ...payload };
    },
  },
};
