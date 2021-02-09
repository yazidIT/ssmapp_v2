import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustErrorPageRoutingModule } from './biztrust-error-routing.module';

import { BiztrustErrorPage } from './biztrust-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiztrustErrorPageRoutingModule
  ],
  declarations: [BiztrustErrorPage]
})
export class BiztrustErrorPageModule {}
