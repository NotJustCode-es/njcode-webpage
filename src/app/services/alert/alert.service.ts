import { Injectable } from '@angular/core';
import { AlertsEnum } from '@core/models/alerts.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private message = new Subject<string>();

  message$ = this.message.asObservable();

  private alert = new Subject<AlertsEnum>();

  alert$ = this.alert.asObservable();

  setMessage(message: string): void {
    this.message.next(message);
  }

  clearMessage(): void {
    this.setMessage('');
  }

  setType(type: AlertsEnum): void {
    this.alert.next(type);
  }
}
