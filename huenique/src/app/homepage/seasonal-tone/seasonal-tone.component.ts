import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import { ResultsService } from '../../../service/result.service';

@Component({
  selector: 'app-seasonal-tone',
  templateUrl: './seasonal-tone.component.html',
  styleUrls: ['./seasonal-tone.component.css']
})
export class SeasonalToneComponent implements OnInit {
  result: any;
  recommendations: any;
  recommendationCategories = ['accessories', 'avoid', 'combinations', 'lens', 'hair', 'makeup'];
  currentStep: number = 2;

  constructor(
    private questionService: QuestionService,
    private resultsService: ResultsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const resultId = params['resultId'];
      if (resultId) {
        this.getResultById(resultId);
      } else {
        this.getLatestResult();
      }
    });
  }

  getResultById(resultId: number): void {
    this.questionService.getResultById(resultId).subscribe(
      data => {
        this.result = data;
      },
      error => {
        console.error('Error fetching test result:', error);
      }
    );
  }

  getLatestResult(): void {
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
        this.recommendations = data;
        console.log('Recommendations:', this.recommendations);
      },
      error => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }

  getTextColor(hex: string): string {
    const rgb = this.hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  hexToRgb(hex: string): { r: number, g: number, b: number } {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  goToEmailRequest() {
    this.resultsService.setResults(this.result);
    this.router.navigate(['/homepage/email-request']); 
  }
}
