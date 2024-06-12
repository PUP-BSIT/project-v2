import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../app/model/login';
import { SignupResponse } from '../app/model/signupResponse';
import { ForgotPasswordRequest } from '../app/model/forgotPasswordRequest';
import { ResetPasswordRequest } from '../app/model/resetPasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(user: Login): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/login`, user);
  }

  forgotPassword(email: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, email);
  }

  resetPassword(resetData: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData);
  }
}
