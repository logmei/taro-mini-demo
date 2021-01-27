export interface UrlType{
  api?:string;
  auth?:string;
}


export interface WxuserInfoProps {
  avatarUrl: string
  city: string
  country: string
  gender: string
  language: string
  nickName: string
  province: string
}

export interface RequestOptParams extends Object{
  data?:Object,
  method?:string,
  urlType?:string,
  filePath?:string;
  contentType?:string // 默认是application/json,application/x-www-form-urlencoded,multipart/form-data
}


export interface ResponseProps {
  [key:string]:any,
  failed?: boolean,
  code?: string,
  message?: string,
  type?: string
}


export interface Page{
  page:number;
  size:number;
  totalPages:number;
  totalElements:number;
  numberOfElements?:number
}
