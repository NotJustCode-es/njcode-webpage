import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicLoadModule } from '@core/directives/dynamic-load/dynamic-load.module';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    DynamicLoadModule,
  ],
})
export class NotFoundModule { }
