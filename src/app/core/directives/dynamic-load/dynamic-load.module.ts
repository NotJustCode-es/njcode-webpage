import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicLoadDirective } from './dynamic-load.directive';

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
