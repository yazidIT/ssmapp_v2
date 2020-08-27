import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ContactusPageRoutingModule } from './contactus-routing.module';
import { ContactusPage } from './contactus.page';
import { ComponentmoduleModule } from '../components/componentmodule/componentmodule.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactusPageRoutingModule,
    TranslateModule,
    ComponentmoduleModule
  ],
  declarations: [ContactusPage]
})
export class ContactusPageModule {}
