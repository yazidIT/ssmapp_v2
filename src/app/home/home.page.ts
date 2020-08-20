import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { RegisterDeviceService } from '../services/registerdevice.service';
import { NewsService } from '../services/news.service';
import { INewsResultData } from '../models/inewsresult';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', {static: false}) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', {static: false}) slideWithNav3: IonSlides;

  sliderOne: any
  newsRss : INewsResultData
  appversion: any

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:false
  };

  constructor(private regDevServ: RegisterDeviceService,
              private newsServ: NewsService,
              private utilsServ: UtilsService) {

    //Item object for Nature
    this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: []
      };
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData() {

    await this.regDevServ.registerDevice()
    await this.newsServ.getNews()
    await this.newsServ.getNewsItems().then(newsData => {
      this.newsRss = newsData
    })
    
    this.sliderOne.slidesItems = this.newsRss.channel.item

    this.utilsServ.getAppVersion().then(version => {
      this.appversion = version
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
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
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
