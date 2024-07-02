import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  testResult: any;
  testHistory: any[] = [];

  constructor(
    private authService: AuthService,
    private questionService: QuestionService
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
      },
      error => {
        console.error('Error fetching test history:', error);
      }
    );
  }
}