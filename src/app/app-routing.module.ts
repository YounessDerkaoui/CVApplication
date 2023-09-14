import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InternesComponent } from './internes/internes.component';
import { ExternesComponent } from './externes/externes.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'internes', component: InternesComponent },
    { path: 'externes', component: ExternesComponent },
    { path: 'settings', component: SettingsComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
