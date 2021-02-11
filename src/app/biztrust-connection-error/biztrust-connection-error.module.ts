import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiztrustConnectionErrorPageRoutingModule } from './biztrust-connection-error-routing.module';

import { BiztrustConnectionErrorPage } from './biztrust-connection-error.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    BiztrustConnectionErrorPageRoutingModule,
    TranslateModule
  ],
  declarations: [BiztrustConnectionErrorPage]
})
export class BiztrustConnectionErrorPageModule {}
