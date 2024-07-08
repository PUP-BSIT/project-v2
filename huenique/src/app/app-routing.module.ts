import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ColorTestComponent } from './homepage/color-test/color-test.component';
import { SeasonalToneComponent } from './homepage/seasonal-tone/seasonal-tone.component';
import { AboutComponent } from './homepage/about/about.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { EmailRequestComponent } from './homepage/email-request/email-request.component';
import { ColorsComponent } from './homepage/colors/colors.component';
import { AuthGuard } from '../service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'confirm-email', component: EmailConfirmationComponent },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'homepage/color-analysis', component: ColorTestComponent, canActivate: [AuthGuard] },
  { path: 'homepage/seasonal-tone', component: SeasonalToneComponent, canActivate: [AuthGuard] },
  { path: 'homepage/email-request', component: EmailRequestComponent },
  { path: 'homepage/about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'homepage/colors', component: ColorsComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
