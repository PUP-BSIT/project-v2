import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://api.huenique.online:3000/api';

  constructor(private http: HttpClient) { }

  sendEmail(email: string, results: any, userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { email, results, userId };
    return this.http.post(`${this.apiUrl}/send-email-result`, body, { headers });
  }
}