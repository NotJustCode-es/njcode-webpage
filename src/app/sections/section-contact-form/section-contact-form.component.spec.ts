import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeSection__contact__formFields } from '@server/models/contentful-content-types/section-contact-form';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { ContactService } from '@services/contact/contact.service';
import { ConfigService } from '@nestjs/config';
import { SectionContactFormComponent } from './section-contact-form.component';

describe('SectionContactFormComponent', () => {
  let component: SectionContactFormComponent;
  let fixture: ComponentFixture<SectionContactFormComponent>;
  let service: ContactService;
  let configService: ConfigService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Validators,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: configService.get('GOOGLE_RECAPTCHA_SITE_KEY') }],
      imports: [RecaptchaV3Module, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [SectionContactFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionContactFormComponent);
    component = fixture.componentInstance;
    configService = TestBed.inject(ConfigService);
    service = TestBed.inject(ContactService);
    const resp: TypeSection__contact__formFields = {
      name: 'test',
      title: 'test',
      subtitle: 'test',
      requiredExplanation: 'test',
      submitButton: 'test',
      firstNameEntry: {
        sys: {
          id: '1',
          type: 'Entry',
          createdAt: '2021-03-01T12:00:00.000Z',
          updatedAt: '2021-03-01T12:00:00.000Z',
          revision: 0,
          space: {
            sys: {
              id: '1',
              linkType: 'Space',
              type: 'Link',
            },
          },
          environment: {
            sys: {
              id: 'master',
              linkType: 'Environment',
              type: 'Link',
            },
          },
          contentType: {
            sys: {
              id: 'test-section',
              type: 'Link',
              linkType: 'ContentType',
            },
          },
        },
        metadata: {
          tags: [],
        },
        fields: {
          name: 'test',
          label: 'test',
          placeholder: 'test',
          validFeedback: 'test',
          invalidRequiredFeedback: 'test',
          invalidSizeFeedback: 'test',
          invalidPatternFeedback: 'test',
        },
      },
      lastNameEntry: {
        sys: {
          id: '1',
          type: 'Entry',
          createdAt: '2021-03-01T12:00:00.000Z',
          updatedAt: '2021-03-01T12:00:00.000Z',
          revision: 0,
          space: {
            sys: {
              id: '1',
              linkType: 'Space',
              type: 'Link',
            },
          },
          environment: {
            sys: {
              id: 'master',
              linkType: 'Environment',
              type: 'Link',
            },
          },
          contentType: {
            sys: {
              id: 'test-section',
              type: 'Link',
              linkType: 'ContentType',
            },
          },
        },
        metadata: {
          tags: [],
        },
        fields: {
          name: 'test',
          label: 'test',
          placeholder: 'test',
          validFeedback: 'test',
          invalidRequiredFeedback: 'test',
          invalidSizeFeedback: 'test',
          invalidPatternFeedback: 'test',
        },
      },
      mailEntry: {
        sys: {
          id: '1',
          type: 'Entry',
          createdAt: '2021-03-01T12:00:00.000Z',
          updatedAt: '2021-03-01T12:00:00.000Z',
          revision: 0,
          space: {
            sys: {
              id: '1',
              linkType: 'Space',
              type: 'Link',
            },
          },
          environment: {
            sys: {
              id: 'master',
              linkType: 'Environment',
              type: 'Link',
            },
          },
          contentType: {
            sys: {
              id: 'test-section',
              type: 'Link',
              linkType: 'ContentType',
            },
          },
        },
        metadata: {
          tags: [],
        },
        fields: {
          name: 'test',
          label: 'test',
          placeholder: 'test',
          validFeedback: 'test',
          invalidRequiredFeedback: 'test',
          invalidSizeFeedback: 'test',
          invalidPatternFeedback: 'test',
        },
      },
      messageEntry: {
        sys: {
          id: '1',
          type: 'Entry',
          createdAt: '2021-03-01T12:00:00.000Z',
          updatedAt: '2021-03-01T12:00:00.000Z',
          revision: 0,
          space: {
            sys: {
              id: '1',
              linkType: 'Space',
              type: 'Link',
            },
          },
          environment: {
            sys: {
              id: 'master',
              linkType: 'Environment',
              type: 'Link',
            },
          },
          contentType: {
            sys: {
              id: 'test-section',
              type: 'Link',
              linkType: 'ContentType',
            },
          },
        },
        metadata: {
          tags: [],
        },
        fields: {
          name: 'test',
          label: 'test',
          placeholder: 'test',
          validFeedback: 'test',
          invalidRequiredFeedback: 'test',
          invalidSizeFeedback: 'test',
          invalidPatternFeedback: 'test',
        },
      },
    };
    component.data = resp;
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
    const validValues = {
      firstName: 'marc',
      lastName: 'torres torres',
      email: 'marctt@gmail.com',
      message: 'hola que tal',
    };
    component.contactForm.setValue(validValues);
    expect(component.contactForm.valid).toBe(true);
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
        firstName: '123',
        lastName: 'torres torres',
        email: 'marctt@gmail.com',
        message: 'hola que tal',
      };
      component.contactForm.setValue(invalidValues);
      expect(component.contactForm.get('firstName')?.hasError('pattern')).toBe(true);
    });

    it('should not accept non-alfabetical values', () => {
      const invalidValues = {
        firstName: '·¢#',
        lastName: 'torres torres',
        email: 'marctt@gmail.com',
        message: 'hola que tal',
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
        firstName: 'marc',
        lastName: '123',
        email: 'marctt@gmail.com',
        message: 'hola que tal',
      };
      component.contactForm.setValue(invalidValues);
      expect(component.contactForm.get('lastName')?.hasError('pattern')).toBe(true);
    });

    it('should not accept non-alfabetical values', () => {
      const invalidValues = {
        firstName: 'marc',
        lastName: '·¢#',
        email: 'marctt@gmail.com',
        message: 'hola que tal',
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
    component.contactForm.get('firstName')?.setValue('marc');
    component.contactForm.get('lastName')?.setValue('torres torres');
    expect(component.fullName).toEqual('marc torres torres');
  });

  describe('onSubmit()', () => {
    it('should mark as touched on invalid data', () => {
      const invalidValues = {
        firstName: 'marc',
        lastName: '123',
        email: 'marctt@gmail.com',
        message: 'hola que tal',
      };
      component.contactForm.setValue(invalidValues);
      component.onSubmit();
      expect(component.contactForm.touched).toBe(true);
    });
    // Err
    it('should send mail on valid data', () => {
      const spySubscribable = spyOn(service, 'sendMail');
      const validValues = {
        firstName: 'marc',
        lastName: 'torres',
        email: 'marctt@gmail.com',
        message: 'hola que tal',
      };
      component.contactForm.setValue(validValues);
      component.onSubmit();
      expect(component.contactForm.valid).toBe(true);
      expect(spySubscribable).toHaveBeenCalled();
    });
  });
});
