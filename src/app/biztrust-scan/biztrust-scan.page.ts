import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SsmQueryService } from '../services/ssmquery.service';
import { SsmloadingService } from '../services/ssmloading.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-biztrust-scan',
  templateUrl: './biztrust-scan.page.html',
  styleUrls: ['./biztrust-scan.page.scss'],
})
export class BiztrustScanPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 
  alertPrompt : AlertPromptComponent

  constructor(private navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private ssmQueryServ: SsmQueryService,
              private ssmloadingSvc: SsmloadingService,
              private platform: Platform,
              private location: Location) {
  
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.location.back()
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(page) {
    this.navCtrl.navigateForward(page);
  }

  scanQRCode() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data: ', barcodeData.text);
      this.bizTrustQuery(barcodeData.text)
     }).catch(err => {
         console.log('Error', err);
     });
  }

  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'
  bizTrustQueryRespondData: any

  async bizTrustQuery(barcodetext:string) {

    let urlEndpoint = this.apiv2url + 'qr/resolve' + "?qrcode=" + barcodetext;

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
  
        this.ssmQueryServ.saveQueryResult(JSON.stringify(this.bizTrustQueryRespondData.data)).then(() => {
          console.log("query result saved!")
          this.navCtrl.navigateForward('/biztrust-result')
        })

      })

    }, error => {
      
      this.ssmloadingSvc.hideLoader().then(()=> {
        console.log(JSON.stringify(error))
        console.log(error.status)
        this.alertPrompt.presentServerFail("bizTrust QR Code", error.status, false)
      })

    })
  }
}
