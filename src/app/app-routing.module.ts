import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InternesComponent } from './internes/internes.component';
import { ExternesComponent } from './externes/externes.component';
import { SettingsComponent } from './settings/settings.component';
import {ResumeTemplatesComponent} from "./internes/resume-templates/resume-templates.component";
import {FirstResumeTemplateComponent} from "./internes/first-resume-template/first-resume-template.component";

const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  { path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'internes', children: [
          { path: '', component: InternesComponent, pathMatch: 'full' },
          { path: 'template', children:[
              { path: '', component: FirstResumeTemplateComponent, pathMatch: 'full'}
            ] },
        ]},
      { path: 'externes', component: ExternesComponent },
      { path: 'settings', component: SettingsComponent }
    ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
