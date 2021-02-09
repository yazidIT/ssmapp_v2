import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustScanPageRoutingModule } from './biztrust-scan-routing.module';

import { BiztrustScanPage } from './biztrust-scan.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    BiztrustScanPageRoutingModule,
    TranslateModule
  ],
  declarations: [BiztrustScanPage]
})
export class BiztrustScanPageModule {}
