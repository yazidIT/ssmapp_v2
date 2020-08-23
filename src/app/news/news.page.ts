import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy, AfterViewInit{

  backButtonSubscription; 
  
  newsItems : any
  appversion: any
  
  constructor(private newsServ: NewsService,
              private platform: Platform,
              private routerOutlet: IonRouterOutlet) {}

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if (!this.routerOutlet.canGoBack())
        navigator['app'].exitApp();
      else
        this.routerOutlet.pop()
    });
  }

  ngOnInit(): void {
    this.newsItems = []

    this.newsServ.getNews().then(newsData=> {

      this.newsItems = newsData.data.channel.item

    })
  }
}
