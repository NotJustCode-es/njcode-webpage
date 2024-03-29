import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinkModule } from '@components/link/link.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NotFoundRoutingModule } from '@pages/not-found/not-found-routing.module';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    TranslocoModule,
    LinkModule,
  ],
})
export class NotFoundModule {}
