import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { RegisterDeviceService } from './registerdevice.service';

@Injectable({
  providedIn: 'root'
})
export class SsmQueryService {

  constructor(private regDevServ: RegisterDeviceService,
              private http: HTTP,
              private storage: NativeStorage) { }


  async eSearchQuery(urlEndpoint:string) {

    var authHeader: any
    return this.regDevServ.getDevToken().then(token => {
      
      authHeader = 'Bearer' + ' ' + token;
      let headers = { Authorization : authHeader }

      return this.http.get(urlEndpoint, {}, headers)
    })
  }

  saveQueryResult(result:any): Promise<any> {
    return this.storage.setItem('queryResult', result);
  }

  async eQueryQuery(urlEndpoint:string, postBody: any) {

    var authHeader: any
    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      let headers = { Authorization : authHeader }

      return this.http.post(urlEndpoint, postBody, headers)
    })
  }

  async eCompoundQuery(urlEndpoint:string, postBody: any) {

    var authHeader: any
    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      let headers = { Authorization : authHeader }

      return this.http.post(urlEndpoint, postBody, headers)
    })
  }

  async status308Query(urlEndpoint:string) {

    var authHeader: any
    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      let headers = { Authorization : authHeader }

      return this.http.get(urlEndpoint, {}, {})
    })
  }

  async bizTrustQuery(urlEndpoint:string) {

    var authHeader: any
    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      let headers = { Authorization : authHeader }

      return this.http.post(urlEndpoint, {}, headers)
    })
  }

  async contactUsQuery(urlEndpoint:string) {

    var authHeader: any
    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      let headers = { Authorization : authHeader }

      return this.http.get(urlEndpoint, {}, {})
    })
  }
}
