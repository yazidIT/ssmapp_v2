import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IStatus308Result, IStatus308Cos, IStatus308Data, IStatus308Notice } from '../models/iqueryresult';

@Component({
  selector: 'app-status308-result',
  templateUrl: './status308-result.page.html',
  styleUrls: ['./status308-result.page.scss'],
})
export class Status308ResultPage implements OnInit {

  status308Data: IStatus308Data
  status308Cos: IStatus308Cos
  status308Notices: IStatus308Notice

  constructor(private storage: Storage) { 

    this.status308Data = {
        companyName: "",
        companyNo: "",
        notices: []
      }

    this.status308Cos = {
      newFormatNo: "",
      oldFormatNo: ""
    }

    this.status308Notices = {
      nfaDate: "",
      dateNotice1: "",
      dateNotice2: "",
      dateNotice4: "",
      gazzetteNo2: "",
      gazzetteDate2: ""
    }

  }

  ngOnInit() {

    this.storage.get('queryResult').then(resData => {
      console.log(resData)
      var jsonObj = JSON.parse(resData)

      this.status308Data = jsonObj.data
      this.status308Cos = jsonObj.cos
      this.status308Notices = this.status308Data.notices[0]
    })

  }

}
