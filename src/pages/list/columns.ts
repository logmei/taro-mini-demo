import { Columns } from "@/components/DetailCard"
import moment from "moment"
// 通行详情
export const DetailColumnsPassing:Columns[] = [{
  label:'通行人员姓名',
  name:'userName'
},
{
  label:'站点',
  name:'stationName'
},
{
  label:'网点',
  name:'',
  callBack:(data)=>{
    // console.log('detail',data)
    return (data.shopOutCode && data.shopCode)?`${data.shopOutCode || ''}(新)${data.shopCode || ''}(旧)`:''
  }
},
{
  label:'身份证号码',
  name:'idCard'
},
{
  label:'手机号',
  name:'mobile'
},
{
  label:'性别',
  name:'gender',
  callBack:(data)=>data.gender == '0'?'女':'男'
},
{
  label:'出生日期',
  name:'birthday'
},
{
  label:'申请有效期截止日期',
  name:'endDate',
  callBack:(data)=>data.endDate ? moment(data.endDate).format('yyyy-MM-DD') : ''
},
]
// 通行列表
export const ListColumnsPassing:Columns[] = [{
  label:'通行人员姓名',
  name:'userName'
},
{
  label:'身份证号码',
  name:'idCard'
},
{
  label:'申请有效期截止日期',
  name:'endDate',
  callBack:(data)=>data.endDate ? moment(data.endDate).format('yyyy-MM-DD') : ''
},
]

// 装修列表
export const ListColumnsDecorate:Columns[] = [{
  label:'装修店铺网点号',
  name:'',
  callBack:(data)=>data.codeStr || (data.shopOutCode+"(新)"+ data.shopCode+"(旧)")
},
{
  label:'装修周期',
  name:'',
  callBack:(data)=>`${data.startDate || ''} ~ ${data.endDate || ''}`
},
{
  label:'申请日期',
  name:'applyDate',
  callBack:(data)=>data.endDate ? moment(data.applyDate).format('yyyy-MM-DD') : ''
},
]

// 装修详情
export const DetailColumnsDecorate:Columns[] = [{
  label:'装修店铺网点号',
  name:'',
  callBack:(data)=>data.shopOutCode+"(新)"+ data.shopCode+"(旧)"
},
{
  label:'装修周期',
  name:'',
  callBack:(data)=>`${data.startDate || ''}~${data.endDate || ''}`
},
{
  label:'申请日期',
  name:'applyDate',
  callBack:(data)=>data.endDate ? moment(data.applyDate).format('yyyy-MM-DD') : ''
},
]

export const statusMap = ['','review','return','success','draft'] // 新建、审核中、失败、成功、草稿