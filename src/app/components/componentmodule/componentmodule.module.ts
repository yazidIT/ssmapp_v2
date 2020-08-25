import { NgModule } from '@angular/core';
import { SsmfooterComponent } from '../ssmfooter/ssmfooter.component';
import { SsmfabComponent } from '../ssmfab/ssmfab.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [SsmfooterComponent, SsmfabComponent],
  exports: [SsmfooterComponent, SsmfabComponent]
})
export class ComponentmoduleModule { }
