import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EsearchPageRoutingModule } from './esearch-routing.module';
import { EsearchPage } from './esearch.page';

import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    EsearchPageRoutingModule,
    TranslateModule
  ],
  declarations: [EsearchPage]
})
export class EsearchPageModule {}
