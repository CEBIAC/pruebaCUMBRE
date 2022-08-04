import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstResutsPage } from './inst-resuts.page';

const routes: Routes = [
  {
    path: '',
    component: InstResutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstResutsPageRoutingModule {}
