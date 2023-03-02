import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { SectionContactFormComponent } from './section-contact-form.component';

@NgModule({
  declarations: [
    SectionContactFormComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
  ],
  exports: [
    SectionContactFormComponent,
  ],
})
export class SectionContactFormModule {
  static component = SectionContactFormComponent;
}