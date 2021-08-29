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
  mainurl: any[]
  moreaddurl: any[]

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

      if(this.qrScanData.addUrl === null)
        this.qrScanData.addUrl = []

      else {
        var urlarray = []
        urlarray.push(this.qrScanData.url)
        var mainurlarray = []
        mainurlarray.push(this.qrScanData.mainUrl)

        const concatarray = (...arrays) => [].concat(...arrays.filter(Array.isArray));

        const urlList = concatarray(urlarray, mainurlarray, this.qrScanData.addUrl);
        const urlListSize = urlList.length;

        if(urlListSize > 3) {
          this.mainurl = urlList.slice(0, 3);
          this.moreaddurl = urlList.slice(3, urlListSize + 1);
        } else {
          this.mainurl = urlList.slice(0, urlListSize + 1);
        }
      }
    })
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
