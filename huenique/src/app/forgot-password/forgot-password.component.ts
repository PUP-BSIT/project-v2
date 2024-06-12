import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private loginService: LoginService
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
          this.router.navigate(['/sign-in']);
        },
        error => {
          console.error('Password reset failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
