import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Questionary2Page } from './questionary2.page';

const routes: Routes = [
  {
    path: '',
    component: Questionary2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Questionary2PageRoutingModule {}
