import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { environment } from '@environments/environment';
import {
  translocoConfig, TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER,
} from '@ngneat/transloco';
import { I18nService } from './services/i18n.service';
import { TranslocoHttpLoader } from './services/transloco-http-loader.service';

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
        prodMode: !isDevMode(),
      }),
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader,
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
