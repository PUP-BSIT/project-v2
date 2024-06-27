import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  sendEmail(email: string, results: any): Observable<any> {
    const body = { email, results };
    return this.http.post(`${this.apiUrl}/send-email`, body);
  }
}
