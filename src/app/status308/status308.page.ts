import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

import { SsmQueryService } from '../services/ssmquery.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';

@Component({
  selector: 'app-status308',
  templateUrl: './status308.page.html',
  styleUrls: ['./status308.page.scss'],
})
export class Status308Page implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  placeHolder: string
  stat308CoId: string
  registrationType: string
  status308ResponseData: any
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
    this.registrationType = "ROC"
    this.placeHolder = "Company/MyCoID No."
  }

  registrationTypeSelect() {

  }

  status308Find() {

    if(this.stat308CoId === undefined || this.stat308CoId.length == 0 ) {
      this.alertPrompt.presentInputError("Status 308", "Missing search parameter")
      return
    }

    let urlEndpoint = this.apiv2url + 'esearch/status308/' + this.stat308CoId

    this.ssmQueryServ.status308Query(urlEndpoint).then(response => {

      this.status308ResponseData = JSON.parse(response.data)
      console.log(this.status308ResponseData)

      this.ssmQueryServ.saveQueryResult(JSON.stringify(this.status308ResponseData)).then(() => {
        console.log("query result saved!")
        this.navCtrl.navigateForward('/status308-result')
      })


    }, error => {
      console.log(JSON.stringify(error))
      console.log(error.status)
      this.alertPrompt.presentServerFail("Status 308", error.status, false)
    })
  }
}
