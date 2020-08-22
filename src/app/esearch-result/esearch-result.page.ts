import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IESearchCompany, IGstRegNoList, IGSTRegNo } from '../models/iqueryresult';

@Component({
  selector: 'app-esearch-result',
  templateUrl: './esearch-result.page.html',
  styleUrls: ['./esearch-result.page.scss'],
})
export class EsearchResultPage implements OnInit {

  companyResult: IESearchCompany
  companyReg: boolean = true

  constructor(private storage: Storage) { }

  ngOnInit() {

    this.companyResult = {
      companyNo:"",
      chkDigit:"",
      companyName:"",
      comStatus:"",
      findGSTRegNoList: {
        GSTRegNo: {
          dtasofdate: "",
          vchgstnumber: ""
        }
      },
      newFormatNo:"",
      oldFormatNo:""
    }

    this.storage.get('queryResult').then(resData => {
      console.log(resData)
      var jsonObj = JSON.parse(resData)
      this.companyReg = (jsonObj.companyNo === undefined) ? false : true
      this.companyResult = jsonObj
    })
  }

}
