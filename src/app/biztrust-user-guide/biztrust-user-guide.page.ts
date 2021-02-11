import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-biztrust-user-guide',
  templateUrl: './biztrust-user-guide.page.html',
  styleUrls: ['./biztrust-user-guide.page.scss'],
})
export class BiztrustUserGuidePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
