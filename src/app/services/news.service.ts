import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { RegisterDeviceService } from './registerdevice.service';
import { INewsResultData, IChannelItem} from '../models/inewsresult';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private http: HttpClient,
              private regDevServ: RegisterDeviceService,
              private storage: Storage) {
  }

  async getNews() {

    var newsData : INewsResultData
    var urlEndpoint = this.apiv2url + 'rss';
    var authHeader: any

    await this.regDevServ.getDevToken().then(token => {
      authHeader = 'Bearer' + ' ' + token;
    })

    console.log(authHeader)
    let headers = new HttpHeaders()
    headers.append("Authorization", authHeader);
    var httpOptions = { headers }

    this.http.get<any>(urlEndpoint, httpOptions)
      .subscribe(resData => {

        newsData = resData as INewsResultData
        // console.log(JSON.stringify(newsData.channel));
        this.storage.set('newsData', JSON.stringify(newsData))

      }, error => {
        console.log(error);
      });
  }

  getNewsItems() : Promise<INewsResultData>{
    return this.storage.get('newsData').then(newsData => {
      return newsData
    })
  }

}
