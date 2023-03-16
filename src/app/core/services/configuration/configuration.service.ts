import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import {
  firstValueFrom, Observable, ReplaySubject, tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configuration!: ClientConfiguration;

  private configurationSubject = new ReplaySubject<ClientConfiguration>(1);

  get configurationData(): ClientConfiguration {
    return this.configuration;
  }

  get configurationData$(): Observable<ClientConfiguration> {
    return this.configurationSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  static factory(
    configurationService: ConfigurationService,
  ): () => Promise<ClientConfiguration> {
    return () => firstValueFrom(configurationService.load());
  }

  load(): Observable<ClientConfiguration> {
    return this.http.get<ClientConfiguration>('/api/configurations/')
      .pipe(
        tap(configuration => {
          this.configuration = Object.freeze({ ...configuration });
          this.configurationSubject.next(configuration);
        }),
      );
  }
}
