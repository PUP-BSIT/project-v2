import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { QuestionService } from '../service/question.service';
import { EmailRequestComponent } from './homepage/email-request/email-request.component';

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
    EmailRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
