import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../app/model/question';
import { QuizResult } from '../app/model/result';
import { SaveResultResponse } from '../app/model/resultResponese';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:3000/api/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  saveResult(result: QuizResult): Observable<SaveResultResponse> {
    return this.http.post<SaveResultResponse>(`${this.apiUrl}/results`, result);
  }
}
