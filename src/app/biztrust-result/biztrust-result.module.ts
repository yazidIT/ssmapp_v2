import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustResultPageRoutingModule } from './biztrust-result-routing.module';

import { BiztrustResultPage } from './biztrust-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiztrustResultPageRoutingModule
  ],
  declarations: [BiztrustResultPage]
})
export class BiztrustResultPageModule {}
