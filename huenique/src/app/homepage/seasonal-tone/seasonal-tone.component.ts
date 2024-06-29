import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../service/question.service';

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

  constructor(private questionService: QuestionService) {}

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
        this.recommendations = data;
        console.log('Recommendations:', this.recommendations);
      },
      error => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }
}
