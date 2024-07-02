import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<{ message: string; type: NotificationType } | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string, type: NotificationType = 'info') {
    this.notificationSubject.next({ message, type });
    setTimeout(() => this.clearNotification(), 5000);
  }

  clearNotification() {
    this.notificationSubject.next(null);
  }
}