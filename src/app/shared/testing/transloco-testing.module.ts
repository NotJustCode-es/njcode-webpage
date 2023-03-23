import { ModuleWithProviders } from '@angular/core';
import { environment } from '@environments/environment';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import en from 'src/assets/i18n/en.json';
import es from 'src/assets/i18n/es.json';

export function getTranslocoTestingModule(options: TranslocoTestingOptions = {}): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: { en, es },
    translocoConfig: {
      ...environment.i18n,
    },
    preloadLangs: true,
    ...options,
  });
}
