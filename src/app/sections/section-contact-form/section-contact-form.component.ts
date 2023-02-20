import {
  ChangeDetectionStrategy, Component, Input, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeSection__contact__formFields } from '@server/models/contentful-content-types/section-contact-form';

@Component({
  selector: 'app-section-contact-form',
  templateUrl: './section-contact-form.component.html',
  styleUrls: ['./section-contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContactFormComponent implements OnInit {
  @Input() data!: TypeSection__contact__formFields;

  private readonly text = '[a-z A-Z]*';

  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeContactForm();
  }

  isFormControlInvalid(formControlName: string): boolean | undefined {
    return this.contactForm.get(formControlName)?.invalid && (this.contactForm.get(formControlName)?.dirty || this.contactForm.get(formControlName)?.touched);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    // TODO: call mail endpoint
    // eslint-disable-next-line no-console
    console.warn(this.contactForm.value);
  }

  private initializeContactForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.text), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.pattern(this.text), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      message: ['', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
