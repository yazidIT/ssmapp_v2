import { Component, OnInit } from '@angular/core';
import { SsmQueryService } from '../services/ssmquery.service';
import { NavController } from '@ionic/angular';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-status308',
  templateUrl: './status308.page.html',
  styleUrls: ['./status308.page.scss'],
})
export class Status308Page implements OnInit {

  placeHolder: string
  stat308CoId: string
  status308ResponseData: any
  appversion: any

  alertPrompt : AlertPromptComponent
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
              private navCtrl: NavController,
              private utilsServ: UtilsService) {

    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.placeHolder = "Company/MyCoID No."

    this.utilsServ.getAppVersion().then(version => {
      this.appversion = version
    })
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
