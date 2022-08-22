import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from 'src/app/components/results/intro/intro.component';
import { Vista1Component } from 'src/app/components/results/vista1/vista1.component';
import { Vista2Component } from 'src/app/components/results/vista2/vista2.component';

import { ResultsPage } from './results.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsPage,
    children: [
      {
        path: 'intro',
        component: IntroComponent,
      },
      {
        path: 'vista1',
        component: Vista1Component,
      },
      {
        path: 'vista2',
        component: Vista2Component,
      },
      {
        path: '',
        redirectTo: '/results/intro',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsPageRoutingModule {}
