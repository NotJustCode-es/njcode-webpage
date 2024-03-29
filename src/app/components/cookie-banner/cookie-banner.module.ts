import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieBannerComponent } from '@components/cookie-banner/cookie-banner.component';
import { TranslocoModule } from '@ngneat/transloco';
import { LinkModule } from '@components/link/link.module';

@NgModule({
  declarations: [
    CookieBannerComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    LinkModule,
  ],
  exports: [
    CookieBannerComponent,
  ],
})
export class CookieBannerModule { }
