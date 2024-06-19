import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../service/question.service';

@Component({
  selector: 'app-seasonal-tone',
  templateUrl: './seasonal-tone.component.html',
  styleUrls: ['./seasonal-tone.component.css']
})
export class SeasonalToneComponent implements OnInit {
  result: any;
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
}
