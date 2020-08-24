import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';

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

      return this.http.get(urlEndpoint, "", headers)
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
}
