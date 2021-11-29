import { Page } from "@/global/data";


// 是否继续进行分页操作
export const isProceedWithPage=(page:Page,current:number,refresh?:boolean|undefined)=>{
  if(refresh) return true
  if(page.pages === 0) return true
  if(page.pages === current-1) return false
  return true
}