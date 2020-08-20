import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private appVersion: AppVersion) {}

  getAppVersion() {
    return this.appVersion.getVersionNumber()
  }
}
