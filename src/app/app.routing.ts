import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  // {
  //   path: 'main',
  //   canActivate: [RouteGuard],
  //   component: MainComponent
  // },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',

  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
