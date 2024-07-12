import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../app/model/user';
import { SignupResponse } from '../app/model/signupResponse';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/api/auth/signup';

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.apiUrl, user);
  }  
}