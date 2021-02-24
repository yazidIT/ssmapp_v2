import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionStatus, NetworkService } from './network.service';
import { SsmQueryService } from './ssmquery.service';

const apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

@Injectable({
  providedIn: 'root'
})
export class QRScannerService {

  constructor(private translate: TranslateService,
              private netServ: NetworkService,
              private ssmQueryServ: SsmQueryService,
              private barcodeScanner: BarcodeScanner) { }

  bizTrustQueryRespondData: any

  scanQRCode() : Promise<string>{

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

    return this.barcodeScanner.scan(scannerOptions).then(barcodeData => {

      if(this.netServ.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
        return "NetworkError"
      }

      return barcodeData.text

     }).catch(err => {
         return err
     });
  }

  bizTrustQuery(barcodetext:string): Promise<string> {

    let urlEndpoint = apiv2url + 'qr/resolve' + "?qrcode=" + barcodetext;

    return this.ssmQueryServ.bizTrustQuery(urlEndpoint).then(response => {

      console.log(JSON.stringify(response.status))
      if(response.status == 401 || response.status == 404)
        return "Unauthorised"

      this.bizTrustQueryRespondData = JSON.parse(response.data)
      console.log(JSON.stringify(this.bizTrustQueryRespondData))

      if(this.bizTrustQueryRespondData.success == false) {
        console.log("Error - " + this.bizTrustQueryRespondData);
        return "Fail";
      }

      if(this.bizTrustQueryRespondData.response.successCode !== "00") {
        return "Error";
      }

      return this.bizTrustQueryRespondData.response

    }, error => {
      return error
    })
  }

  saveResult(data): Promise<string> {
    return this.ssmQueryServ.saveQueryResult(JSON.stringify(data)).then(() => {
      console.log("query result saved!")
      return "Success"
    })
  }
}
