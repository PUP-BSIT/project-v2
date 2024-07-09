import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl = 'https://huenique.online/api';

  constructor(private http: HttpClient) { }

  getClinics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clinics`);
  }
}
