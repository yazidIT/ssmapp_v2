import { NgModule } from '@angular/core';
import { SsmfooterComponent } from '../ssmfooter/ssmfooter.component';
import { SsmfabComponent } from '../ssmfab/ssmfab.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [SsmfooterComponent, SsmfabComponent],
  exports: [SsmfooterComponent, SsmfabComponent]
})
export class ComponentmoduleModule { }
