import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactusPage } from './contactus.page';

const routes: Routes = [
  {
    path: '',
    component: ContactusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactusPageRoutingModule {}
