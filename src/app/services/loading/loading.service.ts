import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  static readonly interceptRequestHeader = 'X-Intercept-Request';

  private loading$ = new BehaviorSubject(false);

  static interceptRequest(intercept: boolean): {
    headers: { [LoadingService.interceptRequestHeader]: string; }
  } {
    return {
      headers: { [LoadingService.interceptRequestHeader]: intercept.valueOf().toString() },
    };
  }

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }

  isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
