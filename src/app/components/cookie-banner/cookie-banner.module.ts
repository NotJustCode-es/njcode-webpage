import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieBannerComponent } from '@components/cookie-banner/cookie-banner.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    CookieBannerComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
  ],
  exports: [
    CookieBannerComponent,
  ],
})
export class CookieBannerModule { }
