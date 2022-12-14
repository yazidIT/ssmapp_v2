import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EsearchResultPageRoutingModule } from './esearch-result-routing.module';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { EsearchResultPage } from './esearch-result.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    EsearchResultPageRoutingModule,
    TranslateModule
  ],
  declarations: [EsearchResultPage]
})
export class EsearchResultPageModule {}
