import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  get newPasswordControl() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmNewPasswordControl() {
    return this.resetPasswordForm.get('confirmNewPassword');
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
    }, {
      validators: this.mustMatch('newPassword', 'confirmNewPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const resetData = {
        token: this.token,
        newPassword: this.resetPasswordForm.value.newPassword,
        confirmNewPassword: this.resetPasswordForm.value.confirmNewPassword
      };
      this.loginService.resetPassword(resetData).subscribe(
        response => {
          console.log('Password reset successful', response);
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
