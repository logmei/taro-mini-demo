import { CSSProperties, ReactNode } from "react";

export interface LTimeLineItemProps{
  leftTitle?:string|ReactNode;
  title?:string|ReactNode;
  content?:string[];
  icon?:ReactNode;
  style?:CSSProperties;
}

export interface LTimeLineProps{
  className?:String;
  data:LTimeLineItemProps[]
}
