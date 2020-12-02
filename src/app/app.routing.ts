import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  // {
  //   path: 'info',
  //   component: InformationsComponent
  // },
  // {
  //   path: 'categories',
  //   component: CategoriesComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
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
