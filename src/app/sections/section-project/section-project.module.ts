import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionProjectComponent } from '@sections/section-project/section-project.component';
import { LinkModule } from '@components/link/link.module';

@NgModule({
  declarations: [
    SectionProjectComponent,
  ],
  imports: [
    CommonModule,
    LinkModule,
  ],
  exports: [
    SectionProjectComponent,
  ],
})
export class SectionProjectModule {
  static component = SectionProjectComponent;
}
