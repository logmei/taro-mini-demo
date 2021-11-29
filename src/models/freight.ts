import Taro from '@tarojs/taro'
import { Effect, Reducer } from '@/global/data';

export interface FreightModelState{
  area:string
}
export interface FreightModel{
  namespace:string,
  state:FreightModelState,
  effects:{
    fetchList:Effect;
  },
  reducers:{
    save:Reducer<any>
  }
}

const freightListService = ()=>{};

const FreightModels:FreightModel = {
  namespace: 'freightModel', // 这是模块名
  state: { // 初始化数据
    area:''
  },

  effects:{
    // 异步方法, 在这里可以用put调用同步的方法
    // generator  这里的方法第二个参数都是{call, put }, call调用异步方法, put 可以调用reducers中的方法
    * fetchList({ cb }, {call, put, select }) {

      const query = yield select(state=>{
        return state.freightModel.query
      })
      const response = yield call(freightListService,query)
      if(!response.failed){
        yield put({
          type: 'save', // 方法名
          payload:{
            list:[...response]
          },// 参数
        })
        cb && cb();
      } else {
        Taro.showToast({
          title:response.message,
          icon:'none'
        })
      }


    },
  },

  reducers: { // 同步方法
    save(state, {payload,cb }) {
      setTimeout(()=>{
        if(cb)cb()
      },200)
      return {...state, ...payload };
    },
  },
};

export default FreightModels
