import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { providers } from '@core/providers/providers';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  providers,
  exports: [
    TranslocoModule,
    HttpClientModule,
  ],
})
export class CoreModule { }
