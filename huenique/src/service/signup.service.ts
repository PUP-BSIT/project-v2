import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/api/signup';

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
