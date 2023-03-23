import { APP_INITIALIZER, PLATFORM_ID } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { GoogleAnalyticsService } from '@core/services/google-analytics/google-analytics.service';
import { I18nService } from '@core/services/i18n/i18n.service';
import { TranslocoHttpLoaderService } from '@core/services/transloco-http-loader/transloco-http-loader.service';
import { DynamicRouteReuseStrategy } from '@core/strategies/dynamic-route-reuse.strategy';
import { pageFlickeringStrategy } from '@core/strategies/page-flickering.strategy';
import { environment } from '@environments/environment';
import { translocoConfig, TRANSLOCO_CONFIG, TRANSLOCO_LOADER } from '@ngneat/transloco';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

export function googleRecaptchaFactory(configurationService: ConfigurationService): string {
  return configurationService.configurationData.googleRecaptchaSiteKey;
}

export const translocoConfigProvider = {
  provide: TRANSLOCO_CONFIG,
  useValue: translocoConfig({
    ...environment.i18n,
    reRenderOnLangChange: true,
    prodMode: environment.production,
  }),
};

export const translocoLoaderProvider = {
  provide: TRANSLOCO_LOADER,
  useClass: TranslocoHttpLoaderService,
};

export const configurationProvider = {
  provide: APP_INITIALIZER,
  useFactory: ConfigurationService.factory,
  multi: true,
  deps: [
    ConfigurationService,
  ],
};

export const i18nProvider = {
  provide: APP_INITIALIZER,
  useFactory: I18nService.factory,
  multi: true,
  deps: [
    I18nService,
  ],
};

export const googleAnalyticsProvider = {
  provide: APP_INITIALIZER,
  useFactory: GoogleAnalyticsService.factory,
  multi: true,
  deps: [
    GoogleAnalyticsService,
  ],
};

export const googleRecaptchaProvider = {
  provide: RECAPTCHA_V3_SITE_KEY,
  useFactory: (configurationService: ConfigurationService): string => (
    configurationService.configurationData.googleRecaptchaSiteKey),
  deps: [ConfigurationService],
};

export const pageFlickeringProvider = {
  provide: APP_INITIALIZER,
  useFactory: pageFlickeringStrategy,
  multi: true,
  deps: [PLATFORM_ID],
};

export const routeReuseProvider = {
  provide: RouteReuseStrategy,
  useClass: DynamicRouteReuseStrategy,
};

export const providers = [
  configurationProvider,
  i18nProvider,
  googleAnalyticsProvider,
  googleRecaptchaProvider,
  pageFlickeringProvider,
  routeReuseProvider,
  translocoConfigProvider,
  translocoLoaderProvider,
];
