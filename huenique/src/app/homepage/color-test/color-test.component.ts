import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../service/question.service';
import { Question } from '../../model/question';

@Component({
  selector: 'app-color-test',
  templateUrl: './color-test.component.html',
  styleUrl: './color-test.component.css'
})
export class ColorTestComponent implements OnInit {

  questions: Question[] = [];
  selectedAnswers: number[] = [];
  result: string | null = null;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data;
      this.selectedAnswers = new Array(this.questions.length).fill(null);
    });
  }

  onSubmit(): void {
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
