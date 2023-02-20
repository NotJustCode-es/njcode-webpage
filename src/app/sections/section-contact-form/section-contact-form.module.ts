import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SectionContactFormComponent } from './section-contact-form.component';

@NgModule({
  declarations: [
    SectionContactFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SectionContactFormComponent,
  ],
})
export class SectionContactFormModule {
  static component = SectionContactFormComponent;
}
