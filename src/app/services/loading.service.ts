import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);

  setLoading(value: boolean): void {
    this.loading.next(value);
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
