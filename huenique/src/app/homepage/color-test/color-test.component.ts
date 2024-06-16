import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../service/question.service';
import { Question } from '../../model/question';

@Component({
  selector: 'app-color-test',
  templateUrl: './color-test.component.html',
  styleUrl: './color-test.component.css'
})
export class ColorTestComponent {
  
  questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data;
    });
  }
}
