import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPostsComponent } from '@sections/section-posts/section-posts.component';
import { LinkModule } from '@components/link/link.module';

@NgModule({
  declarations: [
    SectionPostsComponent,
  ],
  imports: [
    CommonModule,
    LinkModule,
  ],
  exports: [
    SectionPostsComponent,
  ],
})
export class SectionPostsModule {
  static component = SectionPostsComponent;
}
