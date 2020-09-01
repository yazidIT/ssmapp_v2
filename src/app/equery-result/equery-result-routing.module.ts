import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EqueryResultPage } from './equery-result.page';

const routes: Routes = [
  {
    path: '',
    component: EqueryResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EqueryResultPageRoutingModule {}
