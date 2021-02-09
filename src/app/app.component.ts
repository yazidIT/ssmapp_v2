import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RegisterDeviceService } from './services/registerdevice.service';
import { TranslateConfigService } from './services/translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'MENU_04',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'MENU_01',
      url: '/news_announcement',
      icon: 'list'
    },
    {
      title: 'MENU_07',
      url: '/esearch',
      icon: 'list'
    },
    {
      title: 'MENU_05',
      url: '/equery',
      icon: 'list'
    },
    {
      title: 'MENU_06',
      url: '/ecompound',
      icon: 'list'
    },
    {
      title: 'MENU_08',
      url: '/status308',
      icon: 'list'
    },
    {
      title: 'SSMBizTrust',
      url: '/biztrust',
      icon: 'list'
    },
    {
      title: 'MENU_02',
      url: '/contact_us',
      icon: 'list'
    }
    // {
    //   title: 'MENU_03',
    //   url: '/bahasa_melayu',
    //   icon: 'list'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private regDevServ: RegisterDeviceService,
    private translateConfigService: TranslateConfigService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translateConfigService.setLanguage('en')
    });

    await this.regDevServ.registerDevice()
  }

  changeLanguage() {
    if(this.translateConfigService.getLanguage() === 'en')
      this.translateConfigService.setLanguage('ms')
    else
      this.translateConfigService.setLanguage('en')
  }
}
