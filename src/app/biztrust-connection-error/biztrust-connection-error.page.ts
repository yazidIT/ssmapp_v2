import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-biztrust-connection-error',
  templateUrl: './biztrust-connection-error.page.html',
  styleUrls: ['./biztrust-connection-error.page.scss'],
})
export class BiztrustConnectionErrorPage implements OnInit {

  todayDate: string

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    let currentDate = new Date();
    this.todayDate = currentDate.toLocaleDateString('en-MY')
  }

  goTo(page) {
    this.navCtrl.navigateForward(page);
  }
}
