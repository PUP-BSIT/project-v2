import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../service/question.service';
import { ResultsService } from '../../../service/result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasonal-tone',
  templateUrl: './seasonal-tone.component.html',
  styleUrls: ['./seasonal-tone.component.css']
})
export class SeasonalToneComponent implements OnInit {
  result: any;
  recommendations?: string;
  currentStep: number = 2;

  constructor(
    private questionService: QuestionService,
    private resultsService: ResultsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionService.getTestResult().subscribe(
      data => {
        this.result = data;
      },
      error => {
        console.error('Error fetching test result:', error);
      }
    );
  }

  learnMore(): void {
    const seasonId = this.result.season_id;
    this.questionService.getRecommendations(seasonId).subscribe(
      data => {
        this.recommendations = data.recommendations;
      },
      error => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }

  goToEmailRequest() {
    this.resultsService.setResults(this.result);
    this.router.navigate(['/homepage/email-request']); 
  }
}
