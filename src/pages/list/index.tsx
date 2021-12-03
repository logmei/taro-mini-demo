import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { ConnectStates, Page } from '@/global/data';
import LayoutEmpty from '@/components/Layout/EmptyPage'
import { isProceedWithPage } from '@/utils/page';
import { PageConstants } from '@/common/constants';
import ButtonOperator from '@/components/ButtonOperator';
import styles from './index.module.less'
import { statusMap } from './columns';
import Card from './components/Card';




const Index:React.FC<{}> = ({}) => {
  const [list,setList] = useState<any[]>([1,2,3,4,5])
  const [isEmpty,setIsEmpty]= useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false)
  const [scrollHeight,setScrollHeight] = useState<number>(150)
  const [page,setPage] = useState<Page>({...PageConstants,total:0,pages:0})

  useEffect(() => {
    setScrollHeight(Taro.getSystemInfoSync().windowHeight-64);
  }, [])

  useDidShow(()=>{
    let params:any = {...PageConstants,refresh:true}
    handlerList({...params})
  })

  const InitCardDataOnly = (detail)=>{
    return {
      statusData:{
        status:statusMap[detail.status || 4],
        code:detail.applyNo || '',
        time: detail.applyDate
      },
      data:detail,
    }
  }

  // 处理card数据
  const initCardData = (l:any[])=>{

    return l.map((detail:any)=>{
      return InitCardDataOnly(detail)
    })

  }





  const handlerList=(params?:any,showLoadingModal:boolean=true)=>{
    // if(params && !isProceedWithPage(page,params.current,params.refresh)){
    //   return;
    // }
    // if(loading) return
    // setLoading(true)
    // if(showLoadingModal)Taro.showLoading({
    //       title:'加载中...',
    //       mask:true
    //   })


    // let newParams:any = {...PageConstants,...params}
    // getPassingList({...newParams,page:newParams.current-1}).then((res:PassingPersonList)=>{
    //   // console.log('res',res)
    //   if(!res.records|| (res.records && res.records.length===0)){
    //     setIsEmpty(true)
    //     setList([])
    //     setLoading(false)
    //     Taro.hideLoading()
    //     setPage({...PageConstants,pages:0,total:0})
    //     return
    //   } else {
    //     setIsEmpty(false)
    //   }
    //   setPage(state=>({...state,pages:res.pages,current:newParams.current,total:res.total}))

    //   if(newParams.current === 1){
    //     setList(initCardData(res.records))
    //   } else {
    //     // debugger
    //     const ll = initCardData(res.records)
    //     setList((l:any)=>{
    //         return [...l,...ll]
    //     })
    //   }
    //   console.log('...list...')
    //   setLoading(false)
    //   Taro.hideLoading()
    //   Taro.stopPullDownRefresh()
    // })
  }

  const onScrollToLower = () => {
    if(page.pages === page.current)return
    handlerList({...PageConstants,current:page.current+1})
  }

  const handlerButtonClick = (type,id?:string)=>{
    console.log('handlerButtonClick',type,id)
    const idStr = id?'id='+id:''
    if(type==='detail'){
      Taro.navigateTo({
        url:'/pages/list/detail/index?1=1&'+idStr
      })
    }else{
      Taro.navigateTo({
        url:'/pages/list/form/index?type='+type+'&'+idStr
      })
    }

  }


  usePullDownRefresh(() => {
    handlerList({...PageConstants,refresh:true})
  })


  return (
    <View className={styles.business}>
      <LayoutEmpty
        isEmpty={isEmpty}
        className={styles.listStyle}
        isShowTopBar={false}
      >
       <ScrollView
         className={styles.scrollview}
         scrollTop={0}
         style={{ height: scrollHeight + 'px' }}
         refresherBackground="#F0F1F4"
         refresherDefaultStyle="white"
         scrollY
         scrollWithAnimation
         enableBackToTop
         onScrollToLower={onScrollToLower}
       >
          <View className={styles.list}>
           {/* {passingPerson && <Card {...InitCardDataOnly(passingPerson)} detailColumns={ListColumnsPassing} key={0} onClick={()=>handlerButtonClick('detail')} buttonClick={()=>handlerButtonClick('edit')}> </Card>} */}
            {list.map((v,index)=>{
              return <Card {...v} key={index} onClick={()=>handlerButtonClick('detail')} buttonClick={()=>handlerButtonClick('edit')}> </Card>
            })}
             <View className={styles.pageFooter}>{page.pages === page.current  && !loading ? '没有更多啦...' : '加载中...'}</View>
          </View>
       </ScrollView>

    </LayoutEmpty>
      <View className={styles.footerBtnWrap}>
        <ButtonOperator onClick={()=>handlerButtonClick('add')}>新增</ButtonOperator>
      </View>
    </View>
  )
}

export default connect(({common}:ConnectStates)=>{
  // console.log('siteManage',siteManage)
  return {formData:common.formData}
})(Index)
