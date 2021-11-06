import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IBizTrustData } from '../models/iqueryresult';
import { QRScannerService } from '../services/qrscanner.service';
import { SsmloadingService } from '../services/ssmloading.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-biztrust-result',
  templateUrl: './biztrust-result.page.html',
  styleUrls: ['./biztrust-result.page.scss'],
})
export class BiztrustResultPage implements OnInit {

  alertPrompt : AlertPromptComponent
  qrScanData : IBizTrustData
  seeMore : boolean
  todayDate: string
  mainurl: string[] = []
  moreaddurl: string[] = []

  constructor(private inAppBrowser: InAppBrowser,
              private navCtrl: NavController,
              private storage: NativeStorage,
              private qrScannerSvc: QRScannerService,
              private ssmloadingSvc: SsmloadingService,
              private translate: TranslateService) {

    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
    let currentDate = new Date();
    this.todayDate = currentDate.toLocaleDateString('en-MY')

    this.qrScanData = {
      errorMsg: null,
      successCode: null,
      entityNo: null,
      checkDigit: null,
      entityNoNew:null,
      entityName: null,
      statusCode: null,
      statusDescription: null,
      url: null,
      mainUrl: null,
      addUrl: [],
      version: 0,
      entityType: null
    }
  }

  async ngOnInit() {

    let resData = await this.storage.getItem('queryResult')

    console.log("QR Data : " + resData)
    var jsonObj = JSON.parse(resData)
    this.qrScanData = jsonObj

    if(this.qrScanData.successCode !== "00") {

      this.goTo('/biztrust-error')

    } else {

      let mainurlarray = [];
      if(this.qrScanData.mainUrl != null)
        mainurlarray.push(this.qrScanData.mainUrl)

      let addurlarray = [];
      if(this.qrScanData.addUrl != null)
        addurlarray = this.qrScanData.addUrl

      const concatarray = (...arrays) => [].concat(...arrays.filter(Array.isArray));
      const arr = concatarray(mainurlarray, addurlarray);

      var urlList:string[] = arr.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      console.log("Url list: " + urlList)
      const urlListSize = urlList.length;
      console.log("Url list size: " + urlListSize)

      if(urlListSize > 3) {
        this.mainurl = urlList.slice(0, 3);
        this.moreaddurl = urlList.slice(3);
      } else {
        this.mainurl = urlList.slice();
      }
      console.log("mainurl: " + this.mainurl)
      console.log("moreaddurl: " + this.moreaddurl)

    }

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

  scanQRCode() {

    this.qrScannerSvc.scanQRCode().then( res => {

      if(res === "NetworkError") {
        this.goTo('/biztrust-connection-error')
        return;
      }
      
      this.queryBizTrust(res)

    }, (err) => {
      console.log('Error', err);
    })
  }

  async queryBizTrust(barcodetext:string) {

    await this.ssmloadingSvc.showLoader()

    this.qrScannerSvc.bizTrustQuery(barcodetext).then( result => {

      console.log("Result returned: " + result)
      this.ssmloadingSvc.hideLoader().then(() => {

        if(result === "Fail") {
          console.log("Fail")
          return
        }
  
        if(result === "Error") {
          this.navCtrl.navigateForward('/biztrust-error')
          return
        }
  
        // success
        this.qrScannerSvc.saveResult(result).then( res => {
          this.ngOnInit()
          return
        })

      })

    }, err => {

      this.ssmloadingSvc.hideLoader().then(()=> {
        console.log(JSON.stringify(err))
        console.log(err.status)
        this.alertPrompt.presentServerFail(this.translate.instant('MENU_09'), err.status, false)
      })

    })
  }

  toRoman(num : number) : string { 
    if(num < 1){ return "";} 
    if(num >= 40){ return "xl" + this.toRoman(num - 40);} 
    if(num >= 10){ return "x" + this.toRoman(num - 10);} 
    if(num >= 9){ return "ix" + this.toRoman(num - 9);} 
    if(num >= 5){ return "v" + this.toRoman(num - 5);} 
    if(num >= 4){ return "iv" + this.toRoman(num - 4);} 
    if(num >= 1){ return "i" + this.toRoman(num - 1);} 
  }

  openLink(link) {
    this.inAppBrowser.create(link, '_system')
  }
}
