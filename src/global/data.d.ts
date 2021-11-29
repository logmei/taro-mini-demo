import { FreightModelState } from "@/models/freight";

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
  contentType?:string,// 默认是application/json,form:application/x-www-form-urlencoded
}
export interface Page{
  current:number;
  size:number;
  total:number; // 总条数
  pages:number;// 总页数
}


export interface ResponseProps {
  [key:string]:any,
  failed?: boolean,
  code?: string,
  message?: string,
  type?: string
}



export interface ConnectStates{
  freightModel:FreightModelState
}


export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export interface Action<T = any> {
  type: T
}
export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;


export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any,
  call: Function,
  select: Function,
  take: Function,
  cancel: Function,
  [key: string]: any,
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap,
) => void;


export interface PageList{
  totalPages: number,
  totalElements: number,
  numberOfElements?: number,
  size: number,
  number: number,
  empty?: boolean
}
