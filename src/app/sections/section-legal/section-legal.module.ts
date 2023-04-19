import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionLegalComponent } from './section-legal.component';

@NgModule({
  declarations: [
    SectionLegalComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionLegalComponent,
  ],
})
export class SectionLegalModule {
  static component = SectionLegalComponent;
}
