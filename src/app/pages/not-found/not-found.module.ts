import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundRoutingModule } from '@pages/not-found/not-found-routing.module';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
  ],
})
export class NotFoundModule {}
