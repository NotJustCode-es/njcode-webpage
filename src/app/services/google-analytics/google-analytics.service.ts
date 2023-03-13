import { Injectable } from '@angular/core';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { ScriptsService } from '@services/scripts/scripts.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(
    private scriptService: ScriptsService,
    private configurationService: ConfigurationService,
  ) {}

  get googleAnalyticsId(): string | undefined {
    return this.configurationService.data.google_analytics_id;
  }

  static factory(googleAnalyticsService: GoogleAnalyticsService): () => Promise<void> {
    return () => Promise.resolve(googleAnalyticsService.init());
  }

  init(): void {
    if (this.googleAnalyticsId) {
      this.addUniversalAnalyticsScript();
    }
  }

  addUniversalAnalyticsScript(): void {
    this.scriptService.createScript(`https://www.googletagmanager.com/gtag/js?id=${this.googleAnalyticsId}`);
    this.scriptService.createScriptWithBody(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.googleAnalyticsId}');
    `);
  }
}
