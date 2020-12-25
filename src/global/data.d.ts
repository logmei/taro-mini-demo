export interface UrlType{
  api?:string;
  auth?:string;
}

export interface RequestOptParams extends Object{
  data:Object,
  method?:string,
  urlType?:string,
  dataType?:string // 默认是application/json,form:application/x-www-form-urlencoded
}
