import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitterGuard } from './guards/twitter.guard';

const routes: Routes = [
  {
    path: '**',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    canActivate: [TwitterGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
