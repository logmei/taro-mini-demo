import React, { useEffect, useState } from 'react'
import { AtImagePicker } from 'taro-ui'
import { connect } from 'react-redux'
import FormLabelEdit from '@/components/FormLabelEdit'
import Buttons from '@/components/Buttons'
import { addPassing, getPassingDetail, getStationList,updatePassing } from '@/service/siteManage'
import { upLoadImage } from '@/service/global'
import { showErrorToast } from '@/utils/utils'
import { verifyByImage } from '@/utils'
import { Dispatch } from 'redux'
import { View, ScrollView, Input, Picker  } from '@tarojs/components'
import Taro, { setNavigationBarTitle } from '@tarojs/taro'
import { GenderList } from '@/constants';
import { ConnectState } from '@/global/data';
import styles from './index.module.less'
import FormImage from '../../components/FormImage';
import { passingPersonProps } from '../../data';
import { statusMap } from '../../columns'
import TopCard from '../../components/TopCard'


interface FileProps{
  url:string
}
export interface ValueItem{
  id:string;
  name:string;
}

export interface StationItem{
  stationId:string;
  stationName:string;
  shopList:ShopItem[]
}

export interface ShopItem{
  code:string;
  id: string;
  outCode: string;
  codeStr: string
}

const SuffixIcon = ()=>{
  return <View className='at-icon at-icon-chevron-down' style={{color:'#D9D9D9',fontSize:'40rpx'}}></View>
}

interface IndexProps{
  passingPerson:passingPersonProps,
  dispatch:Dispatch
}

