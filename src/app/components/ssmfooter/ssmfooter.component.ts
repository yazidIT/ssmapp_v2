import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-ssmfooter',
  templateUrl: './ssmfooter.component.html',
  styleUrls: ['./ssmfooter.component.scss']
})
export class SsmfooterComponent implements OnInit {

  appversion: any
  constructor(private utilsServ: UtilsService,
              private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.utilsServ.getAppVersion().then(version => {
      this.appversion = version
    })
  }

  openInAppBrowser(link){
    this.inAppBrowser.create(link)
  }

}
