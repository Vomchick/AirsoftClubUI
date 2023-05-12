import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./pages/login/login.module').then((x) => x.LoginModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    loadChildren: () =>
      import('./pages/register/register.module').then((x) => x.RegisterModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    loadChildren: () =>
      import('./pages/account/account.module').then((x) => x.AccountModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
