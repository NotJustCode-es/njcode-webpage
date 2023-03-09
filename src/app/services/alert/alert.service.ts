import { Injectable } from '@angular/core';
import { AlertObject } from '@core/models/alertObject';
import { AlertsEnum } from '@core/models/alerts.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert = new Subject<AlertObject>();

  alert$ = this.alert.asObservable();

  setMessage(message: string, type: AlertsEnum = AlertsEnum.Success): void {
    this.alert.next({ message, type });
  }

  clearMessage(): void {
    this.setMessage('');
  }
}
