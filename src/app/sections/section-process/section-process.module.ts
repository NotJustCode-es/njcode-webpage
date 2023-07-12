import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowModule } from '@components/work-flow/work-flow.module';
import { SectionProcessComponent } from '@sections/section-process/section-process.component';

@NgModule({
  declarations: [
    SectionProcessComponent,
  ],
  imports: [
    CommonModule,
    WorkFlowModule,
  ],
  exports: [
    SectionProcessComponent,
  ],
})
export class SectionProcessModule {
  static component = SectionProcessComponent;
}
