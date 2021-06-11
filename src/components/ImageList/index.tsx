import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import Styles from './index.module.less'

interface ImageListProps{
  images:string[]
}

const ImageList:React.FC<ImageListProps> = ({images})=>{

  const showImage = (src:string)=>{
    Taro.previewImage({
      current:src,
      urls:images
    })
  }

  return (
    <View className={Styles.imageList}>
      {
        images.map((image,index)=>{
          return <View key={index} className={Styles.imageView}>
              <Image onClick={()=>showImage(image)} src={image} mode="aspectFit"></Image>
            </View>
        })
      }
    </View>
  )
}

export default ImageList