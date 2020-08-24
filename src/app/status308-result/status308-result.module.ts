import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Status308ResultPageRoutingModule } from './status308-result-routing.module';

import { Status308ResultPage } from './status308-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Status308ResultPageRoutingModule
  ],
  declarations: [Status308ResultPage]
})
export class Status308ResultPageModule {}
