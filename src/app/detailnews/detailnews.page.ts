import { Component, OnInit } from '@angular/core'
;
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { NewsService } from '../services/news.service';
import { INewsItem } from '../models/inewsresult';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';

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
              private navCtrl: NavController) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.newsurl = this.activatedRoute.snapshot.paramMap.get('newsurl');
    this.newsServ.getDetailNews(this.newsurl).then(
      resData => {
        let newsitem = resData as INewsItem
        this.detailNews = newsitem.description
      }, error => {
        console.log(error)
        this.alertPrompt.presentServerFail("Detail News", 401, true)
      }
    )
  }

}
