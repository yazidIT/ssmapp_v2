import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiztrustConnectionErrorPage } from './biztrust-connection-error.page';

const routes: Routes = [
  {
    path: '',
    component: BiztrustConnectionErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiztrustConnectionErrorPageRoutingModule {}
