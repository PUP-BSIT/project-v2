import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import { Question } from '../../model/question';
import { QuizResult } from '../../model/result';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-color-test',
  templateUrl: './color-test.component.html',
  styleUrls: ['./color-test.component.css']
})
export class ColorTestComponent implements OnInit {
  questions: Question[] = [];
  selectedAnswers: number[] = [];
  result: string | null = null;
  userId: number | null = null;
  currentStep: number = 1;

  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data;
      this.selectedAnswers = new Array(this.questions.length).fill(null);
    });
    this.userId = this.authService.getUserId();
  }

  onSubmit(): void {
    const firstUnansweredIndex = this.selectedAnswers.findIndex(answer => answer === null);
    if (firstUnansweredIndex !== -1) {
      document.getElementById(`question-${firstUnansweredIndex}`)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const seasonScores: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0 };

    this.selectedAnswers.forEach(seasonId => {
      if (seasonId !== null) {
        seasonScores[seasonId]++;
      }
    });

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
      this.router.navigate(['/homepage/seasonal-tone']);
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

  trackByQuestionId(index: number, question: Question): number {
    return question.question_id;
  }

  trackByOptionId(index: number, option: any): number {
    return option.option_id;
  }
}
