
import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, { getCurrentPages } from '@tarojs/taro'
import { connect } from 'react-redux'
import "taro-ui/dist/style/components/noticebar.scss";
import Style from './index.module.less'






export interface OcrDetailProps{
  imageUri: string;
  data?:any;
  curent:number;
  total:number;
  warning?:string;
}


// 警告提醒：该发票重复采集！
const Index:React.FC<OcrDetailProps> = ()=>{
  const [data,setData] = useState<any>()


   useEffect(()=>{
     const pages = getCurrentPages()
     const current = pages[pages.length-1]
     const eventChannel = current.getOpenerEventChannel()
     eventChannel.on('detailfun',(v:any)=>{
      console.log('detail data',v)
      setData(v)
    })
   },[])

    return (
      <View className={Style.index}>
       详情：{JSON.stringify(data)}
      </View>
    )

}

export default connect()(Index)
