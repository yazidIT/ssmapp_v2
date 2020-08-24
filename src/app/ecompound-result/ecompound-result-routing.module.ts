import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcompoundResultPage } from './ecompound-result.page';

const routes: Routes = [
  {
    path: '',
    component: EcompoundResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcompoundResultPageRoutingModule {}
