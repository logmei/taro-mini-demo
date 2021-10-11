import { View, Text, Block, Input } from '@tarojs/components'
import React, { ReactNode, useState } from 'react'
import { StatusProps } from './data'
import Styles from './index.module.less'

export interface Columns{
  label:string;
  name:string;
  callBack?:(param:any)=>void;
  emptyNoShow?:boolean;
  edit?:boolean;
  value?:any;
}
// 详情行value
export const DetailColumnsValue = ({show,showMore,renderColumnsNum,showRowNum,hidden,v,data,edit})=>{
  const [value,setValue] = useState(v.callBack?v.callBack(data):(data[v.name||'']||''))

  const handlerInput = (e)=>{
    v.value = e.detail.value
    setValue(e.detail.value)
  }

  let Dom = <Block></Block>

  if(show){
    let valueDom = <Text>{value}</Text>
    valueDom = edit && v.edit ?<Input value={value} onInput={handlerInput}></Input>:valueDom
    if(showMore && (renderColumnsNum>showRowNum)){
      Dom = <View className={Styles.item} style={{display:hidden===false?'flex':'none'}} key={v.name}><Text>{v.label}</Text>：{valueDom}</View>
    } else{
      Dom = <View className={Styles.item} key={v.name}><Text>{v.label}</Text>：{valueDom}</View>
    }


  }
  return Dom

}

interface IndexProps{
  title?:string,
  subTitle?:string;
  data:any,
  columns:Columns[],
  style?:any,
  suffix?:ReactNode,
  status?:StatusProps| string,
  suffixStatus?:string,
  onClick?:(params?:any) => void,
  childStyle?:object,
  showMore?:boolean,
  showRowNum?:number,
  edit?:boolean
}


const Index:React.FC<IndexProps> = ({
  title,
  subTitle,
  data,
  columns,
  style,
  suffix,
  status,
  suffixStatus,
  onClick,
  children,
  childStyle,
  showMore=false,
  edit = false,
  showRowNum=10
})=>{
  const [hidden,setHidden] = useState<boolean>(showMore)
  const clickHandler = ()=>{
    if(onClick) onClick(data)
  }
  const handlerMore = (e)=>{
    e.stopPropagation();
    setHidden(!hidden)
  }
  let renderColumnsNum = 0
  console.log('detailCard')
  return (
    <View
      className={Styles.DetailCard}
      style={{marginBottom:'10px',...style}}
      onClick={clickHandler}
    >
    <View className={Styles.content}>
      <View className={Styles.left}>
         {title && <View className={Styles.title}>{title}</View>}
         {subTitle && <View className={Styles.subtitle}>{subTitle}</View>}
        {data && columns.map(v=>{
          const showValue = v.callBack?v.callBack(data):data[v.name||'']
          let show = true
          if(v.emptyNoShow && !showValue){
            show = false
          }
          if(show) renderColumnsNum++
           return <DetailColumnsValue
             key={v.name}
             show={show}
             showMore={showMore}
             renderColumnsNum={renderColumnsNum}
             showRowNum={showRowNum}
             edit={edit}
             hidden={hidden}
             v={v}
             data={data}
           ></DetailColumnsValue>
          })}
          {
            showMore && <View className={Styles.more} onClick={handlerMore}>
              <View className={`iconfont icon-xiangxiajiantoux ${hidden===true?'':Styles.selectShowUp} ${Styles.icon}`}></View>

             {showRowNum<renderColumnsNum && <Text>{hidden?'展开更多':'隐藏显示'}</Text>}
              </View>
          }

      </View>
     <View className={Styles.right}>
      <View className={Styles.suffixStyle}>{suffix}</View>
     </View>
     <View className={Styles.statusStyle} style={typeof status!== 'string'?{background:status?.color,color:'#fff'}:''}>{status && typeof status!== 'string' ? status.name:status}</View>
     {suffixStatus &&<View className={Styles.suffixStatusStyle}>
       {suffixStatus}
     </View>
    }
    </View>


     {
       children && <View className={Styles.children} style={{...childStyle}}>{children}</View>
     }


    </View>
  )
}

export default Index
