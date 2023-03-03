import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionProcessComponent } from './section-process.component';

@NgModule({
  declarations: [
    SectionProcessComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionProcessComponent,
  ],
})
export class SectionProcessModule {
  static component = SectionProcessComponent;
}
