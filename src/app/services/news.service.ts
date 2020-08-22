import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { RegisterDeviceService } from './registerdevice.service';
import { INewsResultData, IChannelItem} from '../models/inewsresult';
import { from as fromPromise, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private http: HttpClient,
              private regDevServ: RegisterDeviceService) {
  }

  getNews(): Promise<INewsResultData> {

    var urlEndpoint = this.apiv2url + 'rss';
    var authHeader: any

    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      console.log(authHeader)
      let headers = new HttpHeaders()
      headers.append("Authorization", authHeader);
      var httpOptions = { headers }

      return this.http.get<INewsResultData>(urlEndpoint, httpOptions).toPromise()
    })

  }

  // getNewsItems() : Promise<INewsResultData>{
  //   return this.storage.get('newsData').then(newsData => {
  //     return JSON.parse(newsData) as INewsResultData
  //   })
  // }

  getDetailNews(newsUrl:string): Promise<any>{

    var urlEndpoint = newsUrl;
    var authHeader: any

    return this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
      let headers = new HttpHeaders()
      headers.append("Authorization", authHeader);
      var httpOptions = { headers }
      return this.http.get<any>(urlEndpoint, httpOptions).toPromise()
    })
    
  }
}
