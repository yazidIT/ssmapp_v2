import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { NewsService } from '../services/news.service';
import { INewsItem } from '../models/inewsresult';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

@Component({
  selector: 'app-detailnews',
  templateUrl: './detailnews.page.html',
  styleUrls: ['./detailnews.page.scss'],
})
export class DetailnewsPage implements OnInit {

  newsurl = null;
  detailNews = null;
  alertPrompt : AlertPromptComponent
  
  constructor(private activatedRoute: ActivatedRoute,
              private newsServ: NewsService,
              private ssmloadingsvc: SsmloadingService,
              private navCtrl: NavController) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {

    this.ssmloadingsvc.showLoaderText('LOADING')
    this.newsurl = this.activatedRoute.snapshot.paramMap.get('newsurl');

    this.newsServ.getDetailNews(this.newsurl).then(

      resData => {

        let newsitem:INewsItem = JSON.parse(resData.data)
        this.detailNews = newsitem.description
        this.ssmloadingsvc.hideLoader()
      }, error => {

        console.log(JSON.stringify(error))
        this.alertPrompt.presentServerFail("Detail News", error.status, true)

      }
    )
  }

}
