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
  currentQuestionIndex: number = 0;
  allQuestionsAnswered: boolean = false;

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

  onAnswerChange(index: number): void {
    if (index === this.currentQuestionIndex) {
      this.moveToNextUnansweredQuestion();
    }
  }

  moveToNextUnansweredQuestion(): void {
    const nextUnansweredIndex = this.selectedAnswers.findIndex(answer => answer === null);
    if (nextUnansweredIndex !== -1) {
      this.currentQuestionIndex = nextUnansweredIndex;
    } else {
      this.allQuestionsAnswered = true;
    }
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
  
    seasonPercentages.sort((a, b) => b.percentage - a.percentage);
    const primarySeasonId = seasonPercentages[0].seasonId;
  
    const subcategory = this.determineSubcategory(seasonPercentages, primarySeasonId);
  
    this.result = this.getSeasonName(primarySeasonId, subcategory);
    console.log('Quiz result:', this.result);
  
    const resultData: QuizResult = {
      user_id: this.userId!,
      season_id: primarySeasonId,
      hair_id: primarySeasonId,
      makeup_id: primarySeasonId,
      accessories_id: primarySeasonId,
      color_combination_id: primarySeasonId,
      contact_lens_id: primarySeasonId,
      avoid_color_id: primarySeasonId,
      result_date: new Date().toISOString().split('T')[0],
      subcategory_id: subcategory ? subcategory.seasonId : null
    };
    
    this.questionService.saveResult(resultData).subscribe(response => {
      console.log('Result saved:', response);
      this.router.navigate(['/homepage/seasonal-tone', { resultId: response.resultId }]);
    });
  }
  
  determineSubcategory(seasonPercentages: { seasonId: number, percentage: number }[], primarySeasonId: number): { seasonId: number, percentage: number } | null {
    const primaryPercentage = seasonPercentages.find(sp => sp.seasonId === primarySeasonId)?.percentage || 0;
    const otherSeasonPercentages = seasonPercentages.filter(sp => sp.seasonId !== primarySeasonId);

    const subcategoryMap: { [key: number]: number[] } = {
        1: [5, 6, 7],  // Example: Winter subcategories
        2: [8, 9, 10], // Example: Summer subcategories
        3: [14, 15, 16], // Example: Autumn subcategories
        4: [11, 12, 13]  // Example: Spring subcategories
    };

    const potentialSubcategories = subcategoryMap[primarySeasonId];

    if (!potentialSubcategories) {
        return null;
    }

    let closestSubcategories: { seasonId: number, percentage: number, difference: number }[] = [];
    let smallestDifference = Number.MAX_VALUE;

    for (const subcategoryId of potentialSubcategories) {
        const subcategoryPercentage = this.getSubcategoryPercentage(subcategoryId, otherSeasonPercentages);
        const difference = Math.abs(primaryPercentage - subcategoryPercentage);

        if (difference < smallestDifference) {
            closestSubcategories = [{ seasonId: subcategoryId, percentage: subcategoryPercentage, difference }];
            smallestDifference = difference;
        } else if (difference === smallestDifference) {
            closestSubcategories.push({ seasonId: subcategoryId, percentage: subcategoryPercentage, difference });
        }
    }

    if (closestSubcategories.length > 1) {
        closestSubcategories.sort((a, b) => b.percentage - a.percentage);
    }

    return closestSubcategories[0];
}

getSubcategoryPercentage(subcategoryId: number, otherSeasonPercentages: { seasonId: number, percentage: number }[]): number {
    switch (subcategoryId) {
        case 5:  
        case 6:  
            return otherSeasonPercentages.find(sp => sp.seasonId === 2)?.percentage || 0;
        case 7:  
            return otherSeasonPercentages.find(sp => sp.seasonId === 1)?.percentage || 0;
        case 8:  
        case 9:  
            return otherSeasonPercentages.find(sp => sp.seasonId === 2)?.percentage || 0;
        case 10: 
            return otherSeasonPercentages.find(sp => sp.seasonId === 3)?.percentage || 0;
        case 14: 
        case 15: 
            return otherSeasonPercentages.find(sp => sp.seasonId === 3)?.percentage || 0;
        case 16: 
            return otherSeasonPercentages.find(sp => sp.seasonId === 2)?.percentage || 0;
        case 11: 
        case 12: 
            return otherSeasonPercentages.find(sp => sp.seasonId === 4)?.percentage || 0;
        case 13: 
            return otherSeasonPercentages.find(sp => sp.seasonId === 1)?.percentage || 0;
        default:
            return 0;
    }
}


  getSeasonName(seasonId: number, subcategory: { seasonId: number, percentage: number } | null): string {
    switch (seasonId) {
      case 1: return subcategory ? this.getSubcategoryName(subcategory.seasonId) : 'Winter';
      case 2: return subcategory ? this.getSubcategoryName(subcategory.seasonId) : 'Summer';
      case 3: return subcategory ? this.getSubcategoryName(subcategory.seasonId) : 'Autumn';
      case 4: return subcategory ? this.getSubcategoryName(subcategory.seasonId) : 'Spring';
      default: return 'Unknown';
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

  trackByQuestionId(index: number, question: Question): number {
    return question.question_id;
  }

  trackByOptionId(index: number, option: any): number {
    return option.option_id;
  }
}
