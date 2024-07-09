import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private resultsKey = 'testResults';

  constructor() { }

  setResults(results: any): void {
    localStorage.setItem(this.resultsKey, JSON.stringify(results));
  }

  getResults(): any {
    const results = localStorage.getItem(this.resultsKey);
    return results ? JSON.parse(results) : null;
  }

  clearResults(): void {
    localStorage.removeItem(this.resultsKey);
  }
}
