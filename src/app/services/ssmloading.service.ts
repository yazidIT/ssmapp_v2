import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SsmloadingService {

  constructor(private loadingController: LoadingController, private translate: TranslateService) { }

  async showHideAutoLoader() {

    const loading = await this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed! after 2 Seconds', { role, data });
  }

  // Show the loader for infinite time
  async showLoader() {

    let searchingText: string = this.translate.instant('SEARCHING');
    const res = await this.loadingController.create({
      spinner: 'circles',
      message: searchingText
    });
    res.present();

  }

  async showLoaderText(infotext) {

    let searchingText: string = this.translate.instant(infotext);
    const res = await this.loadingController.create({
      spinner: 'circles',
      message: searchingText
    });
    res.present();

  }
  
  // Hide the loader if already created otherwise return error
  async hideLoader() {

    try {
      const res = await this.loadingController.dismiss();
      console.log('Loading dismissed!', res);
    }
    catch (error) {
      console.log('error', error);
    }

  }
}
