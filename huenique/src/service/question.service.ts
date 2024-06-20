import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../app/model/question';
import { QuizResult } from '../app/model/result';
import { SaveResultResponse } from '../app/model/resultResponese';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Question[]>(`${this.apiUrl}/questions`, { headers });
  }

  saveResult(result: QuizResult): Observable<SaveResultResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<SaveResultResponse>(`${this.apiUrl}/results`, result, { headers });
  }

  getTestResult(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/results`, { headers });
  }

  getRecommendations(seasonId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/recommendations/${seasonId}`, { headers });
  }
}
