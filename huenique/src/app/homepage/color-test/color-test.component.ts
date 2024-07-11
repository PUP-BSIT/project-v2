import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import { QuizResult } from '../../model/result';
import { AuthService } from '../../../service/auth.service';
import { Question } from '../../model/question';

@Component({
  selector: 'app-color-test',
  templateUrl: './color-test.component.html',
  styleUrls: ['./color-test.component.css']
})
export class ColorTestComponent implements OnInit, AfterViewChecked {
  questions: Question[] = [];
  selectedAnswers: number[] = [];
  result: string | null = null;
  userId: number | null = null;
  currentStep: number = 1;
  currentQuestionIndex: number = 0;
  allQuestionsAnswered: boolean = false;

  @ViewChild('submitButton') submitButton!: ElementRef;

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

  ngAfterViewChecked(): void {
    if (this.allQuestionsAnswered && this.submitButton) {
      this.scrollToSubmitButton();
    }
  }

  onAnswerChange(index: number): void {
    if (index === this.currentQuestionIndex) {
      this.moveToNextUnansweredQuestion();
    }
    this.scrollToNextUnansweredQuestion();
  }

  moveToNextUnansweredQuestion(): void {
    const nextUnansweredIndex = this.selectedAnswers.findIndex(answer => answer === null);
    if (nextUnansweredIndex !== -1) {
      this.currentQuestionIndex = nextUnansweredIndex;
    } else {
      this.allQuestionsAnswered = true;
    }
  }

  scrollToNextUnansweredQuestion(): void {
    const nextUnansweredIndex = this.selectedAnswers.findIndex(answer => answer === null);
    if (nextUnansweredIndex !== -1) {
      const element = document.getElementById(`question-${nextUnansweredIndex}`);
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2.8);
        window.scrollTo({ top: middle, behavior: 'smooth' });
      }
    }
  }

  scrollToSubmitButton(): void {
    const elementRect = this.submitButton.nativeElement.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 2.8);
    window.scrollTo({ top: middle, behavior: 'smooth' });
  }

  onSubmit(): void {
    const firstUnansweredIndex = this.selectedAnswers.findIndex(answer => answer === null);
    if (firstUnansweredIndex !== -1) {
      document.getElementById(`question-${firstUnansweredIndex}`)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const seasonScores: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const totalQuestions = this.selectedAnswers.length;

    this.selectedAnswers.forEach(seasonId => {
      if (seasonId !== null) {
        seasonScores[seasonId]++;
      }
    });

    const seasonPercentages = Object.keys(seasonScores).map(seasonId => ({
      seasonId: Number(seasonId),
      percentage: (seasonScores[Number(seasonId)] / totalQuestions) * 100
    }));

    console.log('Season Percentages:', seasonPercentages);

    seasonPercentages.sort((a, b) => b.percentage - a.percentage);
    const primarySeasonId = seasonPercentages[0].seasonId;

    const subcategoryId = this.determineSubcategory(seasonPercentages, primarySeasonId);

    this.result = this.getSeasonName(primarySeasonId, subcategoryId);
    console.log('Quiz result:', this.result);

    const resultData: QuizResult = {
      user_id: this.userId!,
      season_id: primarySeasonId,
      hair_id: primarySeasonId,
      makeup_id: primarySeasonId,
      accessories_id: primarySeasonId,
      contact_lens_id: primarySeasonId,
      avoid_color_id: primarySeasonId,
      result_date: new Date().toISOString().split('T')[0],
      subcategory_id: subcategoryId
    };

    // Store result data and percentages in local storage
    localStorage.setItem('testResults', JSON.stringify(resultData));
    localStorage.setItem('seasonPercentages', JSON.stringify(seasonPercentages));

    this.questionService.saveResult(resultData).subscribe(response => {
      console.log('Result saved:', response);
      this.router.navigate(['/homepage/seasonal-tone', { resultId: response.resultId }]);
    });
  }

  getPrimarySeason(seasonPercentages: { seasonId: number, percentage: number }[]): number {
    seasonPercentages.sort((a, b) => b.percentage - a.percentage);
    return seasonPercentages[0].seasonId;
  }

  determineSubcategory(seasonPercentages: { seasonId: number, percentage: number }[], primarySeasonId: number): number | null {
    let maxInfluence = -1;
    let selectedSubcategoryId = null;

    seasonPercentages.forEach(season => {
      if (season.seasonId !== primarySeasonId && season.percentage > 0) {
        if (season.percentage > maxInfluence) {
          maxInfluence = season.percentage;
          selectedSubcategoryId = this.getSubcategoryId(primarySeasonId, season.seasonId);
        }
      }
    });

    if (selectedSubcategoryId === null) {
      selectedSubcategoryId = this.getSubcategoryId(primarySeasonId, null);
    }

    return selectedSubcategoryId;
  }

  getSubcategoryId(primarySeasonId: number, secondarySeasonId: number | null): number {
    const subcategoryMatrix: { [key: number]: { [key: number]: number } } = {
      1: { 2: 6, 3: 7, 4: 5 },
      2: { 1: 9, 3: 8, 4: 10 },
      3: { 1: 16, 2: 14, 4: 15 },
      4: { 1: 11, 2: 13, 3: 12 }
    };

    const defaultSubcategories: { [key: number]: number } = {
      1: 7,
      2: 10,
      3: 16,
      4: 11
    };

    if (secondarySeasonId === null) {
      return defaultSubcategories[primarySeasonId];
    }

    return subcategoryMatrix[primarySeasonId][secondarySeasonId] || defaultSubcategories[primarySeasonId];
  }

  getSeasonName(seasonId: number, subcategoryId: number | null): string {
    if (subcategoryId) {
      return this.getSubcategoryName(subcategoryId);
    }
    switch (seasonId) {
      case 1: return 'Winter';
      case 2: return 'Summer';
      case 3: return 'Autumn';
      case 4: return 'Spring';
      default: return 'Unknown';
    }
  }

  getSubcategoryName(subcategoryId: number): string {
    switch (subcategoryId) {
      case 5: return 'Clear Winter';
      case 6: return 'Cool Winter';
      case 7: return 'Deep Winter';
      case 8: return 'Soft Summer';
      case 9: return 'Cool Summer';
      case 10: return 'Light Summer';
      case 11: return 'Clear Spring';
      case 12: return 'Warm Spring';
      case 13: return 'Light Spring';
      case 14: return 'Soft Autumn';
      case 15: return 'Warm Autumn';
      case 16: return 'Deep Autumn';
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
