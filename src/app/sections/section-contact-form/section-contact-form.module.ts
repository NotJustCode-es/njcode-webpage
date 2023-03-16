import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@components/alert/alert.module';
import { SectionContactFormComponent } from '@sections/section-contact-form/section-contact-form.component';
import { RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
  declarations: [
    SectionContactFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    AlertModule,
  ],
  exports: [
    SectionContactFormComponent,
  ],
})
export class SectionContactFormModule {
  static component = SectionContactFormComponent;
}
