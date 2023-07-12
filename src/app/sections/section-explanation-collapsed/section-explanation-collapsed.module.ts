import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionExplanationCollapsedComponent } from '@sections/section-explanation-collapsed/section-explanation-collapsed.component';

@NgModule({
  declarations: [
    SectionExplanationCollapsedComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionExplanationCollapsedComponent,
  ],
})
export class SectionExplanationCollapsedModule {
  static component = SectionExplanationCollapsedComponent;
}
