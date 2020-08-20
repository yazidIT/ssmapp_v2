import { Component, OnInit } from '@angular/core'
;
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';
import { INewsItem } from '../models/inewsresult';
@Component({
  selector: 'app-detailnews',
  templateUrl: './detailnews.page.html',
  styleUrls: ['./detailnews.page.scss'],
})
export class DetailnewsPage implements OnInit {

  newsurl = null;
  detailNews = null;

  constructor(private activatedRoute: ActivatedRoute,
              private newsServ: NewsService) { }

  ngOnInit() {
    this.newsurl = this.activatedRoute.snapshot.paramMap.get('newsurl');
    this.newsServ.getDetailNews(this.newsurl).then(
      resData => {
        let newsitem = resData as INewsItem
        this.detailNews = newsitem.description
      }, error => {
        console.log(error)
      }
    )
  }

}
