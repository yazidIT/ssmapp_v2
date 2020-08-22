import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { RegisterDeviceService } from './registerdevice.service';

@Injectable({
  providedIn: 'root'
})
export class SsmQueryService {

  constructor(private regDevServ: RegisterDeviceService,
              private http: HttpClient,
              private storage: Storage) { }


  async eSearchQuery(urlEndpoint:string) {

    var authHeader: any
    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      let headers = new HttpHeaders()
      headers.append("Authorization", authHeader);
      var httpOptions = { headers }

      return this.http.get<any>(urlEndpoint, httpOptions).toPromise()
    })
  }

  saveQueryResult(result:any): Promise<any> {
    return this.storage.set('queryResult', result);
  }
}