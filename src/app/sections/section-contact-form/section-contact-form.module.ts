import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { SectionContactFormComponent } from './section-contact-form.component';

@NgModule({
  declarations: [
    SectionContactFormComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.googleRecaptchaSiteKey,
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    NgbAlertModule,
  ],
  exports: [
    SectionContactFormComponent,
  ],
})
export class SectionContactFormModule {
  static component = SectionContactFormComponent;
}
