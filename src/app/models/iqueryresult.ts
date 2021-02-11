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
    vchregistrationnumber: string
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

export interface IESearchLLP {
    llpEntry : ILlpEntry
}

export interface ILlpEntry {
    llpNo: string
    llpName: string
    llpStatus: string
    findGSTRegNoList: IGstRegNoList
}

export interface ICompoundData {
    entityNo: string
    compound: Array<ICompoundInfo>
}

export interface ICompoundInfo {
    compoundNo: string
    compoundStatus: string
    amount: string
}

export interface IStatus308Result {
    data: IStatus308Data
    cos: IStatus308Cos
}
export interface IStatus308Data {
    companyNo: string
    companyName: string
    notices: Array<IStatus308Notice>
}

export interface IStatus308Notice {
    nfaDate: string
    dateNotice1: string
    dateNotice2: string
    dateNotice4: string
    gazzetteNo2: string
    gazzetteDate2: string
}

export interface IStatus308Cos {
    newFormatNo: string
    oldFormatNo: string
}

export interface IQueryData {
    companyNo: string
    companyName: string
    documents: Array<IQueryDocument>
}

export interface IQueryDocument {
    document: string
    documentDate: string
    queryDate: string
    rejectDate: string
    status: string
}

export interface IBizTrustData {
    errorMsg: string
    successCode: string
    entityNo: string
    checkDigit: string
    entityNoNew: string
    entityName: string
    statusCode: string
    statusDescription: string
    url: string
    mainUrl: string
    addUrl: Array<string>
    version: number
    entityType: string
}