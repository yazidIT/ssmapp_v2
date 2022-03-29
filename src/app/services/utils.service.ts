import { Injectable } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private appVersion: AppVersion) {}

  getAppVersion() {
    return this.appVersion.getVersionNumber()
  }

  getDateMsFormat(dateObj: Date): string {
    var months = ["01", "02", "03","04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var formatted_date = dateObj.getDate() + "/" + months[dateObj.getMonth()] + "/" + dateObj.getFullYear();
    return formatted_date;
  }

  // process date of the form "2015-12-25 00:00:00"
  // non stndard form - causing issue with JavaScript in iOs
  getDateNonStandard(nonStdDateStr : string): string {
    var d = new Date(nonStdDateStr.replace(/-/g, '/'));
    var dateResult = this.getDateMsFormat(d)
    return dateResult;
  }
}
