import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ICompoundData } from '../models/iqueryresult';

@Component({
  selector: 'app-ecompound-result',
  templateUrl: './ecompound-result.page.html',
  styleUrls: ['./ecompound-result.page.scss'],
})
export class EcompoundResultPage implements OnInit {

  compoundResult: ICompoundData

  constructor(private storage: Storage) { 

    this.compoundResult = {
      entityNo: "",
      compound: []
    }

  }

  ngOnInit() {

    this.storage.get('queryResult').then(resData => {
      console.log(resData)
      var jsonObj = JSON.parse(resData)

      this.compoundResult = jsonObj
    })

  }

}
