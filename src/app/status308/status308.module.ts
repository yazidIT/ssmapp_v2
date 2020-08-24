import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Status308PageRoutingModule } from './status308-routing.module';

import { Status308Page } from './status308.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Status308PageRoutingModule
  ],
  declarations: [Status308Page]
})
export class Status308PageModule {}
