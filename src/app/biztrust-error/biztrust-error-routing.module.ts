import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiztrustErrorPage } from './biztrust-error.page';

const routes: Routes = [
  {
    path: '',
    component: BiztrustErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiztrustErrorPageRoutingModule {}
