export interface Iqueryresult {
}

export interface IESearchCompany {
    companyNo: string
    chkDigit: string
    companyName: string
    comStatus: string
    findGSTRegNoList: IGstRegNoList
    newFormatNo: string
    oldFormatNo: string
}

export interface IGstRegNoList {
    GSTRegNo: IGSTRegNo
}

export interface IGSTRegNo {
    dtasofdate : string
    vchgstnumber: string
}

export interface IESearchBusiness {
    bizRegNo: string
    chkDigit: string
    bizName: string
    bizStatus: string
    findGSTRegNoList: IGstRegNoList
    newFormatNo: string
    oldFormatNo: string
}