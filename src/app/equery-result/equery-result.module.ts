import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EqueryResultPageRoutingModule } from './equery-result-routing.module';
import { EqueryResultPage } from './equery-result.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    EqueryResultPageRoutingModule,
    TranslateModule
  ],
  declarations: [EqueryResultPage]
})
export class EqueryResultPageModule {}
