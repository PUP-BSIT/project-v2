import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../service/question.service';
import { Question } from '../../model/question';
import { QuizResult } from '../../model/result';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-color-test',
  templateUrl: './color-test.component.html',
  styleUrl: './color-test.component.css'
})
export class ColorTestComponent implements OnInit {
  questions: Question[] = [];
  selectedAnswers: number[] = [];
  result: string | null = null;
  userId: number | null = null;

  constructor(
    private questionService: QuestionService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data;
      this.selectedAnswers = new Array(this.questions.length).fill(null);
    });
    this.userId = this.authService.getUserId();
  }

  onSubmit(): void {
    const seasonScores: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0 };

    this.selectedAnswers.forEach(seasonId => {
      if (seasonId !== null) {
        seasonScores[seasonId]++;
      }
    });

    // Determine the season with the highest score
    const maxScore = Math.max(...Object.values(seasonScores));
    const seasonId = Object.keys(seasonScores).find(key => seasonScores[Number(key)] === maxScore);

    this.result = this.getSeasonName(Number(seasonId));
    console.log('Quiz result:', this.result);

    const resultData: QuizResult = {
      user_id: this.userId!,
      season_id: Number(seasonId),
      hair_id: Number(seasonId),
      makeup_id: Number(seasonId),
      accessories_id: Number(seasonId),
      color_combination_id: Number(seasonId),
      contact_lens_id: Number(seasonId),
      avoid_color_id: Number(seasonId),
      result_date: new Date().toISOString().split('T')[0]
    };

    this.questionService.saveResult(resultData).subscribe(response => {
      console.log('Result saved:', response);
    });
  }

  getSeasonName(seasonId: number): string {
    switch (seasonId) {
      case 1: return 'Winter';
      case 2: return 'Summer';
      case 3: return 'Autumn';
      case 4: return 'Spring';
      default: return 'Unknown';
    }
  }
}
