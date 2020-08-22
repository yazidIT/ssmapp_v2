import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsearchResultPage } from './esearch-result.page';

const routes: Routes = [
  {
    path: '',
    component: EsearchResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsearchResultPageRoutingModule {}
