import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() message: string = '';
  isVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  show(message: string): void {
    this.message = message;
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 5000);
  }
}
