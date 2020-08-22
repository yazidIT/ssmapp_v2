import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { IESearchCompany, IESearchBusiness, IESearchLLP } from '../models/iqueryresult';

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

  appversion: any
  
  constructor(private storage: NativeStorage) { }

  ngOnInit() {

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
        this.companyResult = jsonObj
        return
      }

      this.businessReg = (jsonObj.bizRegNo === undefined) ? false : true
      if(this.businessReg == true) {
        this.businessResult = jsonObj
        return
      }

      this.llpReg = (jsonObj.llpEntry === undefined) ? false : true
      if(this.llpReg == true) {
        this.llpResult = jsonObj
        return
      }
    })
  }

}
