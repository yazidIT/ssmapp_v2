import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustResultPageRoutingModule } from './biztrust-result-routing.module';

import { BiztrustResultPage } from './biztrust-result.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    BiztrustResultPageRoutingModule,
    TranslateModule
  ],
  declarations: [BiztrustResultPage]
})
export class BiztrustResultPageModule {}
