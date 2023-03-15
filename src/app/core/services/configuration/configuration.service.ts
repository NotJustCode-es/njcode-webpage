import { Injectable } from '@angular/core';
import { FrontConfigurationParams } from '@server/models/front-configuration-params';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject, filter, Observable, tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configurationSubject = new BehaviorSubject<FrontConfigurationParams | null>(null);

  readonly config$ = this.configurationSubject.asObservable().pipe(
    filter(configurationSubject => !!configurationSubject),
  );

  get getData(): FrontConfigurationParams {
    return this.configurationSubject.getValue()!;
  }

  data: FrontConfigurationParams = {
    production: false,
    default_lang: '',
    available_lang: [],
    asset_url: '',
    google_analytics_id: '',
    google_recaptcha_site_key: '',
  };

  constructor(private http: HttpClient) {}

  load(): Observable<FrontConfigurationParams> {
    return this.http.get<FrontConfigurationParams>('/api/configurations/')
      .pipe(
        tap(configuration => this.configurationSubject.next(configuration)),
      );
  }
}
