import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionProjectsComponent } from './section-projects.component';

@NgModule({
  declarations: [
    SectionProjectsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionProjectsComponent,
  ],
})
export class SectionProjectsModule {
  static component = SectionProjectsComponent;
}
