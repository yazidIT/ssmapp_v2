import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DetailnewsPage } from './detailnews.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';

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
    ])
  ],
  declarations: [DetailnewsPage]
})
export class DetailnewsPageModule {}
