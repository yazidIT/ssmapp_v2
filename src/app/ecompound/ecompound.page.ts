import { Component, OnInit } from '@angular/core';
import { SsmQueryService } from '../services/ssmquery.service';
import { NavController } from '@ionic/angular';
import { AlertPromptComponent } from '../alert-prompt/alert-prompt.component';

@Component({
  selector: 'app-ecompound',
  templateUrl: './ecompound.page.html',
  styleUrls: ['./ecompound.page.scss'],
})
export class EcompoundPage implements OnInit {

  alertPrompt : AlertPromptComponent
  placeHolder: string
  compoundType: string
  entityType: string
  compoundEntity: string

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
              private navCtrl: NavController) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.compoundType = "ROC"
    this.entityType = "01"
    this.placeHolder = this.entityNameValue[this.entityType]
  }

  entityTypeSelect() {
    this.placeHolder = this.entityNameValue[this.entityType]
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

    this.ssmQueryServ.eCompoundQuery(urlEndpoint, postBody).then(resData => {

      console.log(resData)

      this.ssmQueryServ.saveQueryResult(JSON.stringify(resData.data)).then(() => {
        console.log("query result saved!")
        this.navCtrl.navigateForward('/ecompound-result')
      })

    }, error => {
      console.log(error.status)
      this.alertPrompt.presentServerFail("e-Search", error.status, false)
    })
  }
}
