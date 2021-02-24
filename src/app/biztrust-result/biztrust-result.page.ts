import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IBizTrustData } from '../models/iqueryresult';
import { QRScannerService } from '../services/qrscanner.service';
import { SsmloadingService } from '../services/ssmloading.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';

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

  constructor(private navCtrl: NavController,
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
}
