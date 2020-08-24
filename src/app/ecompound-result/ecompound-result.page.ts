import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { ICompoundData } from '../models/iqueryresult';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-ecompound-result',
  templateUrl: './ecompound-result.page.html',
  styleUrls: ['./ecompound-result.page.scss'],
})
export class EcompoundResultPage implements OnInit {

  compoundResult: ICompoundData
  appversion: any
  
  constructor(private storage: NativeStorage,
              private utilsServ: UtilsService) { 

    this.compoundResult = {
      entityNo: "",
      compound: []
    }

  }

  ngOnInit() {

    this.storage.getItem('queryResult').then(resData => {
      console.log(resData)
      var jsonObj = JSON.parse(resData)

      this.compoundResult = jsonObj
    })

    this.utilsServ.getAppVersion().then(version => {
      this.appversion = version
    })

  }

}
