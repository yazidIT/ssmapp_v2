import { Component, OnInit } from '@angular/core';
import { SsmQueryService } from '../services/ssmquery.service';
import { NavController } from '@ionic/angular';
import { AlertPromptComponent } from '../components/alert-prompt/alert-prompt.component';
import { SsmloadingService } from '../services/ssmloading.service';

@Component({
  selector: 'app-status308',
  templateUrl: './status308.page.html',
  styleUrls: ['./status308.page.scss'],
})
export class Status308Page implements OnInit {

  placeHolder: string
  stat308CoId: string

  alertPrompt : AlertPromptComponent
  
  private apiv2url = 'https://m.ssm.com.my/apiv2/index.php/'

  constructor(private ssmQueryServ: SsmQueryService,
              private ssmloadingSvc: SsmloadingService,
              private navCtrl: NavController) {
    this.alertPrompt = new AlertPromptComponent(this.navCtrl)
  }

  ngOnInit() {
    this.placeHolder = "Company/MyCoID No."
  }

  status308Find() {

    if(this.stat308CoId === undefined || this.stat308CoId.length == 0 ) {
      this.alertPrompt.presentInputError("Status 308", "Missing search parameter")
      return
    }

    let urlEndpoint = this.apiv2url + 'esearch/status308/' + this.stat308CoId

    this.ssmloadingSvc.showLoader()
    this.ssmQueryServ.status308Query(urlEndpoint).then(resData => {

      this.ssmloadingSvc.hideLoader()
      console.log(resData)

      this.ssmQueryServ.saveQueryResult(JSON.stringify(resData)).then(() => {
        console.log("query result saved!")
        this.navCtrl.navigateForward('/status308-result')
      })


    }, error => {

      this.ssmloadingSvc.hideLoader()
      console.log(error.status)
      this.alertPrompt.presentServerFail("Status 308", error.status, false)
    })
  }
}
