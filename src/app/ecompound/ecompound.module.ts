import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcompoundPageRoutingModule } from './ecompound-routing.module';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';
import { EcompoundPage } from './ecompound.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    EcompoundPageRoutingModule,
    TranslateModule
  ],
  declarations: [EcompoundPage]
})
export class EcompoundPageModule {}
