import { Component, OnInit } from '@angular/core';
import { SsmQueryService } from '../services/ssmquery.service';
import { NavController } from '@ionic/angular';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

@Component({
  selector: 'app-equery',
  templateUrl: './equery.page.html',
  styleUrls: ['./equery.page.scss'],
})
export class EqueryPage implements OnInit {

  placeHolder: string
  queryCoId: string

  alertPrompt : AlertPromptComponent
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
              private ssmloadingSvc: SsmloadingService,
              private navCtrl: NavController) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
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
    let postData = { "documentNo": this.queryCoId }

    this.ssmloadingSvc.showLoader()
    this.ssmQueryServ.eQueryQuery(urlEndpoint, JSON.stringify(postData)).then(resData => {

      this.ssmloadingSvc.hideLoader()
      console.log(resData)

      this.ssmQueryServ.saveQueryResult(JSON.stringify(resData.result)).then(() => {
        console.log("query result saved!")
        this.navCtrl.navigateForward('/esearch-result')
      })

    }, error => {
      this.ssmloadingSvc.hideLoader()
      console.log(error)
      console.log(error.status)
      this.alertPrompt.presentServerFail("e-Search", error.status, false)
    })
  }
}
