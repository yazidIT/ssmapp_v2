import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@awesome-cordova-plugins/http/ngx';

import { RegisterDeviceService } from './registerdevice.service';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private http: HTTP,
              private regDevServ: RegisterDeviceService) {
  }

  getNews(): Promise<HTTPResponse> {

    var urlEndpoint = this.apiv2url + 'rss';
    var authHeader: any

    return this.regDevServ.getDevToken().then(token => {

      authHeader = 'Bearer' + ' ' + token;
      console.log(authHeader)
      let headers = { Authorization : authHeader }

      return this.http.get(urlEndpoint, "", headers)
    })

  }

  getDetailNews(newsUrl:string): Promise<HTTPResponse>{

    var urlEndpoint = newsUrl;
    var authHeader: any

    return this.regDevServ.getDevToken().then(token => {

      authHeader = 'Bearer' + ' ' + token;
      let headers = { "Authorization": authHeader }

      return this.http.get(urlEndpoint, "", headers)
    })
    
  }
}
