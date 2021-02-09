import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-biztrust',
  templateUrl: './biztrust.page.html',
  styleUrls: ['./biztrust.page.scss'],
})
export class BiztrustPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(page) {
    this.navCtrl.navigateForward(page);
  }
}
