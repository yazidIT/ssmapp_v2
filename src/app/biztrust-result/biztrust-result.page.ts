import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-biztrust-result',
  templateUrl: './biztrust-result.page.html',
  styleUrls: ['./biztrust-result.page.scss'],
})
export class BiztrustResultPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  constructor(private location: Location,
              private platform: Platform) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.location.back()
    });
  }

}
