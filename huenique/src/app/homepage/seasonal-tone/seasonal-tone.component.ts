import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import { ResultsService } from '../../../service/result.service';
import { SeasonalDescriptionsService } from '../../../service/seasonal-descriptions-service.service';

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
  seasonDescription: string = '';

  constructor(
    private questionService: QuestionService,
    private resultsService: ResultsService,
    private route: ActivatedRoute,
    private router: Router,
    private seasonalDescriptionsService: SeasonalDescriptionsService
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
        this.setSeasonDescription();
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
        this.setSeasonDescription();
      },
      error => {
        console.error('Error fetching test result:', error);
      }
    );
  }

  setSeasonDescription(): void {
    if (this.result && this.result.season_name) {
      this.seasonDescription = this.seasonalDescriptionsService.getDescription(this.result.season_name);
      if (this.result.subcategory_id) {
        this.result.subcategory_name = this.getSubcategoryName(this.result.subcategory_id);
      }
    }
  }

  getSubcategoryName(subcategoryId: number): string {
    switch (subcategoryId) {
      case 6: return 'Clear Winter';
      case 7: return 'Cool Winter';
      case 5: return 'Deep Winter';
      case 10: return 'Light Summer';
      case 9: return 'Cool Summer';
      case 8: return 'Soft Summer';
      case 15: return 'Soft Autumn';
      case 16: return 'Warm Autumn';
      case 14: return 'Deep Autumn';
      case 13: return 'Clear Spring';
      case 12: return 'Warm Spring';
      case 11: return 'Light Spring';
      default: return 'Unknown';
    }
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
