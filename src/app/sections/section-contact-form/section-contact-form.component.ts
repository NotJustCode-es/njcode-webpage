import {
  ChangeDetectionStrategy, Component, Input, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeSection__contact__formFields } from '@server/models/contentful-content-types/section-contact-form';
import { ContactService } from '@services/contact/contact.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import {
  Subject, switchMap,
} from 'rxjs';

@Component({
  selector: 'app-section-contact-form',
  templateUrl: './section-contact-form.component.html',
  styleUrls: ['./section-contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContactFormComponent implements OnInit {
  @Input() data!: TypeSection__contact__formFields;

  destroy$: Subject<boolean> = new Subject<boolean>();

  private readonly text = '[a-z A-Z]*';

  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {}

  ngOnInit(): void {
    this.initializeContactForm();
  }

  isFormControlInvalid(formControlName: string): boolean | undefined {
    return this.contactForm.get(formControlName)?.invalid && (this.contactForm.get(formControlName)?.dirty || this.contactForm.get(formControlName)?.touched);
  }

  get fullName(): string {
    const firstName = this.contactForm.get('firstName')?.value;
    return firstName.concat(' ', this.contactForm.get('lastName')?.value);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
    }
    this.recaptchaV3Service.execute('sendMail')
      .pipe(
        switchMap(token => this.contactService.sendMail(
          this.fullName,
          this.contactForm.get('email')?.value,
          this.contactForm.get('message')?.value,
          token,
        )),
      )
      .subscribe();
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
