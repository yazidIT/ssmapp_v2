import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { TranslateService } from '@ngx-translate/core';
import { ISSMOffice, ISSMOffices } from '../models/issmoffices';

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

  map: GoogleMap;

  myHtmlAddr: any
  myHtmlOperation: any
  myHtmlTel: any
  myHtmlFax: any
  
  constructor(private inAppBrowser: InAppBrowser,
              private platform: Platform,
              private location: Location) { }
  constructor(private translate: TranslateService) { }

  ngOnInit() {
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

    this.readData()
    // this.loadMap()
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.location.back()
    });

    this.loadMap()
  }

  openInAppBrowser(link) {
    this.inAppBrowser.create(link)
  }

  readData(){
    fetch('./assets/contact.json').then(res => res.json())
      .then(json => {

        this.officeData = json
        this.officeData.data.offices.forEach(office => {
          office.placeHolderName = office.name
        })

        this.selectedOption = this.officeData.data.offices[0]
        this.changeMarker()
      });
  }

  officeLocationSelect() {
    this.selectedOption = this.officeData.data.offices[this.officeLocation - 1]
    this.changeMarker()
  }

  changeMarker() {
    this.myHtmlAddr = this.selectedOption.address

    var currLang = this.translate.currentLang
    if(currLang === "en")
      this.myHtmlOperation = this.selectedOption.operationHour
    else
      this.myHtmlOperation = this.selectedOption.operationHourMs

    this.myHtmlTel = this.selectedOption.tel
    this.myHtmlFax = this.selectedOption.fax

    this.loadMap()
  }

  loadMap() {
    this.map = GoogleMaps.create('map', {
      camera: {
        target: {
          lat: Number(this.selectedOption.location.lat),
          lng: Number(this.selectedOption.location.long)
        },
        zoom: 18,
        tilt: 30
      }
    });
    this.goToLocation();
  }

  goToLocation() {
    console.log("Click address gps")
  }
  
  call() {
    console.log("Click number: " + this.selectedOption.mainTel.replace(/\s/g,''))
  }

  email() {
    console.log("Click email: " + this.selectedOption.email.replace('[at]','@'))
  }

  goToMyLocation() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        duration: 5000
      });

      //add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.DROP
      });

      //show the infoWindow
      marker.showInfoWindow();

      //If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        // this.showToast('clicked!');
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        (data) => {
            console.log("Click MAP",data);
        }
      );
    })
    .catch(err => {
      //this.loading.dismiss();
      // this.showToast(err.error_message);
    });
  }
}
