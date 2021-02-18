import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SsmQueryService } from '../services/ssmquery.service';
import { SsmloadingService } from '../services/ssmloading.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { Location } from '@angular/common';
import { ConnectionStatus, NetworkService } from '../services/network.service';
import { TranslateService } from '@ngx-translate/core';

const apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'
@Component({
  selector: 'app-biztrust-scan',
  templateUrl: './biztrust-scan.page.html',
  styleUrls: ['./biztrust-scan.page.scss'],
})
export class BiztrustScanPage implements OnInit {

  alertPrompt : AlertPromptComponent

  bizTrustQueryRespondData: any

  constructor(private navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private ssmQueryServ: SsmQueryService,
              private ssmloadingSvc: SsmloadingService,
              private platform: Platform,
              private netServ: NetworkService,
              private translate: TranslateService,
              private location: Location) {
  
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
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

    var scannerOptions = {
      // preferFrontCamera : true, // iOS and Android
      // showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      // torchOn: true, // Android, launch with the torch switched on (if available)
      // saveHistory: true, // Android, save scan history (default false)
      prompt : this.translate.instant('QRSCANPROMPT'), // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      // orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      // disableAnimations : true, // iOS
      // disableSuccessBeep: false // iOS and Android
    };

    this.barcodeScanner.scan(scannerOptions).then(barcodeData => {
      console.log('Barcode data: ', barcodeData.text);

      if(this.netServ.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
        this.goTo('/biztrust-connection-error')
      }
      this.bizTrustQuery(barcodeData.text)
     }).catch(err => {
         console.log('Error', err);
     });
  }


  async bizTrustQuery(barcodetext:string) {

    let urlEndpoint = apiv2url + 'qr/resolve' + "?qrcode=" + barcodetext;

    await this.ssmloadingSvc.showLoader()
    this.ssmQueryServ.bizTrustQuery(urlEndpoint).then(response => {

      this.ssmloadingSvc.hideLoader().then(()=> {

        this.bizTrustQueryRespondData = JSON.parse(response.data)
        console.log(JSON.stringify(this.bizTrustQueryRespondData))

        if(this.bizTrustQueryRespondData.success == false) {
          console.log("Error - " + this.bizTrustQueryRespondData);
          return;
        }

        if(this.bizTrustQueryRespondData.response.successCode !== "00") {
          this.navCtrl.navigateForward('/biztrust-error')
          return;
        }
  
        this.ssmQueryServ.saveQueryResult(JSON.stringify(this.bizTrustQueryRespondData.response)).then(() => {
          console.log("query result saved!")
          this.navCtrl.navigateForward('/biztrust-result')
        })

      })

    }, error => {
      
      this.ssmloadingSvc.hideLoader().then(()=> {
        console.log(JSON.stringify(error))
        console.log(error.status)
        this.alertPrompt.presentServerFail(this.translate.instant('MENU_09'), error.status, false)
      })

    })
  }
}
