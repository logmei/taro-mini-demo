import { View } from '@tarojs/components';
import React from 'react'
import { LTimeLineProps } from './data';
import Styles from './index.module.less'

const Index:React.FC<LTimeLineProps> = ({data,className,children})=>{
  return (
    <View className={`${Styles.LTimeLineStyle} ${className}`}>
      <View>
      {
        data.map((entry,index)=>{
          return (
            <View className={Styles.item} key={index}>
             {entry.leftTitle && <View className={Styles.left}>{entry.leftTitle}</View>}
              <View className={Styles.middle}>
                <View className={Styles.line}></View>
                <View className={Styles.icon}>{entry.icon || <View className={Styles.point}></View>}</View>
              </View>
              <View className={Styles.right}>
                <View className={Styles.title}>{entry.title}</View>
                <View className={Styles.content}>
                  {entry.content && entry.content.map(v=><View key={v}>{v}</View>)}
                </View>
              </View>
            </View>
          )
        })
      }
      </View>


    </View>
  )
}

export default Index;
