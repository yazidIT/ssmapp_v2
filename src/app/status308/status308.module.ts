import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Status308PageRoutingModule } from './status308-routing.module';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';

import { Status308Page } from './status308.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentmoduleModule,
    Status308PageRoutingModule,
    TranslateModule
  ],
  declarations: [Status308Page]
})
export class Status308PageModule {}
