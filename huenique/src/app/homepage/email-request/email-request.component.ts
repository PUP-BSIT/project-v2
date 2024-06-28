import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../service/email.service';
import { ResultsService } from '../../../service/result.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-email-request',
  templateUrl: './email-request.component.html',
  styleUrls: ['./email-request.component.css']
})
export class EmailRequestComponent implements OnInit {
  email: string = '';
  results: any;
  userId: number | null = null;

  constructor(
    private emailService: EmailService,
    private resultsService: ResultsService,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.results = this.resultsService.getResults();
    this.userId = this.authService.getUserId();
  }

  sendEmail() {
    if (this.email && this.results && this.userId) {
      this.emailService.sendEmail(this.email, this.results, this.userId).subscribe(
        response => {
          alert('Email sent successfully!');
        },
        error => {
          console.error('Error sending email:', error);
          alert('Failed to send email.');
        }
      );
    } else {
      alert('Please enter a valid email address and complete the test.');
    }
  }
}
