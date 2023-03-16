import { Injectable } from '@angular/core';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { ScriptsService } from '@services/scripts/scripts.service';
import {
  filter, firstValueFrom, map, Observable, take,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(
    private scriptService: ScriptsService,
    private configurationService: ConfigurationService,
  ) {}

  static factory(googleAnalyticsService: GoogleAnalyticsService): () => Promise<void> {
    return () => firstValueFrom(googleAnalyticsService.init());
  }

  init(): Observable<void> {
    return this.configurationService.configurationData$
      .pipe(
        take(1),
        filter(configuration => !!configuration.googleAnalyticsId),
        map(configuration => this.addUniversalAnalyticsScript(configuration.googleAnalyticsId)),
      );
  }

  addUniversalAnalyticsScript(googleAnalyticsId: string): void {
    this.scriptService.createScript(`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`);
    this.scriptService.createScriptWithBody(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalyticsId}');
    `);
  }
}
