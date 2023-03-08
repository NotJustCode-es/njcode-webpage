import {
  ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeSection__contact__formFields } from '@server/models/contentful-content-types/section-contact-form';
import { ContactService } from '@services/contact/contact.service';
import { NotificationsService } from '@services/notifications/notifications.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import {
  catchError,
  Subject, switchMap, takeUntil, tap, throwError,
} from 'rxjs';

@Component({
  selector: 'app-section-contact-form',
  templateUrl: './section-contact-form.component.html',
  styleUrls: ['./section-contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContactFormComponent implements OnInit, OnDestroy {
  @Input() data!: TypeSection__contact__formFields;

  destroy$: Subject<boolean> = new Subject<boolean>();

  private readonly text = '[a-z A-Z]*';

  private msBeforeClearing = 5000;

  successMessage$ = this.notificationsService.successMessage$.pipe(
    tap(() => {
      setTimeout(() => {
        this.notificationsService.clearErrorMessage();
      }, this.msBeforeClearing);
    }),
  );

  errorMessage$ = this.notificationsService.errorMessage$.pipe(
    tap(() => {
      setTimeout(() => {
        this.notificationsService.clearSuccessMessage();
      }, this.msBeforeClearing);
    }),
  );

  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private notificationsService: NotificationsService,
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
      return;
    }

    this.recaptchaV3Service.execute('sendMail')
      .pipe(
        takeUntil(this.destroy$),
        switchMap(token => this.contactService.sendMail(
          this.fullName,
          this.contactForm.get('email')?.value,
          this.contactForm.get('message')?.value,
          token,
        )),
        catchError(err => {
          this.notificationsService.setErrorMessage(this.data.errorSend);
          return throwError(() => new Error(err));
        }),
      )
      .subscribe(
        () => this.successSend(),
      );
  }

  private successSend():void {
    this.contactForm.reset();
    this.notificationsService.setSuccessMessage(this.data.successfullySend);
  }

  private initializeContactForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.text), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.pattern(this.text), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      message: ['', [Validators.required]],
    }, { updateOn: 'blur' });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
