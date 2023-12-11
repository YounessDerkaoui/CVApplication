import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InternesComponent } from './internes/internes.component';
import { ExternesComponent } from './externes/externes.component';
import { SettingsComponent } from './settings/settings.component';
import {FirstResumeTemplateComponent} from "./internes/first-resume-template/first-resume-template.component";
import {authGuard} from "./services/guards/auth.guard";
import {LoginComponent} from "./authentication/login/login.component";
import {EmailConfirmationComponent} from "./authentication/email-confirmation/email-confirmation.component";
import {PasswordResetComponent} from "./authentication/password-reset/password-reset.component";
import {passwordResetGuard} from "./services/guards/password-reset.guard";


const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [authGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'internes', children: [
          {path: '', component: InternesComponent, pathMatch: 'full'},
          {
            path: 'template', children: [
              {path: '', component: FirstResumeTemplateComponent, pathMatch: 'full'}
            ]
          },
        ]
      },
      {path: 'externes', component: ExternesComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'email-confirmation', component: EmailConfirmationComponent},
  {path: 'password-reset', component: PasswordResetComponent, canActivate: [passwordResetGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
