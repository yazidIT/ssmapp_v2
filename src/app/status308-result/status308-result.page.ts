import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IStatus308Result, IStatus308Cos, IStatus308Data, IStatus308Notice } from '../models/iqueryresult';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-status308-result',
  templateUrl: './status308-result.page.html',
  styleUrls: ['./status308-result.page.scss'],
})
export class Status308ResultPage implements OnInit {

  status308Data: IStatus308Data
  status308Cos: IStatus308Cos
  status308Notices: IStatus308Notice

  constructor(private storage: NativeStorage,
              private utilServ: UtilsService) { 

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

    this.storage.getItem('queryResult').then(resData => {
      console.log(resData)
      var jsonObj = JSON.parse(resData)

      this.status308Data = jsonObj.data
      this.status308Cos = jsonObj.cos

      this.processDateNotices();
    })

  }

  processDateNotices() {
    var notices : IStatus308Notice = this.status308Data.notices[0]

    this.status308Notices.dateNotice1 = "-";
    this.status308Notices.dateNotice2 = "-";
    this.status308Notices.nfaDate = "-";
    this.status308Notices.dateNotice4 = "-";
    this.status308Notices.gazzetteDate2 = "-";

    if(notices.dateNotice1 !== '' && notices.dateNotice1 !== '-')
      this.status308Notices.dateNotice1 = this.utilServ.getDateNonStandard(notices.dateNotice1);
    if(notices.dateNotice2 !== '' && notices.dateNotice2 !== '-')
      this.status308Notices.dateNotice2 = this.utilServ.getDateNonStandard(notices.dateNotice2);
    if(notices.nfaDate !== '' && notices.nfaDate !== '-')
      this.status308Notices.nfaDate = this.utilServ.getDateNonStandard(notices.nfaDate);
    if(notices.dateNotice4 !== '' && notices.dateNotice4 !== '-')
      this.status308Notices.dateNotice4 = this.utilServ.getDateNonStandard(notices.dateNotice4);
    if(notices.gazzetteDate2 !== '' && notices.gazzetteDate2 !== '-')
      this.status308Notices.gazzetteDate2 = this.utilServ.getDateNonStandard(notices.gazzetteDate2);
  }

}
