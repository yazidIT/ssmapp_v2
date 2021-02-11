import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';

import { IESearchCompany, IESearchBusiness, IESearchLLP } from '../models/iqueryresult';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-esearch-result',
  templateUrl: './esearch-result.page.html',
  styleUrls: ['./esearch-result.page.scss'],
})
export class EsearchResultPage implements OnInit {

  companyResult: IESearchCompany
  companyReg: boolean = false

  businessResult: IESearchBusiness
  businessReg: boolean = false

  llpResult: IESearchLLP
  llpReg: boolean = false

  todayDate: string
  
  constructor(private storage: NativeStorage,
              private utilServ: UtilsService,
              private translate: TranslateService) { }

  ngOnInit() {

    let currentDate = new Date();
    this.todayDate = currentDate.toLocaleDateString('en-MY')

    this.companyResult = {
      companyNo:"",
      chkDigit:"",
      companyName:"",
      comStatus:"",
      findGSTRegNoList: {
        GSTRegNo: {
          dtasofdate: "",
          vchgstnumber: "",
          vchregistrationnumber: ""
        }
      },
      newFormatNo:"",
      oldFormatNo:""
    }

    this.businessResult = {
      bizRegNo:"",
      chkDigit:"",
      bizName:"",
      bizStatus:"",
      findGSTRegNoList: {
        GSTRegNo: {
          dtasofdate: "",
          vchgstnumber: "",
          vchregistrationnumber: ""
        }
      },
      newFormatNo:"",
      oldFormatNo:""
    }

    this.llpResult = {
      llpEntry: {
        llpNo: "",
        llpName: "",
        llpStatus: "",
        findGSTRegNoList: {
          GSTRegNo: {
            dtasofdate: "",
            vchgstnumber: "",
            vchregistrationnumber: ""
          }
        },
      }
    }

    this.storage.getItem('queryResult').then(resData => {
      console.log(resData)
      var jsonObj = JSON.parse(resData)

      this.companyReg = (jsonObj.companyNo === undefined) ? false : true
      if(this.companyReg == true) {
        this.formatCompanyReg(resData)
        return
      }

      this.businessReg = (jsonObj.bizRegNo === undefined) ? false : true
      if(this.businessReg == true) {
        // this.businessResult = jsonObj
        this.formatBusinessReg(resData)
        return
      }

      this.llpReg = (jsonObj.llpEntry === undefined) ? false : true
      if(this.llpReg == true) {
        // this.llpResult = jsonObj
        this.formatLLPReg(resData)
        return
      }
    })
  }

  formatCompanyReg(data: string) {
    var jsonObj = JSON.parse(data)
    var status = "";
    var dtaDate = "";

    this.companyResult = jsonObj
    if(jsonObj.comStatus !== undefined)
      status = jsonObj.comStatus
    if(jsonObj.findGSTRegNoList.GSTRegNo !== undefined)
      dtaDate = jsonObj.findGSTRegNoList.GSTRegNo.dtasofdate;

    if(dtaDate.length != 0) 
      this.companyResult.findGSTRegNoList.GSTRegNo.dtasofdate = this.utilServ.getDateMsFormat(new Date(dtaDate));

    this.documentStatusString(status).then( (result: string) => {
      this.companyResult.comStatus = result
    })
    
  }

  formatBusinessReg(data: string) {
    var jsonObj = JSON.parse(data)
    var status = "";
    var dtaDate = "";

    this.businessResult = jsonObj
    if(jsonObj.bizStatus !== undefined)
      status = jsonObj.bizStatus
    if(jsonObj.findGSTRegNoList.GSTRegNo !== undefined)
      dtaDate = jsonObj.findGSTRegNoList.GSTRegNo.dtasofdate;

    if(dtaDate.length != 0) 
      this.businessResult.findGSTRegNoList.GSTRegNo.dtasofdate = this.utilServ.getDateMsFormat(new Date(dtaDate));

    this.documentStatusString(status).then( (result: string) => {
      this.businessResult.bizStatus = result
    })
    
  }

  formatLLPReg(data: string) {
    var jsonObj = JSON.parse(data)
    var status = "";
    var dtaDate = "";

    this.llpResult = jsonObj
    if(jsonObj.llpEntry !== undefined)
      status = jsonObj.llpEntry.llpStatus
    if(jsonObj.llpEntry.findGSTRegNoList.GSTRegNo !== undefined)
      dtaDate = jsonObj.llpEntry.findGSTRegNoList.GSTRegNo.dtasofdate;

    if(dtaDate.length != 0) 
      this.llpResult.llpEntry.findGSTRegNoList.GSTRegNo.dtasofdate = this.utilServ.getDateMsFormat(new Date(dtaDate));

    this.documentStatusString(status).then( (result: string) => {
      this.llpResult.llpEntry.llpStatus = result
    })
    
  }

  documentStatusString(status: string) {

    if(status === "A")
      return this.translate.get('STAT_ACTIVE').toPromise()
    else if(status === "E")
      return this.translate.get('STAT_EXISTING').toPromise()
    else if(status === 'W' || status === 'M')
      return this.translate.get('STAT_WINDINGUP').toPromise()
    else if(status === 'D')
      return this.translate.get('STAT_DISSOLVED').toPromise()
    else if(status === 'R')
      return this.translate.get('STAT_REMOVE').toPromise()
    else if(status === 'C')
      return this.translate.get('STAT_CEASEDBUSINESS').toPromise()
    else if(status === 'X')
      return this.translate.get('STAT_NULLVOIDCOURT').toPromise()
    else if(status === 'B')
      return this.translate.get('STAT_DISSOLVEDCONVERSIONLLP').toPromise()
    else if(status === 'Y')
      return this.translate.get('STAT_STRUKOFFWINDUPCOURT').toPromise()
    else if(status === 'L')
      return this.translate.get('STAT_EXPIRED').toPromise()
    else if(status === 'T')
      return this.translate.get('STAT_TERMINATED').toPromise()
    else if(status === 'S')
      return this.translate.get('STAT_STRIKEOFF').toPromise()
    else if(status === 'CW')
      return this.translate.get('STAT_WINDUPCOURT').toPromise()
    else if(status === 'VW')
      return this.translate.get('STAT_WINDUPVOLUNTARY').toPromise()
    else if(status === 'ES')
      return this.translate.get('STAT_STRIKINGOFF').toPromise()
    else if(status === 'EV')
      return this.translate.get('STAT_WINDINGUPVOLUNTARY').toPromise()
    else if(status === 'EC')
      return this.translate.get('STAT_WINDINGUPCOURT').toPromise()
  }
}
