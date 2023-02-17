import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__contact__formFields } from '@server/models/contentful-content-types/section-contact-form';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-section-contact-form',
  templateUrl: './section-contact-form.component.html',
  styleUrls: ['./section-contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContactFormComponent {
  @Input() data!: TypeSection__contact__formFields;

  private readonly text = '[a-zA-Z]*';

  private readonly email = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  contactForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(this.text), Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.pattern(this.text), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.pattern(this.email), Validators.maxLength(256)]],
    message: ['', [Validators.required, Validators.maxLength(256)]],
  }, { updateOn: 'blur' });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    // TO DO: call mail endpoint
    // eslint-disable-next-line no-console
    console.warn(this.contactForm.value);
  }
}
