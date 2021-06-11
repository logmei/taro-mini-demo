
import { getFileUUid, uploadFileFun } from '@/service/task'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'//@tarojs/taro
import React, { useState } from 'react'
import Styles from './index.module.less'

interface OcrCardIndexProps{
  title:string;
  subtitle:string;
  image?:string;
  disabled?:boolean;
  distingguishInfo?:(val:any)=>void;
  uploadFun?:(val:any)=>void
}

const OcrCardIndex:React.FC<OcrCardIndexProps> = ({title,subtitle,disabled,image,distingguishInfo,uploadFun})=>{

  const [imageSrc,setImageSrc] = useState<string>(image||'')
  // 拍照
  const openCamera = ()=>{
    if(disabled) return
    
    Taro.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album','camera'],
      success:(res)=>{
       
        setImageSrc(res.tempFilePaths[0])
        if(distingguishInfo) distingguishInfo(res.tempFilePaths[0])
        getFileUUid().then((response: any)=>{
          uploadFileFun({uuid:response.content,filePath:res.tempFilePaths[0]}).then(()=>{
            if(uploadFun) uploadFun(response.content)
          })
        })
        
       
      }
    })
  }

  return (
    <View className={Styles.OcrCardStyle} >
      <View className={Styles.title}>
        {title}
      </View>
      <View className={Styles.subTitle}>
        {disabled?'':subtitle}
      </View>
      <View className={`${Styles.ocrImageSelect} ${(disabled || imageSrc) && Styles.disabled}`} onClick={openCamera}>
      {
        (image || imageSrc) && <Image src={image || imageSrc} mode="aspectFit" className={Styles.image}></Image>
      }
      </View>
      
      
    </View>
  )
}
export default OcrCardIndex