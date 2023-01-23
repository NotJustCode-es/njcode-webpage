import { APP_INITIALIZER, NgModule } from '@angular/core';
import { I18nService } from '@core/services/i18n/i18n.service';
import { TranslocoHttpLoaderService } from '@core/services/transloco-http-loader/transloco-http-loader.service';
import { environment } from '@environments/environment';
import {
  translocoConfig, TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER,
} from '@ngneat/transloco';

@NgModule({
  exports: [
    TranslocoModule,
  ],
  providers: [
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
  ],
})
export class CoreModule { }
