import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EqueryPage } from './equery.page';

const routes: Routes = [
  {
    path: '',
    component: EqueryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EqueryPageRoutingModule {}
