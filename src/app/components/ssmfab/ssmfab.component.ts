import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonFabButton } from '@ionic/angular';

@Component({
  selector: 'app-ssmfab',
  templateUrl: './ssmfab.component.html',
  styleUrls: ['./ssmfab.component.scss'],
})
export class SsmfabComponent implements OnInit {

  @ViewChild('mainfabbtn', { static: false}) private mainFabButton: IonFabButton
  @ViewChild('mainfabbtn', { read: ElementRef, static: true }) private mainFabButtonElement: ElementRef
  constructor() { }

  ngOnInit() {}

  fabMainBtnClicked() {
    // console.log("Fab main button clicked!")
    // console.log(this.mainFabButton.activated)
  }

}
