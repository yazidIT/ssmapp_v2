import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsearchPageRoutingModule } from './esearch-routing.module';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { EsearchPage } from './esearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    EsearchPageRoutingModule
  ],
  declarations: [EsearchPage]
})
export class EsearchPageModule {}
