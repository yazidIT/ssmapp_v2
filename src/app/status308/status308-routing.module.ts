import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Status308Page } from './status308.page';

const routes: Routes = [
  {
    path: '',
    component: Status308Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Status308PageRoutingModule {}
