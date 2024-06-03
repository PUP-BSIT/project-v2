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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  get nameControl() {
    return this.signupForm.get('name');
  }

  get usernameControl(){
    return this.signupForm.get('username');
  }

  get emailControl(){
    return this.signupForm.get('email');
  }

  get passwordControl(){
    return this.signupForm.get('password');
  }

  get confirmPasswordControl(){
    return this.signupForm.get('confirmPassword');
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, this.noNumericCharactersValidator]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  noNumericCharactersValidator(control: AbstractControl): ValidationErrors | null {
    const isValid = /^[^\d]*$/.test(control.value);
    return isValid ? null : { noNumericCharacters: true };
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe(
        response => {
          console.log('User created successfully', response);
        },
        error => {
          console.log('Error creating user', error);
        }
      );
    }
  }
}
