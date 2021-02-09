import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiztrustPage } from './biztrust.page';

const routes: Routes = [
  {
    path: '',
    component: BiztrustPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiztrustPageRoutingModule {}
