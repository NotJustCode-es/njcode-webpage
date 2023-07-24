import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionReviewComponent } from '@sections/section-review/section-review.component';

@NgModule({
  declarations: [
    SectionReviewComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionReviewComponent,
  ],
})
export class SectionReviewModule {
  static component = SectionReviewComponent;
}
