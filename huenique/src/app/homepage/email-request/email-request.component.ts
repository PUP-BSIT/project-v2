import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../service/email.service';
import { ResultsService } from '../../../service/result.service';
import { AuthService } from '../../../service/auth.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-email-request',
  templateUrl: './email-request.component.html',
  styleUrls: ['./email-request.component.css']
})
export class EmailRequestComponent implements OnInit {
  email: string = '';
  results: any;
  userId: number | null = null;
  currentStep: number = 3;

  constructor(
    private emailService: EmailService,
    private resultsService: ResultsService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.results = this.resultsService.getResults();
    this.userId = this.authService.getUserId();
  }

  sendEmail() {
    if (this.email && this.results && this.userId) {
      this.emailService.sendEmail(this.email, this.results, this.userId).subscribe(
        response => {
          this.notificationService.showNotification('Email sent successfully!', 'success');
        },
        error => {
          console.error('Error sending email:', error);
          this.notificationService.showNotification('Failed to send email.', 'error');
        }
      );
    } else {
      this.notificationService.showNotification('Please enter a valid email address and complete the test.', 'info');
    }
  }
}