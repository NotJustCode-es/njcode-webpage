import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPostsComponent } from '@sections/section-posts/section-posts.component';

@NgModule({
  declarations: [
    SectionPostsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionPostsComponent,
  ],
})
export class SectionPostsModule {
  static component = SectionPostsComponent;
}
