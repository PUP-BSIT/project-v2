import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SignupService } from '../../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']  // Note the change here from styleUrl to styleUrls
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) {}

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

  noNumericCharactersValidator(control: AbstractControl): { [key: string]: any } | null {
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
