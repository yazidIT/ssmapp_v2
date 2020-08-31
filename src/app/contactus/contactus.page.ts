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

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  officeData: any
  officeLocation: any
  selectedOption: any

  map: GoogleMap;
  
  constructor(private inAppBrowser: InAppBrowser,
              private platform: Platform,
              private location: Location) { }

  ngOnInit() {
    this.officeData = {
      offices: [
        {
          id: 1,
          placeHolderName: "Putrajaya"
        },
        {
          id: 2,
          placeHolderName: "Melaka"
        }
      ]
    }

    this.selectedOption = this.officeData.offices[0];
    // this.loadMap()
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.location.back()
    });
  }

  openInAppBrowser(link) {
    this.inAppBrowser.create(link)
  }

  officeLocationSelect() {
    console.log(this.officeLocation)
    this.selectedOption = this.officeData.offices[this.officeLocation - 1];
  }

  loadMap() {
    this.map = GoogleMaps.create('map', {
      // camera: {
      //   target: {
      //     lat: 43.0741704,
      //     lng: -89.3809802
      //   },
      //   zoom: 18,
      //   tilt: 30
      // }
    });
    this.goToMyLocation();
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
        animation: GoogleMapsAnimation.BOUNCE
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
