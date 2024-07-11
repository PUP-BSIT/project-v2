import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeComponent } from './homepage/home/home.component';
import { ColorTestComponent } from './homepage/color-test/color-test.component';
import { AboutComponent } from './homepage/about/about.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { NotificationComponent } from './notification/notification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SeasonalToneComponent } from './homepage/seasonal-tone/seasonal-tone.component';
import { EmailRequestComponent } from './homepage/email-request/email-request.component';
import { ProfileComponent } from './profile/profile.component';
import { ColorsComponent } from './homepage/colors/colors.component';
import { ColorDetailComponent } from './homepage/color-detail/color-detail.component';
import { ClinicComponent } from './homepage/clinic/clinic.component';
import { QuestionService } from '../service/question.service';
import { EmailService } from '../service/email.service';
import { ClinicService } from '../service/clinic.service';
import { LoaderService } from '../service/loader.service';
import { LoaderInterceptor } from '../service/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    SigninComponent,
    PageNotFoundComponent,
    HomepageComponent,
    HomeComponent,
    ColorTestComponent,
    AboutComponent,
    NavbarComponent,
    EmailConfirmationComponent,
    NotificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SeasonalToneComponent,
    EmailRequestComponent,
    ProfileComponent,
    ColorsComponent,
    ColorDetailComponent,
    ClinicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    QuestionService,
    EmailService,
    ClinicService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
