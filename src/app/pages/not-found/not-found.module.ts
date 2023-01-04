import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { DynamicLoadModule } from '@core/directives/dynamic-load/dynamic-load.module';
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
