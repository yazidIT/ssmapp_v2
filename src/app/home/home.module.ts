import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home.page';
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
        component: HomePage
      }
    ]),
    TranslateModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
