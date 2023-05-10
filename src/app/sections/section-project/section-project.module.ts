import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionProjectComponent } from '@sections/section-project/section-project.component';

@NgModule({
  declarations: [
    SectionProjectComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionProjectComponent,
  ],
})
export class SectionProjectModule {
  static component = SectionProjectComponent;
}
