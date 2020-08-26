import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, Platform } from '@ionic/angular';

import { SsmQueryService } from '../services/ssmquery.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';

@Component({
  selector: 'app-equery',
  templateUrl: './equery.page.html',
  styleUrls: ['./equery.page.scss'],
})
export class EqueryPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  placeHolder: string
  queryCoId: string
  eQueryRespondData: any
  alertPrompt : AlertPromptComponent
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
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
    this.placeHolder = "Company No./MyCoID"
  }

  equeryFind() {

    if(this.queryCoId === undefined || this.queryCoId.length == 0 ) {
      this.alertPrompt.presentInputError("e-Query", "Missing search parameter")
      return
    }

    let urlEndpoint = this.apiv2url + 'equery'

    this.ssmQueryServ.eQueryQuery(urlEndpoint, "").then(response => {

      this.eQueryRespondData = JSON.parse(response.data)
      console.log(this.eQueryRespondData)

      if(response.data.result === undefined) {
        this.ssmQueryServ.saveQueryResult(JSON.stringify(response.data)).then(() => {
          console.log("query result saved!")
          this.navCtrl.navigateForward('/esearch-result')
        })
      } else {
        this.ssmQueryServ.saveQueryResult(JSON.stringify(response.data.result)).then(() => {
          console.log("query result saved!")
          this.navCtrl.navigateForward('/esearch-result')
        })
      }

    }, error => {
      console.log(error.status)
      this.alertPrompt.presentServerFail("e-Search", error.status, false)
    })
  }
}
