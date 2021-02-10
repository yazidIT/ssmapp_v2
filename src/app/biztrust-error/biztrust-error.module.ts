import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustErrorPageRoutingModule } from './biztrust-error-routing.module';

import { BiztrustErrorPage } from './biztrust-error.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    BiztrustErrorPageRoutingModule,
    TranslateModule
  ],
  declarations: [BiztrustErrorPage]
})
export class BiztrustErrorPageModule {}
