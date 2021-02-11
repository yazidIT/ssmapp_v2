import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, Platform } from '@ionic/angular';

import { SsmQueryService } from '../services/ssmquery.service';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

@Component({
  selector: 'app-esearch',
  templateUrl: './esearch.page.html',
  styleUrls: ['./esearch.page.scss'],
})
export class EsearchPage implements OnInit, OnDestroy, AfterViewInit {

  backButtonSubscription; 

  placeHolder: string
  searchType: string
  searchCompany: string
  eSearchResponseData: any
  
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
              private navCtrl: NavController,
              private platform: Platform,
              private location: Location) {

    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
    this.eSearchResponseData = {
      success: false,
      data: ""
    }
    
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('home')
    });
  }

  ngOnInit() {
    this.searchType = "ROC"
    this.placeHolder = this.searchNameValue[this.searchType]
  }

  searchTypeSelect() {
    this.placeHolder = this.searchNameValue[this.searchType]
  }

  async esearchFind() {

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

    await this.loadingSvc.showLoader();
    this.ssmQueryServ.eSearchQuery(urlEndpoint).then(response => {

      this.loadingSvc.hideLoader().then(()=> {

        this.eSearchResponseData = JSON.parse(response.data)
        if(this.eSearchResponseData.success === false) {
          this.alertPrompt.presentInputError("e-Search", this.eSearchResponseData.message)
          return
        }
  
        // for LLP
        if(this.eSearchResponseData.result === undefined) {
  
          this.ssmQueryServ.saveQueryResult(JSON.stringify(this.eSearchResponseData)).then(() => {
            console.log("query result saved!")
            this.navCtrl.navigateForward('/esearch-result')
          })
  
        // For ROC & ROB
        } else {
  
          this.ssmQueryServ.saveQueryResult(JSON.stringify(this.eSearchResponseData.result)).then(() => {
            console.log("query result saved!")
            this.navCtrl.navigateForward('/esearch-result')
          })
  
        }

      })

    }, error => {

      this.loadingSvc.hideLoader().then(()=> {
        console.log(error.status)
        this.alertPrompt.presentServerFail("e-Search", error.status, false)
      })
      
    })
  }
}
