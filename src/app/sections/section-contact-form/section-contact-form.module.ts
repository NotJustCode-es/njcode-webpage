import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { SectionContactFormComponent } from './section-contact-form.component';
import { AlertModule } from '../../components/alert/alert.module';

@NgModule({
  declarations: [
    SectionContactFormComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useFactory: (configurationService: ConfigurationService): string => (
        configurationService.data.google_recaptcha_site_key),
      deps: [ConfigurationService],
    },
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
