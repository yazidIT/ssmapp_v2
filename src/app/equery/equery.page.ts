import { Component, OnInit } from '@angular/core';
import { SsmQueryService } from '../services/ssmquery.service';
import { NavController } from '@ionic/angular';
import { AlertPromptComponent } from '../alert-prompt/alert-prompt.component';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-equery',
  templateUrl: './equery.page.html',
  styleUrls: ['./equery.page.scss'],
})
export class EqueryPage implements OnInit {

  placeHolder: string
  queryCoId: string
  eQueryRespondData: any
  alertPrompt : AlertPromptComponent
  appversion: any
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
              private navCtrl: NavController,
              private utilsServ: UtilsService) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.placeHolder = "Company No./MyCoID"

    this.utilsServ.getAppVersion().then(version => {
      this.appversion = version
    })

  }

  equeryFind() {

    if(this.queryCoId === undefined || this.queryCoId.length == 0 ) {
      this.alertPrompt.presentInputError("e-Query", "Missing search parameter")
      return
    }

    let urlEndpoint = this.apiv2url + 'equery'

    this.ssmQueryServ.eSearchQuery(urlEndpoint).then(response => {

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
