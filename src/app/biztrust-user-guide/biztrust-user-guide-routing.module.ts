import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiztrustUserGuidePage } from './biztrust-user-guide.page';

const routes: Routes = [
  {
    path: '',
    component: BiztrustUserGuidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiztrustUserGuidePageRoutingModule {}
