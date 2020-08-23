import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EsearchPageRoutingModule } from './esearch-routing.module';

import { EsearchPage } from './esearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsearchPageRoutingModule
  ],
  declarations: [EsearchPage]
})
export class EsearchPageModule {}
