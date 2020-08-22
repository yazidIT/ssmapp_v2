import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { IRegDevResult, IRegDevResultData } from '../models/iregdevresult'

@Injectable({
  providedIn: 'root'
})
export class RegisterDeviceService {

  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'
  private secKey = 'ZMVbSD0CZwdRDxTd3DzvfDT8xy60ZgwX'
  private apiurl = 'https://m.ssm.com.my/api/'

  constructor(private http: HttpClient,
              private device: Device,
              private storage: NativeStorage) {}

  async registerDevice() {
    var timeNow = Math.floor(new Date().getTime()/100000)
    var uuid = this.device.uuid
    var platform = this.device.platform
    var calculatedHash = Md5.hashStr(uuid+platform+timeNow + this.secKey)

    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json; charset=utf-8');

    var httpOptions = { headers }

    // version 2
    let postData = { "uuid" : uuid, "os" : platform, "hash" : calculatedHash }
    let urlEndpoint = this.apiv2url + 'device/register'

    this.http.post<IRegDevResultData>(urlEndpoint, postData, httpOptions)
      .subscribe(resData => {

        this.storage.setItem('token', resData.token);

       }, error => {
        console.log(error);
      });
  }

  registerDeviceV1() {

    var uuid = 'fd7cfed5-fa60-4942-8a47-79307233781c'
    var platform = 'Chrome'

    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json; charset=utf-8');

    var httpOptions = { headers }

    // version 1
    let postData = { "uuid" : uuid, "type" : platform }
    let urlEndpoint = this.apiurl + 'register-device'

    this.http.post<any>(urlEndpoint, postData, httpOptions)
      .subscribe(resData => {

        console.log(JSON.stringify(resData));

       }, error => {
        console.log(error);
      });
  }

  getDevToken(): Promise<any> {
    return this.storage.getItem('token').then(data => {
      return data
    })
  }
}
