import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustPageRoutingModule } from './biztrust-routing.module';

import { BiztrustPage } from './biztrust.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    BiztrustPageRoutingModule,
    TranslateModule
  ],
  declarations: [BiztrustPage]
})
export class BiztrustPageModule {}
