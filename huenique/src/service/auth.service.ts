import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://huenique.online/api';

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      tap(() => {
        localStorage.removeItem('testResults');
        localStorage.removeItem('seasonPercentages');
        localStorage.removeItem('subcategoryPercentages');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('testResults');
    localStorage.removeItem('seasonPercentages');
    localStorage.removeItem('subcategoryPercentages');
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
