import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { IonSlides, Platform, IonRouterOutlet } from '@ionic/angular';

import { RegisterDeviceService } from '../services/registerdevice.service';
import { NewsService } from '../services/news.service';
import { INewsResultData } from '../models/inewsresult';
import { SsmloadingService } from '../services/ssmloading.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy, AfterViewInit{

  backButtonSubscription; 
  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;

  sliderOne: any
  newsRss : INewsResultData

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:false
  };

  slideIndex = 0

  selectedLanguage:string;

  constructor(private newsServ: NewsService,
              private platform: Platform,
              private ssmloading: SsmloadingService,
              private regDevSvc: RegisterDeviceService,
              private storage: NativeStorage,
              private routerOutlet: IonRouterOutlet) {

    //Item object for Nature
    this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: []
      };

    this.newsRss = {
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

  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if (!this.routerOutlet.canGoBack())
        // navigator['app'].exitApp();
        if(window.confirm("Are you sure want to exit?"))
          navigator['app'].exitApp();
    });
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    this.ssmloading.showLoaderText('LOADING')

    if(this.storage.getItem('token') !== null) {
      this.initData()

    } else {
      this.regDevSvc.registerDevice().then(()=>{
        this.initData()
  
      }, error => {
        this.ssmloading.hideLoader()
      })

    }
  }

  async initData() {

    this.newsServ.getNews().then(newsData => {

      this.newsRss = JSON.parse(newsData.data)
      this.sliderOne.slidesItems = this.newsRss.channel.item
      this.ssmloading.hideLoader()
    }, error => {

    })
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  slideDidChange(slideView) {
    this.slideWithNav.getActiveIndex().then(slideNo => {
      this.slideIndex = slideNo
    })
    this.checkIfNavDisabled(this.sliderOne, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }

  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

}
