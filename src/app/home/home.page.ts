import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { RegisterDeviceService } from '../services/registerdevice.service';
import { NewsService } from '../services/news.service';
import { INewsResultData } from '../models/inewsresult';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', {static: false}) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', {static: false}) slideWithNav3: IonSlides;

  sliderOne: any;
  private newsRss : INewsResultData

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:false
  };

  constructor(private regDevServ: RegisterDeviceService,
              private newsServ: NewsService) {

    //Item object for Nature
    this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: '../../assets/images/1.jpg'
          },
          {
            id: 2,
            image: '../../assets/images/2.jpg'
          },
          {
            id: 3,
            image: '../../assets/images/3.jpg'
          },
          {
            id: 4,
            image: '../../assets/images/4.jpg'
          },
          {
            id: 5,
            image: '../../assets/images/5.jpg'
          }
        ]
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
    
    this.sliderOne.slidesItems = this.newsRss.channel
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
