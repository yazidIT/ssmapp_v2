import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiztrustResultPage } from './biztrust-result.page';

const routes: Routes = [
  {
    path: '',
    component: BiztrustResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiztrustResultPageRoutingModule {}
