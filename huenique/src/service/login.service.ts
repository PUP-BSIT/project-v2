import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../app/model/login';
import { SignupResponse } from '../app/model/signupResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(user: Login): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/login`, user);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(resetData: { token: string, newPassword: string, confirmNewPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData);
  }
}
