import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SsmloadingService } from '../services/ssmloading.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { TranslateService } from '@ngx-translate/core';
import { QRScannerService } from '../services/qrscanner.service';

const apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'
@Component({
  selector: 'app-biztrust-scan',
  templateUrl: './biztrust-scan.page.html',
  styleUrls: ['./biztrust-scan.page.scss'],
})
export class BiztrustScanPage implements OnInit {

  alertPrompt : AlertPromptComponent

  bizTrustQueryRespondData: any
  ms: boolean

  constructor(private navCtrl: NavController,
              private qrScannerSvc: QRScannerService,
              private ssmloadingSvc: SsmloadingService,
              private translate: TranslateService) {
  
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.ms = this.translate.currentLang === "ms"
  }

  goBack() {
    this.navCtrl.navigateBack('/biztrust')
  }

  goTo(page) {
    if(page === '/biztrust')
      this.navCtrl.navigateBack(page)
    else
      this.navCtrl.navigateForward(page);
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

        if(result === "Unauthorised") {
          this.alertPrompt.presentServerFail("BizTrust", 401, false)
          return
        }

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
          this.navCtrl.navigateForward('/biztrust-result')
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
