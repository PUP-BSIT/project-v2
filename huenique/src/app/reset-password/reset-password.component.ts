import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;
  newPasswordFieldType: string = 'password';
  confirmNewPasswordFieldType: string = 'password';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService
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
      newPassword: ['', [Validators.required, this.sqlInjectionValidator]],
      confirmNewPassword: ['', [Validators.required, this.sqlInjectionValidator]]
    }, {
      validators: this.mustMatch('newPassword', 'confirmNewPassword')
    });
  }

  sqlInjectionValidator(control: AbstractControl): ValidationErrors | null {
    const forbiddenCharacters = /['";=<>]/;
    const sqlKeywords = /\b(SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|--|OR|AND|WHERE|LIKE|IN|NOT|NULL|IS|VALUES)\b/i;

    if (forbiddenCharacters.test(control.value) || sqlKeywords.test(control.value)) {
      return { sqlInjection: true };
    }
    return null;
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

  toggleNewPasswordVisibility(): void {
    this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmNewPasswordVisibility(): void {
    this.confirmNewPasswordFieldType = this.confirmNewPasswordFieldType === 'password' ? 'text' : 'password';
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
          this.notificationService.showNotification('Password Successfully Changed', 'success');
          this.router.navigate(['/sign-in']);
        },
        error => {
          console.error('Password reset failed', error);
          this.notificationService.showNotification('Password reset failed', 'error');
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
