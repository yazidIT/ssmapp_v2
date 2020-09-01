import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { SsmQueryService } from '../services/ssmquery.service';
import { NavController, Platform } from '@ionic/angular';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

@Component({
  selector: 'app-ecompound',
  templateUrl: './ecompound.page.html',
  styleUrls: ['./ecompound.page.scss'],
})
export class EcompoundPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  alertPrompt : AlertPromptComponent
  placeHolder: string
  compoundType: string
  entityType: string
  compoundEntity: string
  eCompoundResponseData: any

  entityNameValue = {
    "01": "Company Registration No.",
    "02": "Business Registration No.",
    "03": "New IC No.",
    "04": "Passport No.",
    "06": "Company Reference No.",
    "07": "Old IC No.",
    "08": "Co. Secretary License No.",
    "10": "Police ID",
    "17": "Army ID",
    "11": "Audit Firm",
    "12": "Auditor",
    "15": "Others"
  }
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
              private ssmloadingSvc: SsmloadingService,
              private navCtrl: NavController,
              private platform: Platform,
              private location: Location) {
                
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.compoundType = "ROC"
    this.entityType = "01"
    this.placeHolder = this.entityNameValue[this.entityType]
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.location.back()
    });
  }

  entityTypeSelect() {
    this.placeHolder = this.entityNameValue[this.entityType]
  }

  compoundTypeSelect() {

  }

  ecompoundFind() {

    if(this.compoundEntity === undefined || this.compoundEntity.length == 0 ) {
      this.alertPrompt.presentInputError("e-Compound", "Missing search parameter")
      return
    }

    let urlEndpoint = this.apiv2url + 'esearch/ecompound/'
    let postBody = {
      "type": this.compoundType,
      "entityType": this.entityType,
      "entityNo": this.compoundEntity
    }

    this.ssmloadingSvc.showLoader()
    this.ssmQueryServ.eCompoundQuery(urlEndpoint, postBody).then(response => {

      this.ssmloadingSvc.hideLoader()
      this.eCompoundResponseData = JSON.parse(response.data)

      if(this.eCompoundResponseData.success === false) {
        this.alertPrompt.presentInputError("e-Compound", this.eCompoundResponseData.message)
        return
      }

      this.ssmQueryServ.saveQueryResult(JSON.stringify(this.eCompoundResponseData.data)).then(() => {
        console.log("query result saved!")
        this.navCtrl.navigateForward('/ecompound-result')
      })

    }, error => {
      this.ssmloadingSvc.hideLoader()
      console.log(error.status)
      this.alertPrompt.presentServerFail("e-Compound", error.status, false)
    })
  }
}
