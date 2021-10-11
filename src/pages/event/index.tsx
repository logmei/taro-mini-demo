import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { AtSwipeAction } from 'taro-ui'
import { ModelState } from '@/global/data'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import "taro-ui/dist/style/components/swipe-action.scss";
import Style from './index.module.less'







interface IndexProps extends ModelState{
  ocrList:any;
  statusList: any;
  dispatch:Dispatch
}

const swipeOption = [
  {
    text: '删除',
    style: {
      backgroundColor: 'red'
    }
  },
]
const list = [
'aaaaaaaaaa',
'bbbbbbbbb',
'cccccccccc'
]
const Index:React.FC<IndexProps> = ()=>{
  const [scrollHeight,setScrollHeight] = useState<number>(150)
  const [swipeWidth, setSwipeWidth] = useState(384)
  // 查看详情
  const handlerDetail = (obj)=>{

    Taro.navigateTo({
      url:'/pages/ticketHolder/detail/index',
      success: function(res:any) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('detailfun', obj)
      }
    })
 }
  // 滑动项点击
  const handlerSwipeOptions = (params,v)=>{

    console.log('handlerSwipeOptions',params,v)

  }



  useEffect(()=>{
    Taro.getSystemInfo().then(res => {
      console.log(res.windowWidth - 30);
      setSwipeWidth(res.windowWidth - 30)
    })
    setScrollHeight(Taro.getSystemInfoSync().windowHeight-100)

  },[])
    return (
      <View className={Style.index}>

        <ScrollView
          className={Style.scrollview}
          style={{height:scrollHeight+'px'}}
          scrollY
          scrollWithAnimation
          enableBackToTop
        >
            {
              list.map(v=>{
                return <AtSwipeAction
                  onClick={(param)=>handlerSwipeOptions(param,v)}
                  key={v}
                  className={Style.listItem}
                  areaWidth={swipeWidth}
                  maxDistance={100}
                  options={swipeOption}
                >
                  <View onClick={()=>handlerDetail(v)}>{v}</View>
                </AtSwipeAction>
              })
            }


        </ScrollView>

      </View>
    )

}

export default connect()(Index);

