import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiztrustScanPage } from './biztrust-scan.page';

const routes: Routes = [
  {
    path: '',
    component: BiztrustScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiztrustScanPageRoutingModule {}
