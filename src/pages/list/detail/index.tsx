import React, { useState } from 'react'
import { AtImagePicker } from 'taro-ui';
import { View } from '@tarojs/components'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import styles from './index.module.less'
import StatusCard, { StatusCardProps } from '../components/StatusCard';
import DetailRows from '../components/DetailRows';
import { statusMap } from '../columns';
import { passingPersonProps } from '../data';
import FormImage from '../components/FormImage';
import { columnsPass, dataTest } from '../components/Card/columns';




const RentControl = () => {
  const [data, setdata] = useState<passingPersonProps>()
  const [statusData, setstatusData] = useState<StatusCardProps>({
    status:statusMap[4],
    code:'',
    time: ''
  })
  React.useEffect(() => {
    getDetailData()
  }, [])

  usePullDownRefresh(() => {
    getDetailData()
  })

  const getDetailData = ()=>{
   console.log('id',Taro.getCurrentInstance().router?.params.id)

  }


  const showPic = (url)=>{
    Taro.previewImage({
      current:url,
      urls:[url]
    })
  }
  const onImageClick = (index:number,file)=>{
    if(data && data.otherImgList.length>0)
    Taro.previewImage({
      current:data.otherImgList[index].fileUrl,
      urls:data.otherImgList?data?.otherImgList.map(v=>v.fileUrl):[]
    })
  }



  return (
    <View className={styles.form}>
      <View className={styles.content}>
      <StatusCard className={styles.statusCard} {...statusData}></StatusCard>
      <View className={styles.line}></View>
      <DetailRows data={dataTest} columns={columnsPass}></DetailRows>
      <FormImage title="头像" onClick={showPic} url={data?.headImg} imageName="head"></FormImage>

      <View className={styles.upload}>
        <View className={styles.label}>其他照片</View>
        <AtImagePicker
          className={`${styles.ImagePickerNochoose}`}
          mode='aspectFit'
          multiple
          length={4}
          files={data ? data.otherImgList.map(v => ({ url: v.fileUrl })) : []}
          onChange={()=>{}}
          onImageClick={onImageClick}
        />
      </View>
      </View>


    </View>
  )
}

export default RentControl
