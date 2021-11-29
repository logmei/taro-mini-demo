import Taro from '@tarojs/taro'
import { Effect, Reducer } from '@/global/data';
import { decorateDataProps, passingPersonProps } from '@/packages/siteManage/data';

export interface SiteManageModelState{
  decorate:decorateDataProps | null,
  passingPerson: passingPersonProps | null
}
export interface SiteManageModel{
  namespace:string,
  state:SiteManageModelState,
  effects:{
    fetchList:Effect;
  },
  reducers:{
    save:Reducer<any>
  }
}

const SiteManageModels:SiteManageModel = {
  namespace: 'siteManage', // 这是模块名
  state: { // 初始化数据
    decorate:null,
    // {
    //   userName: '',
    //   id: '',
    //   bureauId: '',
    //   supplierId: '',
    //   erpShopId: '',
    //   applyNO: '',
    //   applyDate: '',
    //   startDate: '',
    //   endDate: '',
    //   status: '', //0:新建，1:审核中，2:审核失败, 3:审核成功
    //   auditUserName: '',
    //   auditMsg:'',
    //   auditDate: '',
    //   applyImgList: [],
    //   decorateImgList: [],
    //   fileName:'',
    //    fileUrl:'',
    //     applyImg:'',
    //     decorateImg:''
    // },
    passingPerson: null
    // {
    //   id: '',
    //   bureauId: '',
    //   supplierId: '',
    //   supplierName: '',
    //   stationId: '',
    //   statinName: '',
    //   erpShopId: '',
    //   shopCode: '',
    //   shopOutCode: '',
    //   applyNo: '',
    //   passNo: '',
    //   templateId: '',
    //   userName: '',
    //   mobile: '',
    //   idCard: '',
    //   gender: undefined,
    //   birthday:'',
    //   applyDate: '',
    //   endDate: '',
    //   status: '',
    //   auditUserName: '',
    //   auditMsg: '',
    //   auditDate: '',
    //   headImg: '',
    //   cardFrontImg: '',
    //   cardBackImg: '',
    //   healthCardImg: '',
    //   otherImgList: []
    // }
  },

  effects:{
    // 异步方法, 在这里可以用put调用同步的方法
    // generator  这里的方法第二个参数都是{call, put }, call调用异步方法, put 可以调用reducers中的方法
    * fetchList({ cb }, {call, put, select }) {

      // const query = yield select(state=>{
      //   return state.freightModel.query
      // })
      // const response = yield call(freightListService,query)
      // if(!response.failed){
      //   yield put({
      //     type: 'save', // 方法名
      //     payload:{
      //       list:[...response]
      //     },// 参数
      //   })
      //   cb && cb();
      // } else {
      //   Taro.showToast({
      //     title:response.message,
      //     icon:'none'
      //   })
      // }


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

export default SiteManageModels
