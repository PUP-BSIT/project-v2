import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../app/model/login';
import { SignupResponse } from '../app/model/signupResponse';
import { ForgotPasswordRequest } from '../app/model/forgotPasswordRequest';
import { ResetPasswordRequest } from '../app/model/resetPasswordRequest';
import { ForgotPasswordResponse } from '../app/model/forgotPasswordResponse';
import { ResetPasswordResponse } from '../app/model/resetPasswordResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(user: Login): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/login`, user);
  }

  forgotPassword(email: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.apiUrl}/forgot-password`, email);
  }

  resetPassword(resetData: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${this.apiUrl}/reset-password`, resetData);
  }
}
