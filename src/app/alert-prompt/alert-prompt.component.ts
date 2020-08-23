import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-alert-prompt',
  templateUrl: './alert-prompt.component.html',
  styleUrls: ['./alert-prompt.component.scss'],
})
export class AlertPromptComponent implements OnInit {

  private alertController : AlertController

  constructor(private navCtrl: NavController) {
    this.alertController = new AlertController()
  }

  ngOnInit(): void {
  }

  async presentServerFail(title:string, errNo: Number, goBack: boolean) {
    
    var msg = ""
    if(errNo === 401) {
      msg = "Unauthorised access"
    } else if(errNo === 500) {
      msg = "Internal Server Error"
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: "Server error",
      message: msg,
      buttons: [{
        text: 'OK',
        cssClass: 'title-class',
        handler: () => {
          if(goBack)
            this.navCtrl.back()
        }
      }]
    });

    await alert.present();
  }

  async presentInputError(title:string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: "Input Error",
      message: message,
      buttons: [{
        text: 'OK',
        cssClass: 'title-class',
        handler: () => {}
      }]
    });

    await alert.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }

  async presentAlertConfirmExitApp() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "SSMApp",
      message: "Exit SSMApp?",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
      ]
    });

    await alert.present();
  }
}
