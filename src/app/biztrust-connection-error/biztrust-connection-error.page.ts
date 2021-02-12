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
    if(page === "biztrust-scan")
      this.navCtrl.navigateBack(page)
    else
      this.navCtrl.navigateForward(page);
  }
}
