import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DetailnewsPage } from './detailnews.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailnewsPage
      }
    ]),
    TranslateModule
  ],
  declarations: [DetailnewsPage]
})
export class DetailnewsPageModule {}
