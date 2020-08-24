import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RegisterDeviceService } from './services/registerdevice.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'HOME',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'News & Announcement',
      url: '/news_announcement',
      icon: 'list'
    },
    {
      title: 'e-Search',
      url: '/esearch',
      icon: 'list'
    },
    {
      title: 'e-Query',
      url: '/equery',
      icon: 'list'
    },
    {
      title: 'e-Compound',
      url: '/ecompound',
      icon: 'list'
    },
    {
      title: 'Status 308',
      url: '/status308',
      icon: 'list'
    },
    {
      title: 'Contact Us',
      url: '/contact_us',
      icon: 'list'
    },
    {
      title: 'Bahasa Melayu',
      url: '/bahasa_melayu',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private regDevServ: RegisterDeviceService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    await this.regDevServ.registerDevice()
  }
}
