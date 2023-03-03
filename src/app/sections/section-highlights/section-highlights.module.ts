import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHighlightsComponent } from './section-highlights.component';

@NgModule({
  declarations: [
    SectionHighlightsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionHighlightsComponent,
  ],
})
export class SectionHighlightsModule {
  static component = SectionHighlightsComponent;
}
