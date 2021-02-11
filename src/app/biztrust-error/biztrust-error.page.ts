import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-biztrust-error',
  templateUrl: './biztrust-error.page.html',
  styleUrls: ['./biztrust-error.page.scss'],
})
export class BiztrustErrorPage implements OnInit {

  todayDate: string
  hideNoInfo: boolean
  hideInvalidCode: boolean

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    let currentDate = new Date();
    this.todayDate = currentDate.toLocaleDateString('en-MY')
    this.hideNoInfo = true
    this.hideInvalidCode = false
  }

  goTo(page) {
    this.navCtrl.navigateForward(page);
  }
}
