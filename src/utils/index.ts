// 将params 转换为url参数
export const formatUrl = (params: Object) => {
  let url = '1=1'
  Object.keys(params).forEach((key: string) => {
    url += `&${key}=` + params[key]
  })
  return url
}
