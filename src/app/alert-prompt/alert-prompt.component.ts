import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert-prompt',
  templateUrl: './alert-prompt.component.html',
  styleUrls: ['./alert-prompt.component.scss'],
})
export class AlertPromptComponent implements OnInit {

  constructor(public alertController: AlertController) {}

  ngOnInit(): void {
  }

  async presentServerFail(title:string, errNo: Number) {
    var msg = null
    if(errNo === 401) {
      msg = "Unathorised access"
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
