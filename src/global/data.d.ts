export interface UrlType{
  api?:string;
  auth?:string;
}

export interface RequestOptParams extends Object{
  data:Object,
  method?:string,
  urlType?:string,
  filePath?:string;
  contentType?:string,// 默认是application/json,form:application/x-www-form-urlencoded
}
export interface Page{
  page:number;
  size:number;
  totalPages:number;
  totalElements:number;
  numberOfElements?:number
}
