import { Injectable } from '@angular/core';
import { ClientConfiguration } from '@server/models/client-configuration';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject, filter, Observable, tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configurationSubject = new BehaviorSubject<ClientConfiguration | null>(null);

  readonly config$ = this.configurationSubject.asObservable().pipe(
    filter(configurationSubject => !!configurationSubject),
  );

  get data(): ClientConfiguration {
    return this.configurationSubject.getValue()!;
  }

  constructor(private http: HttpClient) {}

  load(): Observable<ClientConfiguration> {
    return this.http.get<ClientConfiguration>('/api/configurations/')
      .pipe(
        tap(clientConfiguration => this.configurationSubject.next(clientConfiguration)),
      );
  }
}
