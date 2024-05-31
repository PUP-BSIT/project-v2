import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  loginForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  get emailControl(){
    return this.loginForm.get('email');
  }

  get passwordControl(){
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid){
      console.log(this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe(
        response => {
          console.log('user logged in successfully', response);
        },
        error => {
          console.log('error logging in', error);
        }
      )
    }
  }
}
