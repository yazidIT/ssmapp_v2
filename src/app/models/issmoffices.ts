export interface ISSMOffices {
    data: ISSMOfficeData
}

export interface ISSMOfficeData {
    defaultid: number
    offices: Array<ISSMOffice>
}

export interface ISSMOffice {
    id: number
    placeHolderName: string
    name: string
    nameMs: string
    location : ISSMLocation
    address: string
    tel: string
    fax: string
    email: string
    mainTel: string
    operationHour: string
    operationHourMs: string
    pic: string
}

export interface ISSMLocation {
    lat: string
    long: string
}