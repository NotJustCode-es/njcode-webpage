import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContactFormComponent } from './section-contact-form.component';

@NgModule({
  declarations: [
    SectionContactFormComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionContactFormComponent,
  ],
})
export class SectionContactFormModule {
  static component = SectionContactFormComponent;
}
