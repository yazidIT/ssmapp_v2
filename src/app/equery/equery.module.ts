import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EqueryPageRoutingModule } from './equery-routing.module';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { EqueryPage } from './equery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    EqueryPageRoutingModule
  ],
  declarations: [EqueryPage]
})
export class EqueryPageModule {}
