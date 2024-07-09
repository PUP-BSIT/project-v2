import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';
import { LoginService } from '../../service/login.service';
import { ForgotPasswordRequest } from '../model/forgotPasswordRequest';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) {}

  get emailControl() {
    return this.forgotPasswordForm.get('email');
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const request: ForgotPasswordRequest = { email: this.forgotPasswordForm.value.email };
      this.loginService.forgotPassword(request).subscribe(
        response => {
          console.log('Password reset email sent', response);
          this.notificationService.showNotification('Password Reset has been sent! Check your Email to proceed.');
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 3000);
        },
        error => {
          console.error('Password reset failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}