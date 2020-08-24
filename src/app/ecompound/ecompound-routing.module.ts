import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcompoundPage } from './ecompound.page';

const routes: Routes = [
  {
    path: '',
    component: EcompoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcompoundPageRoutingModule {}
