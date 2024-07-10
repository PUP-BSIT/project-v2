import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { QuestionService } from '../../service/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  testResult: any;
  testHistory: any[] = [];
  paginatedTestHistory: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(
    private authService: AuthService,
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadTestResult();
    this.loadTestHistory();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadTestResult(): void {
    this.questionService.getTestResult().subscribe(
      data => {
        this.testResult = data;
      },
      error => {
        console.error('Error fetching test result:', error);
      }
    );
  }

  loadTestHistory(): void {
    this.questionService.getTestHistory().subscribe(
      data => {
        this.testHistory = data.map(history => ({
          ...history,
          result_date: new Date(history.result_date).toISOString().split('T')[0]
        }));
        this.totalPages = Math.ceil(this.testHistory.length / this.itemsPerPage);
        this.updatePaginatedTestHistory();
      },
      error => {
        console.error('Error fetching test history:', error);
      }
    );
  }

  updatePaginatedTestHistory(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTestHistory = this.testHistory.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTestHistory();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTestHistory();
    }
  }

  navigateToDetail(subcategoryId: number): void {
    this.router.navigate(['/homepage/colors', subcategoryId]);
  }
}