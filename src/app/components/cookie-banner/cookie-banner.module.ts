import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieBannerComponent } from '@components/cookie-banner/cookie-banner.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CookieBannerComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
  ],
  exports: [
    CookieBannerComponent,
  ],
})
export class CookieBannerModule { }
