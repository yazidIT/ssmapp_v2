import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Platform, IonRouterOutlet, NavController, IonicSwiper } from '@ionic/angular';

import { RegisterDeviceService } from '../services/registerdevice.service';
import { NewsService } from '../services/news.service';
import { INewsResultData } from '../models/inewsresult';
import { SsmloadingService } from '../services/ssmloading.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Swiper, SwiperOptions, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSwiper]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy, AfterViewInit{

  backButtonSubscription; 
  @ViewChild('slideWithNav', {static: false}) slideWithNav: Swiper;

  sliderOne: any
  newsRss : INewsResultData

  //Configuration for each Slider
  slideOptsOne : SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  slideIndex = 0

  selectedLanguage:string;
  alertPrompt : AlertPromptComponent

  constructor(private newsServ: NewsService,
              private platform: Platform,
              private navCtrl: NavController,
              private translate: TranslateService,
              private ssmloading: SsmloadingService,
              private regDevSvc: RegisterDeviceService,
              private storage: NativeStorage,
              private routerOutlet: IonRouterOutlet) {

    this.alertPrompt = new AlertPromptComponent(this.navCtrl)

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
      if (!this.routerOutlet.canGoBack()) {
        let exittitle = this.translate.instant('EXITTITLE')
        let exitmessage = this.translate.instant('EXITMSG')
        let canceltext = this.translate.instant('CANCEL')
        this.alertPrompt.presentAlertConfirmExitApp(exittitle, exitmessage, canceltext).then(()=> {

        })
      }
    });
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    await this.ssmloading.showLoaderText('LOADING')

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

  initData() {

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
    this.slideIndex = this.slideWithNav.activeIndex
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
