import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading$ = new BehaviorSubject(false);

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }

  isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
