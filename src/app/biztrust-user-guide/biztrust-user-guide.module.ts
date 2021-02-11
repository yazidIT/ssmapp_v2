import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustUserGuidePageRoutingModule } from './biztrust-user-guide-routing.module';

import { BiztrustUserGuidePage } from './biztrust-user-guide.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    BiztrustUserGuidePageRoutingModule
  ],
  declarations: [BiztrustUserGuidePage]
})
export class BiztrustUserGuidePageModule {}
