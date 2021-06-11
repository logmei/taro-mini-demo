import { ReactNode } from "react";

export interface FormProps{
  title?:string;
  columns:FormColumnsProps[],
  onSubmit:(params:object)=>void,
  submitText?:string,
  showRequiredIcon?:boolean,
  bottom?:ReactNode,
  disabled?:boolean,
  setDisabled?:(params:boolean)=>void,
  autoFocus:boolean,
  blurVertify?:boolean,
  isControlButton?:boolean
}

export interface FormColumnsProps{
  name:string,
  label?:string,
  value?:string,
  placeholder?:string,
  prefix?:ReactNode | string,
  suffix?:ReactNode | string,
  verification?:VerificationProps[]
  defaultValue?:string,
  type:string, // input
  fieldType?:'text' | 'number' | 'idcard' | 'digit',
  required?:boolean;
  formatCallBack?:any,
  maxLength?:number
}


export interface VerificationProps{
  regex?:RegExp,
  errorMsg?:string
}

export interface FormItemProps extends FormColumnsProps{
  value?:string;
  errorMsg?:string;
  onClick?:(params?:any)=>void;
  onClear?:()=>void;
}
