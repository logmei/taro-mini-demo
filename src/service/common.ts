import request from '@/utils/requestApi'

export async function getListService(params){
  // return request('/getList',{
  //   method:'get',
  //   data:params
  // })
  return {
    code:0,
    msg:'',
    content:[{
    name:'西红柿',
    size:'10'
  },
  {
    name:'西红柿',
    size:'10'
  },
  {
    name:'西红柿',
    size:'10'
  },
  {
    name:'西红柿',
    size:'10'
  },
  {
    name:'西红柿',
    size:'10'
  }],
  pages:3,
  total:30,
  size:10
}
}
