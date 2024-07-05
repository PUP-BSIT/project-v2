import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://api.huenique.online:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/landing']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      return parsedPayload.userId;
    }
    return null;
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
}