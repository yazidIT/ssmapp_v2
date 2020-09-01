import { Component, OnInit } from '@angular/core';
import { SsmQueryService } from '../services/ssmquery.service';
import { NavController } from '@ionic/angular';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

@Component({
  selector: 'app-esearch',
  templateUrl: './esearch.page.html',
  styleUrls: ['./esearch.page.scss'],
})
export class EsearchPage implements OnInit {

  placeHolder: string
  searchType: string
  searchCompany: string

  searchNameValue = {
    "ROC": "Company Registration No. Old",
    "ROB": "Business Registration No. Old",
    "ROCNEW": "Company Registration No. New",
    "ROBNEW": "Business Registration No. New",
    "LLP": "LLP Registration No.",
  }

  alertPrompt : AlertPromptComponent
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
              private loadingSvc: SsmloadingService,
              private navCtrl: NavController) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.searchType = "ROC"
    this.placeHolder = this.searchNameValue[this.searchType]
  }

  searchTypeSelect() {
    this.placeHolder = this.searchNameValue[this.searchType]
  }

  esearchFind() {

    if(this.searchCompany === undefined || this.searchCompany.length == 0 ) {
      this.alertPrompt.presentInputError("e-Search", "Missing search parameter")
      return
    }

    let findUrl = 'findLlp/'
    if(this.searchType === "ROC" || this.searchType === "ROCNEW") {
      findUrl = 'findRoc/';
    } else if (this.searchType === "ROB" || this.searchType === "ROBNEW"){
      findUrl = 'findRob/';
    } else {
      findUrl = 'findLlp/';
    }

    let urlEndpoint = this.apiv2url + 'esearch/' + findUrl + this.searchCompany

    this.loadingSvc.showLoader();
    this.ssmQueryServ.eSearchQuery(urlEndpoint).then(resData => {

      this.loadingSvc.hideLoader()
      console.log(resData)

      if(resData.result === undefined) {
        this.ssmQueryServ.saveQueryResult(JSON.stringify(resData)).then(() => {
          console.log("query result saved!")
          this.navCtrl.navigateForward('/esearch-result')
        })
      } else {
        this.ssmQueryServ.saveQueryResult(JSON.stringify(resData.result)).then(() => {
          console.log("query result saved!")
          this.navCtrl.navigateForward('/esearch-result')
        })
      }

    }, error => {

      this.loadingSvc.hideLoader()
      console.log(error.status)
      this.alertPrompt.presentServerFail("e-Search", error.status, false)
    })
  }
}
