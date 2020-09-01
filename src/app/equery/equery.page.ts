import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, Platform } from '@ionic/angular';

import { SsmQueryService } from '../services/ssmquery.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

@Component({
  selector: 'app-equery',
  templateUrl: './equery.page.html',
  styleUrls: ['./equery.page.scss'],
})
export class EqueryPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  placeHolder: string
  queryCoId: string
  registrationType: string
  eQueryRespondData: any
  alertPrompt : AlertPromptComponent
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
              private ssmloadingSvc: SsmloadingService,
              private navCtrl: NavController,
              private platform: Platform,
              private location: Location) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.location.back()
    });
  }

  ngOnInit() {
    this.registrationType = "ROC"
    this.placeHolder = "Company No./MyCoID"
  }

  equeryFind() {

    if(this.queryCoId === undefined || this.queryCoId.length == 0 ) {
      this.alertPrompt.presentInputError("e-Query", "Missing search parameter")
      return
    }

    let urlEndpoint = this.apiv2url + 'esearch/equery'
    let postData = { "documentNo": this.queryCoId, "lang": "en" }

    this.ssmloadingSvc.showLoader()
    this.ssmQueryServ.eQueryQuery(urlEndpoint, postData).then(response => {

      this.ssmloadingSvc.hideLoader()
      this.eQueryRespondData = JSON.parse(response.data)
      console.log(JSON.stringify(this.eQueryRespondData))

      this.ssmQueryServ.saveQueryResult(JSON.stringify(this.eQueryRespondData.data)).then(() => {
        console.log("query result saved!")
        this.navCtrl.navigateForward('/equery-result')
      })

    }, error => {
      this.ssmloadingSvc.hideLoader()
      console.log(JSON.stringify(error))
      console.log(error.status)
      this.alertPrompt.presentServerFail("e-Query", error.status, false)
    })
  }
}
