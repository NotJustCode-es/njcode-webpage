import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, PLATFORM_ID } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { I18nService } from '@core/services/i18n/i18n.service';
import { TranslocoHttpLoaderService } from '@core/services/transloco-http-loader/transloco-http-loader.service';
import { DynamicRouteReuseStrategy } from '@core/strategies/dynamic-route-reuse.strategy';
import { pageFlickeringStrategy } from '@core/strategies/page-flickering.strategy';
import { environment } from '@environments/environment';
import {
  translocoConfig, TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER,
} from '@ngneat/transloco';

export function setupConfigurationServiceFactory(
  service: ConfigurationService,
): Function {
  return () => service.load();
}

@NgModule({
  exports: [
    TranslocoModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupConfigurationServiceFactory,
      deps: [
        ConfigurationService,
      ],
      multi: true,
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        ...environment.i18n,
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoaderService,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: I18nService.factory,
      multi: true,
      deps: [
        I18nService,
      ],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: pageFlickeringStrategy,
      multi: true,
      deps: [PLATFORM_ID],
    },
    {
      provide: RouteReuseStrategy,
      useClass: DynamicRouteReuseStrategy,
    },
  ],
})
export class CoreModule { }
