import { Injectable } from '@angular/core';
import { Alert } from '@core/models/alert';
import { AlertTypesEnum } from '@core/models/alert-types.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert = new Subject<Alert>();

  alert$ = this.alert.asObservable();

  setMessage(message: string, type: AlertTypesEnum = AlertTypesEnum.Success): void {
    this.alert.next({ message, type });
  }

  clearMessage(): void {
    this.setMessage('');
  }
}
