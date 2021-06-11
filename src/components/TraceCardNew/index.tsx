import { View,Image } from '@tarojs/components'
import React from 'react'
import Styles from './index.module.less'

export interface TraceCardItemProps{
  title:string;
  subTitle?:string;
}


export interface ProgressItemsProps{
  name:string; // 经停
  index?:number;
  lightUp:number // 2:亮起，1：已经过，0：未经过
}

export const ProgressList = [
  {
    name:'发站',
    index:0,
    lightUp:0,
  },
  {
    name:'经停',
    index:1,
    lightUp:0,
  },
  {
    name:'到站',
    index:2,
    lightUp:0,
  }
]

const colors = {
  detail:['##D8D8D8','#B8B8B8','#266FFF'],
  list:['#CFDBFF','#7799E4','#266FFF']
}


const Index:React.FC<{list:ProgressItemsProps[],onClick?:()=>void,className?:string,type?:'detail'|'list'}> = ({list,onClick,className,type='detail'})=>{

  const clickHandler = ()=>{
    if(onClick) onClick();
  }
  return (
    <View className={`${Styles.progress} ${className} ${type==='list' ? Styles.listColor:''}`} onClick={clickHandler}>
        <View className={Styles.line} style={{backgroundColor:colors[type][1]}}></View>
      {
        list.map((v,index)=>(<View key={v.name} className={`${Styles.status} ${v.lightUp===2 && Styles.status_active}`}>

          <View className={Styles.content}>
            <View className={Styles.title} style={{backgroundColor:colors[type][v.lightUp],color:type==='list' && v.lightUp===0?'#266FFF':'#fff'}}>
              {v.name}
            </View>
          </View>
            <View className={Styles.line} style={{backgroundColor:colors[type][v.lightUp]}}></View>
          </View>
        ))
    }
    </View>
  )
}

export default Index
