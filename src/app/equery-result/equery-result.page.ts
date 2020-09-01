import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IQueryData } from '../models/iqueryresult';

@Component({
  selector: 'app-equery-result',
  templateUrl: './equery-result.page.html',
  styleUrls: ['./equery-result.page.scss'],
})
export class EqueryResultPage implements OnInit {

  queryResult: IQueryData

  constructor(private storage: NativeStorage) { 

    this.queryResult = {
      companyNo: "",
      companyName: "",
      documents: []
    }
  }

  ngOnInit() {

    this.storage.getItem('queryResult').then(resData => {
      console.log(resData)
      var jsonObj = JSON.parse(resData)

      this.queryResult = jsonObj
    })

  }

}
