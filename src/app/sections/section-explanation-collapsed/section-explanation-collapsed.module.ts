import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionExplanationCollapsedComponent } from '@sections/section-explanation-collapsed/section-explanation-collapsed.component';
import { LinkModule } from '@components/link/link.module';

@NgModule({
  declarations: [
    SectionExplanationCollapsedComponent,
  ],
  imports: [
    CommonModule,
    LinkModule,
  ],
  exports: [
    SectionExplanationCollapsedComponent,
  ],
})
export class SectionExplanationCollapsedModule {
  static component = SectionExplanationCollapsedComponent;
}
