import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-biztrust',
  templateUrl: './biztrust.page.html',
  styleUrls: ['./biztrust.page.scss'],
})
export class BiztrustPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  constructor(private navCtrl: NavController, 
              private platform: Platform, 
              private location: Location) { }


  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('home')
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
}
