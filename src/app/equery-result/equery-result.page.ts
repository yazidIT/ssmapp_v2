import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { IQueryData } from '../models/iqueryresult';
import { TranslateConfigService } from '../services/translate-config.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-equery-result',
  templateUrl: './equery-result.page.html',
  styleUrls: ['./equery-result.page.scss'],
})
export class EqueryResultPage implements OnInit {

  queryResult: IQueryData
  officeData;
  docNameLibrary;

  constructor(private storage: NativeStorage,
              private translateConfigService: TranslateConfigService,
              private utils : UtilsService,
              private translate: TranslateService) { 

    this.queryResult = {
      companyNo: "",
      companyName: "",
      documents: []
    }
  }

  ngOnInit() {

    this.readData().then( () => {
      this.storage.getItem('queryResult').then(resData => {
        console.log(resData)
        var jsonObj = JSON.parse(resData)
        let queryData = jsonObj

        queryData.documents.forEach( arrayItem => {
          let docCodeNumber = arrayItem.document;
          arrayItem.document = this.docNameLibrary[arrayItem.document];

          if(arrayItem.document === undefined) {
            arrayItem.document = docCodeNumber;
          }

          if(arrayItem.documentDate !== '-' && arrayItem.documentDate !== '') {
            arrayItem.documentDate = this.utils.getDateNonStandard(arrayItem.documentDate);
          }
    
          if(arrayItem.queryDate !== '-' && arrayItem.queryDate !== '') {
            arrayItem.queryDate = this.utils.getDateNonStandard(arrayItem.queryDate);
          }
    
          if(arrayItem.rejectDate !== '-' && arrayItem.rejectDate !== '') {
            arrayItem.rejectDate = this.utils.getDateNonStandard(arrayItem.rejectDate);
          }

          if(arrayItem.status === 'A')
            arrayItem.status = this.translate.instant('STAT_APPROVE');
          else if(arrayItem.status === 'T')
            arrayItem.status = this.translate.instant('STAT_AUTOREJECT');
          else if(arrayItem.status === 'Q')
            arrayItem.status = this.translate.instant('STAT_QUERY');
          else if(arrayItem.status === 'B')
            arrayItem.status = this.translate.instant('STAT_BUSINESS');
          else if(arrayItem.status === 'C')
            arrayItem.status = this.translate.instant('STAT_DISSOLVED');
          else if(arrayItem.status === 'D')
            arrayItem.status = this.translate.instant('STAT_REMOVE');
    
        })

        this.queryResult = queryData
      })
    });

  }

  async readData(){

    let lang = this.translateConfigService.getLanguage()
    let filedata;

    if(lang === 'en')
      filedata = './assets/doccode_en.json'
    else
      filedata = './assets/doccode_ms.json'

    await fetch(filedata).then(res => res.json())
      .then(data => {
        this.docNameLibrary = data
      });
  }
}
