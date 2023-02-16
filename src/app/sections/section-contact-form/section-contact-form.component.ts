import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__contact__formFields } from '@server/models/contentful-content-types/section-contact-form';

@Component({
  selector: 'app-section-contact-form',
  templateUrl: './section-contact-form.component.html',
  styleUrls: ['./section-contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContactFormComponent {
  @Input() data!: TypeSection__contact__formFields;
}
