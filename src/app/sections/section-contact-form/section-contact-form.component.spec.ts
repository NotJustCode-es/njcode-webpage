import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionContactFormComponent } from '@sections/section-contact-form/section-contact-form.component';
import { TypeSection__contact__formFields } from '@server/models/contentful-content-types/section-contact-form';
import { ContactService } from '@services/contact/contact.service';
import { NotificationsService } from '@services/notifications/notifications.service';
import { ReCaptchaV3ServiceStub } from '@shared/testing/stubs/recaptcha-v3-service.stub';
import { createTestEntry } from '@shared/testing/utils/contentful.utils';
import { RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { of } from 'rxjs';

const testFields = {
  name: 'test',
  label: 'test',
  placeholder: 'test',
  validFeedback: 'test',
  invalidRequiredFeedback: 'test',
  invalidSizeFeedback: 'test',
  invalidPatternFeedback: 'test',
};

const contentfulResponse: TypeSection__contact__formFields = {
  name: 'test',
  title: 'test',
  subtitle: 'test',
  requiredExplanation: 'test',
  submitButton: 'test',
  firstNameEntry: createTestEntry(testFields),
  lastNameEntry: createTestEntry(testFields),
  mailEntry: createTestEntry(testFields),
  messageEntry: createTestEntry(testFields),
  successfullySend: 'test',
  errorSend: 'test',
};

const formTestValues = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'test@test.com',
  message: 'test message',
};

describe('SectionContactFormComponent', () => {
  let component: SectionContactFormComponent;
  let fixture: ComponentFixture<SectionContactFormComponent>;
  let fakeContactService: ContactService;
  let notificationsService: NotificationsService;
  let fakeRecaptcha: ReCaptchaV3Service;
  let controller: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RecaptchaModule,
      ],
      providers: [
        {
          provide: ReCaptchaV3Service,
          useClass: ReCaptchaV3ServiceStub,
        },

      ],
      declarations: [
        SectionContactFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionContactFormComponent);
    component = fixture.componentInstance;
    notificationsService = TestBed.inject(NotificationsService);
    fakeRecaptcha = TestBed.inject(ReCaptchaV3Service);
    fakeContactService = TestBed.inject(ContactService);
    controller = TestBed.inject(HttpTestingController);
    component.data = contentfulResponse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing inputs in form count', () => {
    const totalInputElements = 4;
    const form = fixture.debugElement.nativeElement.querySelector('#contact-form');
    const inputElements = form.querySelectorAll('input');
    expect(inputElements.length).toEqual(totalInputElements);
  });

  it('testing valid form', () => {
    const validValues = formTestValues;
    component.contactForm.setValue(validValues);
    expect(component.contactForm.valid).toBe(true);
  });

  it('testing notification service is called on success', () => {
    const okResponse = new Response(JSON.stringify('test'), {
      status: 201,
      statusText: 'OK',
    });
    fakeContactService.sendMail = jasmine.createSpy().and.returnValue(of(okResponse));
    fakeRecaptcha.execute = jasmine.createSpy().and.returnValue(of('test Token'));

    const spySubscribable = spyOn(notificationsService, 'setSuccessMessage');
    const validValues = formTestValues;
    component.contactForm.setValue(validValues);
    component.onSubmit();
    expect(spySubscribable).toHaveBeenCalled();
  });

  it('testing notification service is called on error', () => {
    const koResponse = new Response(JSON.stringify('test'), {
      status: 404,
      statusText: 'KO',
    });
    fakeRecaptcha.execute = jasmine.createSpy().and.returnValue(of('test Token'));
    const spySubscribable = spyOn(notificationsService, 'setErrorMessage');
    const validValues = formTestValues;
    component.contactForm.setValue(validValues);
    component.onSubmit();
    controller.expectOne(() => true).flush(koResponse);
    expect(spySubscribable).toHaveBeenCalled();
  });

  it('testing invalid form', () => {
    const invalidValues = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };
    component.contactForm.setValue(invalidValues);
    expect(component.contactForm.valid).toBe(false);
  });

  describe('firstName entry', () => {
    it('should be required', () => {
      expect(component.contactForm.get('firstName')?.hasValidator(Validators.required)).toBe(true);
    });

    it('should not accept numbers', () => {
      const invalidValues = {
        ...formTestValues,
        firstName: '123',
      };
      component.contactForm.setValue(invalidValues);
      expect(component.contactForm.get('firstName')?.hasError('pattern')).toBe(true);
    });

    it('should not accept non-alfabetical values', () => {
      const invalidValues = {
        ...formTestValues,
        firstName: '·¢#',
      };
      component.contactForm.setValue(invalidValues);
      expect(component.contactForm.get('firstName')?.hasError('pattern')).toBe(true);
    });
  });
  describe('lastName entry', () => {
    it('should be required', () => {
      expect(component.contactForm.get('lastName')?.hasValidator(Validators.required)).toBe(true);
    });

    it('should not accept numbers', () => {
      const invalidValues = {
        ...formTestValues,
        lastName: '123',
      };
      component.contactForm.setValue(invalidValues);
      expect(component.contactForm.get('lastName')?.hasError('pattern')).toBe(true);
    });

    it('should not accept non-alfabetical values', () => {
      const invalidValues = {
        ...formTestValues,
        lastName: '·¢#',
      };
      component.contactForm.setValue(invalidValues);
      expect(component.contactForm.get('lastName')?.hasError('pattern')).toBe(true);
    });
  });
  describe('email entry', () => {
    it('should be required', () => {
      expect(component.contactForm.get('email')?.hasValidator(Validators.required)).toBe(true);
    });

    it('should be an email', () => {
      expect(component.contactForm.get('email')?.hasValidator(Validators.email)).toBe(true);
    });
  });
  describe('message entry', () => {
    it('should be required', () => {
      expect(component.contactForm.get('message')?.hasValidator(Validators.required)).toBe(true);
    });
  });

  it('get full name', () => {
    component.contactForm.get('firstName')?.setValue(formTestValues.firstName);
    component.contactForm.get('lastName')?.setValue(formTestValues.lastName);
    expect(component.fullName).toEqual(`${formTestValues.firstName} ${formTestValues.lastName}`);
  });

  describe('onSubmit()', () => {
    it('should mark as touched on invalid data', () => {
      const invalidValues = {
        ...formTestValues,
        lastName: '123',
      };
      component.contactForm.setValue(invalidValues);
      component.onSubmit();
      expect(component.contactForm.touched).toBe(true);
    });

    it('should send mail on valid data', () => {
      fakeContactService.sendMail = jasmine.createSpy().and.returnValue(of({}));
      const validValues = formTestValues;
      component.contactForm.setValue(validValues);
      component.onSubmit();
      expect(fakeContactService.sendMail).toHaveBeenCalled();
    });
  });
});
