import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'http://huenique.online/api';

  constructor(private http: HttpClient) {}

  getColorDetails(subcategoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-with-subcategory/${subcategoryId}`);
  }
}