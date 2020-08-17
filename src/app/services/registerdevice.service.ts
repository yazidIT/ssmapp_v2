import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Device } from '@ionic-native/device';

@Injectable({
  providedIn: 'root'
})

export class RegisterDeviceService {

  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'
  private secKey = 'ZMVbSD0CZwdRDxTd3DzvfDT8xy60ZgwX'

  constructor(private http: HttpClient) {
  }

  registerDevice() {
    var timeNow = Math.floor(new Date().getTime()/100000)
    var uuid = 'fd7cfed5-fa60-4942-8a47-79307233781c'
    var platform = 'Chrome'
    var calculatedHash = Md5.hashStr(uuid+platform+timeNow + this.secKey)
    console.log(calculatedHash)

    let headers = new HttpHeaders()
    // headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers.append('Access-Control-Allow-Origin', '*');

    var httpOptions = { headers }
    // send device registraiton to server
    // Http Options
    // var httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8'
    //   })
    // }

    let postData = { "uuid" : uuid, "type" : platform }
    let urlEndpoint = this.apiv2url + 'register-device'

    this.http.post(urlEndpoint, postData, httpOptions)
      .subscribe(data => {
        console.log(JSON.stringify(data));
       }, error => {
        console.log(error);
      });
  }
}
