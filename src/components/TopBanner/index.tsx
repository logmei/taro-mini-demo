import { Image, View, OfficialAccount } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import Styles from './index.module.less'



const Index:React.FC<{}>=()=>{
  const loadHandler = (detail)=>{
    console.log('load...',detail)
  }
  const errorHandler = (detail)=>{
    console.log('error...',detail)
  }
  return (
    <View className={Styles.topBanner}>
       <OfficialAccount className={Styles.officialAccount} onLoad={loadHandler} onError={errorHandler}></OfficialAccount>
      {/* <Image mode='aspectFit'></Image> */}
    </View>
  // <Swiper
  //   className={Styles.swiperStyle}
  //   indicatorColor='#999'
  //   indicatorActiveColor='#333'
  //   circular
  //   indicatorDots
  //   autoplay
  // >
  //   <SwiperItem>
  //     <Image src={BannerIcon} mode="aspectFit"></Image>
  //   </SwiperItem>
  // </Swiper>
  )
}

export default Index
