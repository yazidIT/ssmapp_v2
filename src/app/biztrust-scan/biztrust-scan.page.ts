import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-biztrust-scan',
  templateUrl: './biztrust-scan.page.html',
  styleUrls: ['./biztrust-scan.page.scss'],
})
export class BiztrustScanPage implements OnInit {

  constructor(private navCtrl: NavController, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  goTo(page) {
    this.navCtrl.navigateForward(page);
  }

  scanQRCode() {
    console.log("Scanning ....")
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
