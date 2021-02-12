import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IBizTrustData } from '../models/iqueryresult';

@Component({
  selector: 'app-biztrust-result',
  templateUrl: './biztrust-result.page.html',
  styleUrls: ['./biztrust-result.page.scss'],
})
export class BiztrustResultPage implements OnInit {

  qrScanData : IBizTrustData
  seeMore : boolean
  todayDate: string

  constructor(private navCtrl: NavController,
              private storage: NativeStorage) {

    let currentDate = new Date();
    this.todayDate = currentDate.toLocaleDateString('en-MY')

    this.qrScanData = {
      errorMsg: null,
      successCode: null,
      entityNo: "12345678",
      checkDigit: "T",
      entityNoNew: "2010122003",
      entityName: "Company Sdn Bhd",
      statusCode: "Y",
      statusDescription: "YAHOO",
      url: null,
      mainUrl: "www.mainurl.com.my",
      addUrl: [],
      version: 0,
      entityType: "ROB"
    }
  }

  ngOnInit() {
    this.storage.getItem('queryResult').then(resData => {
      console.log("QR Data : " + resData)
      var jsonObj = JSON.parse(resData)

      this.qrScanData = jsonObj
      this.qrScanData.addUrl = ["www.url2.com.my", "www.url3.com.my", "www.url4.com.my", "www.url5.com.my"]
    })
    // this.qrScanData.addUrl = ["www.url2.com.my", "www.url3.com.my", "www.url4.com.my", "www.url5.com.my"]
  }

  goTo(page) {
    if(page === "biztrust-scan")
      this.navCtrl.navigateBack(page)
    else
      this.navCtrl.navigateForward(page);
  }

  seeMoreUrl() {
    this.seeMore = !this.seeMore
    console.log("Click seemore: " + this.seeMore)
  }
}
