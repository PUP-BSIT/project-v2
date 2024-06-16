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
    const seasonScores: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0 }; // Scores for Winter, Summer, Autumn, Spring

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

    // Save the result to the database
    const resultData = {
      user_id: 1, // Assuming a user ID of 1 for now
      season_id: Number(seasonId),
      hair_id: 1, // Assuming mock hair_id
      makeup_id: 1, // Assuming mock makeup_id
      accessories_id: 1, // Assuming mock accessories_id
      result_date: new Date().toISOString().split('T')[0] // Current date
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
