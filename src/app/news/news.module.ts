import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NewsPage } from "./news.page"
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
        component: NewsPage
      }
    ]),
    TranslateModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
