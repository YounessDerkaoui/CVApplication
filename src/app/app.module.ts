import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InternesComponent } from './internes/internes.component';
import { ExternesComponent } from './externes/externes.component';
import { SettingsComponent } from './settings/settings.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from "@angular/material/grid-list";
import { EditorComponent } from './internes/first-resume-template/editor/editor.component';
import { BasicInfoComponent } from './internes/first-resume-template/editor/basic-info/basic-info.component';
import { EducationInfoComponent } from './internes/first-resume-template/editor/education-info/education-info.component';
import { ExperienceInfoComponent } from './internes/first-resume-template/editor/experience-info/experience-info.component';
import { ItemBannerComponent } from './internes/first-resume-template/editor/item-banner/item-banner.component';
import { FormBannerComponent } from './internes/first-resume-template/editor/form-banner/form-banner.component';
import { PreviewComponent } from './internes/first-resume-template/preview/preview.component';
import { BasicInfoViewComponent } from './internes/first-resume-template/preview/basic-info-view/basic-info-view.component';
import { EducationInfoViewComponent } from './internes/first-resume-template/preview/education-info-view/education-info-view.component';
import { ExperienceInfoViewComponent } from './internes/first-resume-template/preview/experience-info-view/experience-info-view.component';
import { SkillsInfoViewComponent } from './internes/first-resume-template/preview/skills-info-view/skills-info-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FirstResumeTemplateComponent } from './internes/first-resume-template/first-resume-template.component';
import { ResumeTemplatesComponent } from './internes/resume-templates/resume-templates.component';
import { SkillInfoComponent } from './internes/first-resume-template/editor/skill-info/skill-info.component';
import { LanguageInfoComponent } from './internes/first-resume-template/editor/language-info/language-info.component';
import { CapitalizeAllWordsPipe } from './pipes/capitalize-all-words.pipe';
import {MatSelectModule} from "@angular/material/select";
import { EmptyStringToDashPipe } from './pipes/empty-string-to-dash.pipe';
import { LanguageInfoViewComponent } from './internes/first-resume-template/preview/language-info-view/language-info-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
import { PasswordResetComponent } from './authentication/password-reset/password-reset.component';
import {LoginComponent} from "./authentication/login/login.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    HomeComponent,
    InternesComponent,
    ExternesComponent,
    SettingsComponent,
    EditorComponent,
    BasicInfoComponent,
    EducationInfoComponent,
    ExperienceInfoComponent,
    ItemBannerComponent,
    FormBannerComponent,
    PreviewComponent,
    BasicInfoViewComponent,
    EducationInfoViewComponent,
    ExperienceInfoViewComponent,
    SkillsInfoViewComponent,
    FirstResumeTemplateComponent,
    ResumeTemplatesComponent,
    SkillInfoComponent,
    LanguageInfoComponent,
    CapitalizeAllWordsPipe,
    EmptyStringToDashPipe,
    LanguageInfoViewComponent,
    NavBarComponent,
    SideNavComponent,
    LoginComponent,
    EmailConfirmationComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    MatSortModule,
    NgxDropzoneModule,
    MatDividerModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
