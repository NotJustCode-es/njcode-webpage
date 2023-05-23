import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '@components/link/link.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LinkComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
  ],
  exports: [
    LinkComponent,
  ],
})
export class LinkModule { }
