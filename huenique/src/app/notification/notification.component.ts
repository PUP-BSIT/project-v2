import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification$ = this.notificationService.notification$;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}
}