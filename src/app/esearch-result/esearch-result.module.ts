import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsearchResultPageRoutingModule } from './esearch-result-routing.module';

import { EsearchResultPage } from './esearch-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsearchResultPageRoutingModule
  ],
  declarations: [EsearchResultPage]
})
export class EsearchResultPageModule {}
