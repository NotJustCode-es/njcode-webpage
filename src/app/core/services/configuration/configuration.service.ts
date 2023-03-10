import { Injectable } from '@angular/core';
import { FrontConfigurationParams } from '@server/models/front-configuration-params';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  data: FrontConfigurationParams = {
    production: false,
    default_lang: '',
    available_lang: [],
    asset_url: '',
    google_analytics_id: '',
    google_recaptcha_site_key: '',
  };

  constructor(private http: HttpClient) {}

  load(): Promise<FrontConfigurationParams> {
    return new Promise<FrontConfigurationParams>(resolve => {
      this.http.get<FrontConfigurationParams>('/api/configurations/').subscribe(
        response => {
          // eslint-disable-next-line no-console
          console.log('using server-side configuration');
          this.data = { ...response || {} };
          resolve(this.data);
        },
      );
    });
  }
}
