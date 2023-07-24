import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowModule } from '@components/work-flow/work-flow.module';
import { SectionExplanationComponent } from '@sections/section-explanation/section-explanation.component';

@NgModule({
  declarations: [
    SectionExplanationComponent,
  ],
  imports: [
    CommonModule,
    WorkFlowModule,
  ],
  exports: [
    SectionExplanationComponent,
  ],
})
export class SectionExplanationModule {
  static component = SectionExplanationComponent;
}
