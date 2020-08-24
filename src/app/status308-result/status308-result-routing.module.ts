import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Status308ResultPage } from './status308-result.page';

const routes: Routes = [
  {
    path: '',
    component: Status308ResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Status308ResultPageRoutingModule {}
