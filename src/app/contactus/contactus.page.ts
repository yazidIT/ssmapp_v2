import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Location } from '@angular/common';
import { NavController, Platform } from '@ionic/angular';
import {
  GoogleMaps, GoogleMap,
  GoogleMapsEvent, Marker,
  GoogleMapsAnimation,
  LatLng, GoogleMapOptions, MapTypeId
} from '@ionic-native/google-maps';
import { TranslateService } from '@ngx-translate/core';

import { ISSMOffice, ISSMOffices } from '../models/issmoffices';
import { SsmQueryService } from '../services/ssmquery.service';
import { SsmloadingService } from '../services/ssmloading.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  officeData: ISSMOffices
  officeLocation: any
  selectedOption: ISSMOffice

  map: GoogleMap
  latLng : LatLng

  myHtmlAddr: any
  myHtmlOperation: any
  myHtmlTel: any
  myHtmlFax: any
  
  alertPrompt : AlertPromptComponent
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private inAppBrowser: InAppBrowser,
              private platform: Platform,
              private ssmQueryServ: SsmQueryService,
              private ssmloadingSvc: SsmloadingService,
              private navCtrl: NavController,
              private translate: TranslateService) {
      this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  async ngOnInit() {
    this.officeData = {
      data: {
        defaultid: 0,
        offices : []
      }
    }

    this.selectedOption = {
      id: 0,
      placeHolderName: "",
      name: "",
      nameMs: "",
      location: {
        lat: "",
        long: ""
      },
      address: "",
      tel: "",
      fax: "",
      email: "",
      mainTel: "",
      operationHour: "",
      operationHourMs: "",
      pic: ""
    }

    // this.readData()
    await this.readContactUs()
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  async ngAfterViewInit() {
    await this.platform.ready()
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('home')
    });
    await this.loadMap()
  }

  openLink(link) {
    this.inAppBrowser.create(link, '_system')
  }

  async readContactUs() {

    let urlEndpoint = this.apiv2url + 'json/contact'

    await this.ssmloadingSvc.showLoader()
    this.ssmQueryServ.contactUsQuery(urlEndpoint).then( response => {
      this.ssmloadingSvc.hideLoader()
      this.officeData = JSON.parse(response.data)
      this.officeData.data.offices.forEach(office => {
        office.placeHolderName = office.name
      })
  
      this.selectedOption = this.officeData.data.offices[0]
    }, err => {
      this.ssmloadingSvc.hideLoader()
      console.log(JSON.stringify(err))
      this.alertPrompt.presentResponseError("Contact Load Error", err.status)
    })
  }

  async loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
          // target: this.latLng,
          zoom: 18,
          tilt: 30
        },
      streetViewControl: false,
      mapType: MapTypeId.ROADMAP
    };

    this.map = GoogleMaps.create('map', mapOptions);

    await this.map.one(GoogleMapsEvent.MAP_READY)
    this.changeMarker()
  }

  officeLocationSelect() {
    this.selectedOption = this.officeData.data.offices[this.officeLocation - 1]
    this.changeMarker()
  }

  changeMarker() {

    this.latLng = new LatLng(Number(this.selectedOption.location.lat),
                              Number(this.selectedOption.location.long))

    this.myHtmlAddr = this.selectedOption.address

    var currLang = this.translate.currentLang
    if(currLang === "en")
      this.myHtmlOperation = this.selectedOption.operationHour
    else
      this.myHtmlOperation = this.selectedOption.operationHourMs

    this.myHtmlTel = this.selectedOption.tel
    this.myHtmlFax = this.selectedOption.fax

    this.goToOfficeLocation()
  }

  async goToOfficeLocation() {

    await this.map.clear()

    // Move the map camera to the location with animation
    await this.map.animateCamera({
      target: this.latLng,
      zoom: 15,
      duration: 2000
    });

    //add a marker
    let marker: Marker = this.map.addMarkerSync({
      title: 'SSM ' + this.selectedOption.name,
      position: this.latLng,
      animation: GoogleMapsAnimation.DROP
    });

    //show the infoWindow
    marker.showInfoWindow();

    //If clicked it, display the alert
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      // this.showToast('clicked!');
    });

  }

  goToLocation() {
    this.inAppBrowser.create('https://maps.google.com?q='+this.selectedOption.location.lat + "," +
                              this.selectedOption.location.long, '_system','location=yes')
  }
  
  call() {
    this.inAppBrowser.create('tel:' + this.selectedOption.mainTel.replace(/\s/g,''),'_system')
  }

  email() {
    this.inAppBrowser.create('mailto:' + this.selectedOption.email.replace('[at]','@'),'_system','location=yes')
  }

}
