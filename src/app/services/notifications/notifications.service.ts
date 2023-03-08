import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private successSubject = new Subject<string>();

  successMessage$ = this.successSubject.asObservable();

  private errorSubject = new Subject<string>();

  errorMessage$ = this.errorSubject.asObservable();

  setSuccessMessage(message: string):void {
    this.successSubject.next(message);
  }

  setErrorMessage(message: string):void {
    this.errorSubject.next(message);
  }

  clearSuccessMessage():void {
    this.setSuccessMessage('');
  }

  clearErrorMessage():void {
    this.setErrorMessage('');
  }
}
