import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicLoadDirective } from '@core/directives/dynamic-load/dynamic-load.directive';

@NgModule({
  declarations: [
    DynamicLoadDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DynamicLoadDirective,
  ],
})
export class DynamicLoadModule { }
