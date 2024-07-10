import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  showErrorToast: boolean = false;
  passwordFieldType: string = 'password';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.sqlInjectionValidator]],
      password: ['', [Validators.required, this.sqlInjectionValidator]]
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

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.loginService.login(loginData).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/homepage']);
        },
        error => {
          this.showErrorToast = true;
          setTimeout(() => {
            this.showErrorToast = false;
          }, 3000);
          console.error('Login failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
