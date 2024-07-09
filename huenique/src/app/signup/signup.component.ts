import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showSuccessToast: boolean = false;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  get usernameControl() {
    return this.signupForm.get('username');
  }

  get emailControl() {
    return this.signupForm.get('email');
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), this.sqlInjectionValidator]],
      email: ['', [Validators.required, Validators.email, this.sqlInjectionValidator]],
      password: ['', [Validators.required, Validators.minLength(6), this.sqlInjectionValidator]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  sqlInjectionValidator(control: AbstractControl): ValidationErrors | null {
    const forbiddenCharacters = /['";=<>]/;
    const sqlKeywords = /\b(SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|--|OR|AND|WHERE|LIKE|IN|NOT|NULL|IS|VALUES)\b/i;
    
    if (forbiddenCharacters.test(control.value) || sqlKeywords.test(control.value)) {
      return { sqlInjection: true };
    }
    return null;
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe(
        response => {
          console.log('User created successfully', response);
          this.signupForm.reset();
          this.showSuccessToast = true;
          setTimeout(() => {
            this.showSuccessToast = false;
          }, 5000);
        },
        error => {
          console.log('Error creating user', error);
        }
      );
    }
  }
}