const Index:React.FC<IndexProps> = ({passingPerson,dispatch}) => {
  const [data, setData] = useState(passingPerson || {})
  const [type, setType] = useState('add') // add：新增，edit：编辑
  const [scrollHeight,setScrollHeight] = useState<number>(150)          
  const [files,setFiles] = useState<FileProps[]> (passingPerson && passingPerson.otherImgList ? passingPerson.otherImgList.map(v=>({...v,url:v.fileUrl})) : [])
  const [errorMsg,setErrorMsg] = useState<string>('')
  const [stationList, setStationList] = useState<StationItem[]>([])
  const [shopList, setShopList] = useState<ShopItem[]>([])


  useEffect(() => {
    setScrollHeight(Taro.getSystemInfoSync().windowHeight-64);
    const params = Taro.getCurrentInstance().router?.params
    getStationList().then(sta=>{
      setStationList(sta)
      if(params && params.type==='edit'){
        setNavigationBarTitle({title:'编辑通行人员'})
        setType('edit')
        if(params.id!==undefined) getPassingDetail({id:params.id}).then(res=>{
          setData(res)
          if(res.stationId){
            setShopList(sta.find(v=>v.stationId===res.stationId).shopList)
          }
          if(res.otherImgList)setFiles(res.otherImgList.map(v=>({...v,url:v.fileUrl})))
        })
       
      }
    })
   
   
  }, [])

      // 预览图片
    const onImageClick = (index:number,file)=>{
      console.log('onImageClick',index, file)
      if(files.length===8) return
      Taro.previewImage({
        current:files[index].url,
        urls:files.map(v=>v.url)
      })
    }

    const onChangeFiles = (f:FileProps[],operation:string)=>{
      if(f.length>8) {
        Taro.showModal({
          content:'最多只能选择8张图片'
        })
        return
      }
      for(let i=0;i<f.length;i++){
        if(!verifyByImage(f[i].url)){
          Taro.showToast({
            title:'请上传png、jpg、jpeg图片',
            icon:'none'
          })
          return
        }
      }
      console.log('onChangeFiles',f)
      if(operation==='add'){
        setFiles(f)
      } else if(operation==='remove'){
        setFiles(f)
      }

      setDataValue(f.map(v=>({fileName:'',fileUrl:v.url,url:v.url})),'otherImgList')
    }

  const uploadImageFun = (fileUrl)=>{
    return new Promise((resolve,reject)=>{
      upLoadImage(fileUrl).then((res:any)=>{
        resolve(res.fileUrl)
      }).catch(err=>{
        reject(err)
      })
    })
  }


  const handlerSubmit = async ()=>{
    
    const submitData = {...data}

    if(!submitData.stationId && !submitData.erpShopId){
      Taro.showToast({
        title:'请选择站点和网点',
        icon:'none'
      })
      return ;
    }
    Taro.showToast({
      title:'提交中...',
      icon:'none'
    })
    // 头像地址
    if(submitData.headImg) await uploadImageFun(submitData.headImg).then((res:any)=>{
      submitData.headImg=res||''
    })
    // 身份证正面
    if(submitData.cardFrontImg) await uploadImageFun(submitData.cardFrontImg).then((res:any)=>{submitData.cardFrontImg=res||''})
    // 身份证背面
    if(submitData.cardBackImg) await uploadImageFun(submitData.cardBackImg).then((res:any)=>{submitData.cardBackImg=res||''})
    // 健康证
    if(submitData.healthCardImg) await uploadImageFun(submitData.healthCardImg).then((res:any)=>{submitData.healthCardImg=res||''})
    // 其他照片
    if(submitData.otherImgList && submitData.otherImgList.length>0)submitData.otherImgList.forEach(async(v)=>{
      await uploadImageFun(v.url).then((res:any)=>{v.fileUrl=res||''})
    })
   if(type === 'edit' && Taro.getCurrentInstance().router?.params.id){
    updatePassing(submitData).then(res=>{
      Taro.showToast({
        title:'修改成功',
        icon:'none',
        success:()=>{
          Taro.navigateTo({
            url:'/packages/siteManage/passingPerson/index'
          })
        }
      })
    }).catch((err:any)=>{
      showErrorToast(JSON.stringify(err))
    })
   }else{
    addPassing(submitData).then(res=>{
      if(type==='edit'){
        dispatch({
          type:'siteManage/save',
          payload:{
            decorate: null
          }
        })
      }
      Taro.showToast({
        title:'添加成功',
        icon:'none',
        success:()=>{
          Taro.navigateTo({
            url:'/packages/siteManage/passingPerson/index'
          })
        }
      })
    }).catch((err:any)=>{
      showErrorToast(JSON.stringify(err))
    })
   }
   


  }

  //暂存草稿
  const handlerTempSave = ()=>{
    console.log('siteManage/save',data)
    dispatch({
      type:'siteManage/save',
      payload:{
        passingPerson: {...data,status:'',id:'',applyNo:'',auditUserName:'',auditMsg:'',auditDate:''}
      },
      cb:()=>{
        Taro.showToast({
          title:'保存草稿成功',
          icon:'none'
        })
      }
    })
  }

  // 设置内容
  const setDataValue = (value,name)=>{
   
    setData(v=>{
      return {...v,[name]:value}
    })
  }

  const handlerStationChange = (value)=>{
    setDataValue(stationList[value].stationId,'stationId')
    setShopList(stationList[value].shopList)
  }

  // 选择图片
  const handlerChooseImage = (name)=>{
    Taro.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album','camera'],
      success:function(res){
        var tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths,type)
        if(verifyByImage(tempFilePaths)){
          setDataValue(tempFilePaths[0],name)
        } else {
          Taro.showToast({
            title:'请上传png、jpg、jpeg图片',
            icon:'none'
          })
        }
        
       
      }
    })
  }




  return (
    <View className={styles.form}>
      <ScrollView
        className={styles.content}
        scrollTop={0}
        style={{ height: scrollHeight + 'px' }}
        refresherBackground="#F0F1F4"
        refresherDefaultStyle="white"
        scrollY
        scrollWithAnimation
        enableBackToTop
      >
        {type==='edit' && ( <TopCard code={data.applyNo} status={statusMap[data.status || 4]} reason={data.auditMsg}></TopCard>)}
        <FormLabelEdit title="姓名"><Input value={data.userName} onInput={(e)=>setDataValue(e.detail.value,'userName')} placeholder="请输入姓名" placeholderClass={styles.inputPlaceholder}></Input></FormLabelEdit>
        
        <Picker mode='selector' value={GenderList.findIndex(v=>v.id==data.gender)} range={GenderList} rangeKey='label' onChange={(e)=>setDataValue(e.detail.value,'gender')}>
         <FormLabelEdit title="性别" value={data.gender!== undefined && GenderList[data.gender].label}  suffix={<SuffixIcon></SuffixIcon>}></FormLabelEdit>
        </Picker>
        <Picker mode='date' value={data.birthday} onChange={(e)=>setDataValue(e.detail.value,'birthday')}>
         <FormLabelEdit title="出生日期" value={data.birthday} suffix={<SuffixIcon></SuffixIcon>}></FormLabelEdit>
        </Picker>
        <FormLabelEdit title="身份证号码"  ><Input value={data.idCard} onInput={(e)=>setDataValue(e.detail.value,'idCard')} placeholder="请输入身份证号码" placeholderClass={styles.inputPlaceholder}></Input></FormLabelEdit>
        <FormLabelEdit title="手机号" ><Input value={data.mobile} onInput={(e)=>setDataValue(e.detail.value,'mobile')} placeholder="请输入手机号" placeholderClass={styles.inputPlaceholder}></Input></FormLabelEdit>

        <Picker mode='selector' value={stationList && stationList.findIndex(v=>v.stationId===data.stationId)} range={stationList} rangeKey='stationName' onChange={(e)=>handlerStationChange(e.detail.value)}>
        <FormLabelEdit title="申请站点" value={stationList && stationList.find(v=>v.stationId===data.stationId)?.stationName} suffix={<SuffixIcon></SuffixIcon>}></FormLabelEdit>
        </Picker>
        {
          shopList.length>0 && <Picker mode='selector' value={shopList.length && shopList.findIndex(v=>v.id===data.erpShopId)} range={shopList} rangeKey='codeStr' onChange={(e)=>setDataValue(shopList[e.detail.value].id,'erpShopId')}>
          <FormLabelEdit title="申请网点" value={shopList && shopList.find(v=>v.id===data.erpShopId)?.codeStr} suffix={<SuffixIcon></SuffixIcon>}></FormLabelEdit>
          </Picker>
        }
        
        <Picker mode='date' value={data.endDate} onChange={(e)=>setDataValue(e.detail.value,'endDate')}>
         <FormLabelEdit title="申请有效期截止日期" value={data.endDate} suffix={<SuffixIcon></SuffixIcon>}></FormLabelEdit>
        </Picker>
        <FormImage title="头像" url={data.headImg} imageName="head" onClick={()=>handlerChooseImage('headImg')}></FormImage>
        <FormImage title="身份证正面照" url={data.cardFrontImg} imageName="icard-front" onClick={()=>handlerChooseImage('cardFrontImg')}></FormImage>
        <FormImage title="身份证反面照" url={data.cardBackImg} imageName="icard-back" onClick={()=>handlerChooseImage('cardBackImg')}></FormImage>
        <FormImage title="健康证照" url={data.healthCardImg} imageName="healthy" onClick={()=>handlerChooseImage('healthCardImg')}></FormImage>
        <View className={styles.upload}>
          <View className={styles.label}>其他照片：请上传清晰照片最多8张</View>
          <AtImagePicker
            className={`${files && files.length>=8 && styles.ImagePickerNochoose}`}
            mode='aspectFit'
            multiple
            count={8}
            length={4}
            showAddBtn
            files={files}
            onChange={onChangeFiles}
            onImageClick={onImageClick}
          />
        </View>
        </ScrollView>
      <View className={styles.footerBtnWrap}>
        <View className={styles.errorMsg} style={{visibility:errorMsg?'visible':'hidden'}}>{errorMsg}</View>
        <Buttons leftButtonText="暂存草稿" rightButtonText="提交申请" onClickLeft={handlerTempSave} onClickRight={handlerSubmit}></Buttons>
      </View>
    </View>
  )
}

export default connect(({siteManage}:ConnectState)=>{
  return {passingPerson:siteManage.passingPerson}
})(Index)