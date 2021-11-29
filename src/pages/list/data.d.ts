import { Page } from "@/global/data";

export interface decorateDataProps{
  userName: string | undefined;
  id: string,
  bureauId: string,
  supplierId: string,
  erpShopId: string,
  applyNO: string,
  applyDate: string,
  startDate: string,
  endDate: string,
  status: string, //0:新建，1:审核中，2:审核失败, 3:审核成功
  fileName: string,
  fileUrl: string,
  auditUserName: string,
  auditMsg:string,
  auditDate: string,
  applyImg: string,
  decorateImg: string,
  applyImgList: fileProps[],
  decorateImgList: fileProps[]
}

export interface PassingPersonList extends Page{
  records: passingPersonProps[]
}

export interface decorateList extends Page{
  records: decorateDataProps[]
}

export interface StatusDataProps{
  status:string,
  code:string,
  time:string
}


export interface passingPersonProps{
  id: string,
  bureauId: string,
  supplierId: string,
  supplierName: string,
  stationId: string,
  statinName: string,
  erpShopId: string,
  shopCode: string,
  shopOutCode: string,
  applyNo: string,
  passNo: string,
  templateId: string,
  userName: string,
  mobile: string,
  idCard: string,
  gender: string | undefined,
  birthday:string,
  applyDate: string,
  endDate: string,
  status: string,
  auditUserName: string,
  auditMsg: string,
  auditDate: string,
  headImg: string,
  cardFrontImg: string,
  cardBackImg: string,
  healthCardImg: string,
  otherImgList: fileProps[]
}

export interface fileProps{
  fileName: string,
  fileUrl: string,
  sort: string,
  url:string
}
