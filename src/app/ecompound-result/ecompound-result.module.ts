import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcompoundResultPageRoutingModule } from './ecompound-result-routing.module';
import { EcompoundResultPage } from './ecompound-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcompoundResultPageRoutingModule
  ],
  declarations: [EcompoundResultPage]
})
export class EcompoundResultPageModule {}
