import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionStepsComponent } from '@sections/section-steps/section-steps.component';

@NgModule({
  declarations: [
    SectionStepsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionStepsComponent,
  ],
})
export class SectionStepsModule {
  static component = SectionStepsComponent;
}
