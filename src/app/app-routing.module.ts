import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VerifyGuard } from './guards/verify.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'repository',
    loadChildren: () =>
      import('./pages/repository/repository.module').then(
        (m) => m.RepositoryPageModule
      ),
  },
  {
    path: 'instructions',
    loadChildren: () =>
      import('./pages/instructions/instructions.module').then(
        (m) => m.InstructionsPageModule
      ),
    canLoad: [VerifyGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canLoad: [VerifyGuard],
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./pages/terms/terms.module').then((m) => m.TermsPageModule),
    canLoad: [VerifyGuard],
  },
  {
    path: 'questionary',
    loadChildren: () =>
      import('./pages/questionary/questionary.module').then(
        (m) => m.QuestionaryPageModule
      ),
    canLoad: [VerifyGuard],
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./pages/results/results.module').then((m) => m.ResultsPageModule),
    canLoad: [VerifyGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
