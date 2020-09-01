import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

import { SsmQueryService } from '../services/ssmquery.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

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
    this.placeHolder = "Company/MyCoID No."
  }

  registrationTypeSelect() {

  }

  async status308Find() {

    if(this.stat308CoId === undefined || this.stat308CoId.length == 0 ) {
      this.alertPrompt.presentInputError("Status 308", "Missing search parameter")
      return
    }

    let urlEndpoint = this.apiv2url + 'esearch/status308/' + this.stat308CoId

    await this.ssmloadingSvc.showLoader()
    this.ssmQueryServ.status308Query(urlEndpoint).then(response => {

      this.ssmloadingSvc.hideLoader().then(()=> {

        this.status308ResponseData = JSON.parse(response.data)
        console.log(this.status308ResponseData)
  
        if(this.status308ResponseData.success === false) {
          this.alertPrompt.presentInputError("Status 308", this.status308ResponseData.message)
          return
        }
  
        this.ssmQueryServ.saveQueryResult(JSON.stringify(this.status308ResponseData)).then(() => {
          console.log("query result saved!")
          this.navCtrl.navigateForward('/status308-result')
        })

      })

    }, error => {
      
      this.ssmloadingSvc.hideLoader().then(()=> {
        console.log(JSON.stringify(error))
        console.log(error.status)
        this.alertPrompt.presentServerFail("Status 308", error.status, false)
      })

    })
  }
}
