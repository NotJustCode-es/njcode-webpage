import { Injectable } from '@angular/core';
import { AlertObject } from '@core/models/alertObject';
import { AlertTypesEnum } from '@core/models/AlertTypes.Enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert = new Subject<AlertObject>();

  alert$ = this.alert.asObservable();

  setMessage(message: string, type: AlertTypesEnum = AlertTypesEnum.Success): void {
    this.alert.next({ message, type });
  }

  clearMessage(): void {
    this.setMessage('');
  }
}
