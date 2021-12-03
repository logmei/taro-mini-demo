import { Columns } from "@/components/DetailCard"

export const statusData = {
  status:'success',
  code:'GE2012333',
  time:'2020.02.23'
}

export const dataTest = {
  name:'GE01323',
  icard:'130292348234923472',
  time:'2021.10.10'
}

export const columnsPass:Columns[] = [{
  label:'姓名',
  name:'name'
},
{
  label:'身份证号码',
  name:'icard'
},
{
  label:'有效日期',
  name:'time'
},
]
