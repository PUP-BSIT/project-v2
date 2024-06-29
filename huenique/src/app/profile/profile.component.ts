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

  constructor(
    private authService: AuthService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadTestResult();
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
}
