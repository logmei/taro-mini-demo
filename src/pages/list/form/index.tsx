import React, { useEffect, useRef, useState } from 'react'
import { AtImagePicker } from 'taro-ui'
import { connect } from 'react-redux'
import FormLabelEdit from '@/components/FormLabelEdit'
import Buttons from '@/components/Buttons'
import { showErrorToast } from '@/utils/utils'
import { Dispatch } from 'redux'
import { ConnectStates } from '@/global/data'
import { View, ScrollView, Input, Picker  } from '@tarojs/components'
import Taro, { setNavigationBarTitle } from '@tarojs/taro'
import styles from './index.module.less'
import FormImage from '../components/FormImage';
import { statusMap } from '../columns'
import TopCard from '../components/TopCard'
import { CheckIdcard, CheckPhone, CheckUserName, GenderList, verifyByImage } from '../verification'



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
  formData:any,
  dispatch:Dispatch
}

const Index:React.FC<IndexProps> = ({formData,dispatch}) => {
  const [data, setData] = useState(formData || {})
  const [type, setType] = useState('add') // add：新增，edit：编辑
  const [scrollHeight,setScrollHeight] = useState<number>(150)
  const [files,setFiles] = useState<FileProps[]> (formData && formData.otherImgList ? formData.otherImgList.map(v=>({...v,url:v.fileUrl})) : [])
  const [errorMsg,setErrorMsg] = useState<string>('')
  const [stationList, setStationList] = useState<StationItem[]>([])
  const [shopList, setShopList] = useState<ShopItem[]>([])
  const id = useRef<any>()


  useEffect(() => {
    setScrollHeight(Taro.getSystemInfoSync().windowHeight-60);
    const params = Taro.getCurrentInstance().router?.params
    if(params && params.type==='edit'){
      setNavigationBarTitle({title:'编辑'})
      setType('edit')
    }
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
          content:'最多只能选择4张图片'
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
        if(!fileUrl ){
          resolve(fileUrl)
        }else{
         console.log('服务端上传')
        }

      })
    }

  const handlerSubmit = async ()=>{

    const submitData = {...data}
  //校验姓名
  if(!CheckUserName(submitData.userName)) return
  //校验身份证号
  if(!CheckIdcard(submitData.idCard)) return
  //校验手机号
  if(!CheckPhone(submitData.mobile)) return

    Taro.showToast({
      title:'提交中...',
      icon:'none'
    })

    Promise.all([
      uploadImageFun(submitData.headImg),
        // 身份证正面
      uploadImageFun(submitData.cardFrontImg),
      // 身份证背面
      uploadImageFun(submitData.cardBackImg),
      new Promise(async (resolve,reject)=>{
        let list:any = []
          // 其他照片
          // console.log('submitData.otherImgList',submitData.otherImgList)
        if(submitData.otherImgList){
          // debugger
          const funList =  submitData.otherImgList.map((v)=>{
            if(v.url) return uploadImageFun(v.url)
            else return v.fileUrl
          })
          const fileUrlList = await Promise.all(funList)
          list=fileUrlList.map(url=>({fileUrl:url}))
          // console.log('list',list)
          resolve(list)
        }else{
          resolve(list)
        }
      })
    ]).then( (result:any)=>{
    //  console.log('result',result)
      submitData.headImg=result[0]
      submitData.cardFrontImg=result[1]
      submitData.cardBackImg=result[2]
      submitData.otherImgList=result[3]
      if(type === 'edit' && id.current){
        console.log('update')

      }else{
        console.log('add',submitData)
      }
    }).catch((err)=>{
      showErrorToast(JSON.stringify(err))
    })

  }

  //暂存草稿
  const handlerTempSave = ()=>{
    console.log('common/save',data)
    dispatch({
      type:'common/save',
      payload:{
        formData: {...data}
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

        <Picker mode='selector' value={data.gender!== undefined ? GenderList.findIndex(v=>v.id==data.gender) : 0} range={GenderList} rangeKey='label' onChange={(e)=>setDataValue(e.detail.value,'gender')}>
         <FormLabelEdit title="性别" value="男"  suffix={<SuffixIcon></SuffixIcon>}></FormLabelEdit>
        </Picker>
        <Picker mode='date' value={data.birthday || '1990-01-01'} onChange={(e)=>setDataValue(e.detail.value,'birthday')}>
         <FormLabelEdit title="出生日期" value={data.birthday} suffix={<SuffixIcon></SuffixIcon>}></FormLabelEdit>
        </Picker>
        <FormLabelEdit title="身份证号码"  ><Input value={data.idCard} onInput={(e)=>setDataValue(e.detail.value,'idCard')} placeholder="请输入身份证号码" placeholderClass={styles.inputPlaceholder}></Input></FormLabelEdit>
        <FormLabelEdit title="手机号" ><Input value={data.mobile} onInput={(e)=>setDataValue(e.detail.value,'mobile')} placeholder="请输入手机号" placeholderClass={styles.inputPlaceholder}></Input></FormLabelEdit>

        <FormImage title="头像" url={data.headImg} imageName="head" onClick={()=>handlerChooseImage('headImg')}></FormImage>
        <View className={styles.upload}>
          <View className={styles.label}>其他照片：请上传清晰照片最多4张</View>
          <AtImagePicker
            className={`${files && files.length>=8 && styles.ImagePickerNochoose} ${styles.ImagePicker}`}
            mode='aspectFit'
            multiple
            count={4}
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
        <Buttons leftButtonText="暂存" rightButtonText="提交" onClickLeft={handlerTempSave} onClickRight={handlerSubmit}></Buttons>
      </View>
    </View>
  )
}

export default connect(({common}:ConnectStates)=>{
  return {formData:common.formData}
})(Index)
