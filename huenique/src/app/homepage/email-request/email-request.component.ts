import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../service/email.service';
import { ResultsService } from '../../../service/result.service';

@Component({
  selector: 'app-email-request',
  templateUrl: './email-request.component.html',
  styleUrls: ['./email-request.component.css']
})
export class EmailRequestComponent implements OnInit {
  email: string = '';
  results: any;

  constructor(
    private emailService: EmailService,
    private resultsService: ResultsService
  ) {}

  ngOnInit() {
    this.results = this.resultsService.getResults();
  }

  sendEmail() {
    if (this.email && this.results) {
      this.emailService.sendEmail(this.email, this.results).subscribe(
        response => {
          alert('Email sent successfully!');
        },
        error => {
          alert('Failed to send email.');
        }
      );
    } else {
      alert('Please enter a valid email address and complete the test.');
    }
  }
}
