import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { TeamComponent } from './pages/team/team.component';
import { PersonalTeamComponent } from './pages/personal-team/personal-team.component';
import { ClubsComponent } from './pages/clubs/clubs.component';
import { ClubInfoComponent } from './pages/club-info/club-info.component';
import { AccountGuard } from './guards/account.guard';

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
  {
    path: 'teams',
    component: TeamComponent,
    loadChildren: () =>
      import('./pages/team/team.module').then((x) => x.TeamModule),
    canActivate: [AuthGuard, AccountGuard],
  },
  {
    path: 'teamInfo/:id',
    component: PersonalTeamComponent,
    loadChildren: () =>
      import('./pages/team/team.module').then((x) => x.TeamModule),
    canActivate: [AuthGuard, AccountGuard],
    //loadChildren: () =>import('./pages/personal-team/personal-team.module').then((x) => x.PersonalTeamModule),
  },
  {
    path: 'clubs',
    component: ClubsComponent,
    loadChildren: () =>
      import('./pages/clubs/clubs.module').then((x) => x.ClubsModule),
    canActivate: [AuthGuard, AccountGuard],
  },
  {
    path: 'clubInfo/:id',
    component: ClubInfoComponent,
    loadChildren: () =>
      import('./pages/clubs/clubs.module').then((x) => x.ClubsModule),
    canActivate: [AuthGuard, AccountGuard],
    //loadChildren: () =>import('./pages/personal-team/personal-team.module').then((x) => x.PersonalTeamModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
