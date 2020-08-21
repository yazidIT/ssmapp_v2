import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
})
export class NewsPage implements OnInit{

  newsItems : any

  constructor(private newsServ: NewsService) {}

  ngOnInit(): void {
    this.newsItems = []

    this.newsServ.getNews().then(newsData=> {
      this.newsItems = newsData.channel.item
    })
  }
}
