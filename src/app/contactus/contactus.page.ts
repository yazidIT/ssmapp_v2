import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
  }

  openInAppBrowser(link) {
    this.inAppBrowser.create(link)
  }
}
