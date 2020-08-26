import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { NewsService } from '../services/news.service';
import { INewsResultData } from '../models/inewsresult';

@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy, AfterViewInit{

  backButtonSubscription; 
  
  newsItems : any
  newsData : INewsResultData
  
  constructor(private newsServ: NewsService,
              private platform: Platform,
              private location: Location) {
    
    this.newsData = {
      channel : {
        title: "",
        link: "",
        description: "",
        lastBuildDate: "",
        generator: "",
        ttl: "",
        language: "",
        item: []
      }
    }
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.location.back()
    });
  }

  ngOnInit(): void {
    this.newsItems = []

    this.newsServ.getNews().then(newsData=> {

      this.newsData = JSON.parse(newsData.data)
      this.newsItems = this.newsData.channel.item

    })

  }
}
