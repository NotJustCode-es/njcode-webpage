import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';
import { TestComponent } from '@shared/testing/components/test.component';
import { DocumentStub } from '@shared/testing/stubs/document.stub';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';
import { i18nRoutes } from '../models/i18n-routes';
import { RoutesEnum } from '../models/routes.enum';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;
  let documentStub: DocumentStub;
  let router: Router;

  function createTestLocation(pathname: string): void {
    documentStub.testLocation = {
      pathname,
    } as Location;
  }

  beforeEach(() => {
    documentStub = new DocumentStub();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(i18nRoutes([{
          path: RoutesEnum.Dynamic,
          component: TestComponent,
        }])),
        getTranslocoTestingModule(),
      ],
      providers: [
        {
          provide: DOCUMENT,
          useValue: documentStub,
        },
      ],
    });
    service = TestBed.inject(I18nService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#defaultLanguage', () => {
    it('should return the default language', () => {
      const defaultLanguage = environment.i18n.defaultLang;
      expect(service.defaultLanguage).toEqual(defaultLanguage);
    });
  });

  describe('#availableLanguages', () => {
    it('should return the available languages', () => {
      const availableLanguages = environment.i18n.availableLangs;
      expect(service.availableLanguages).toEqual(availableLanguages);
    });
  });

  describe('#languageByUrlPath', () => {
    it('should return the language by URL path', () => {
      const testLanguage = environment.i18n.availableLangs[0];
      createTestLocation(`/${testLanguage}`);
      expect(service.languageByUrlPath).toBe(testLanguage);
    });

    it('#should return the default language if the URL path does not contain a language', () => {
      createTestLocation('/');
      expect(service.languageByUrlPath).toBe(service.defaultLanguage);
    });
  });

  describe('#urlWithoutLanguage', () => {
    it('should return the URL without the language', () => {
      const testLanguage = environment.i18n.availableLangs[0];
      const testPath = '/test';
      createTestLocation(`/${testLanguage}${testPath}`);
      expect(service.urlWithoutLanguage).toBe(testPath);
    });

    it('should return the default root path if the URL does not contain a language', () => {
      createTestLocation('/');
      expect(service.urlWithoutLanguage).toBe(service.defaultRootPath);
    });

    it('should return the default root path if location has no pathname', () => {
      createTestLocation('');
      expect(service.urlWithoutLanguage).toBe(service.defaultRootPath);
    });
  });

  describe('#activeLanguage', () => {
    it('should return the active language', () => {
      const defaultLanguage = environment.i18n.defaultLang;
      expect(service.activeLanguage).toBe(defaultLanguage);
    });
  });

  describe('#factory', () => {
    it('call factory should call init method', () => {
      spyOn(service, 'init');
      I18nService.factory(service)();
      expect(service.init).toHaveBeenCalled();
    });
  });

  describe('#init', () => {
    beforeEach(() => {
      createTestLocation('/');
    });

    it('should call #setLanguageSubscriptions', () => {
      spyOn(service, 'setLanguageSubscriptions');
      service.init();
      expect(service.setLanguageSubscriptions).toHaveBeenCalled();
    });

    it('should call #setActiveLanguage', () => {
      spyOn(service, 'setActiveLanguage');
      service.init();
      expect(service.setActiveLanguage).toHaveBeenCalled();
    });
  });

  describe('#setActiveLanguage', () => {
    it('should set the active language', () => {
      const newLanguage = environment.i18n.defaultLang;
      service.setActiveLanguage(newLanguage);
      expect(service.activeLanguage).toBe(newLanguage);
    });

    it('should not set the active language if the language is not available', () => {
      createTestLocation('/');
      const newLanguage = 'invalidLanguage';
      service.setActiveLanguage(newLanguage);
      expect(service.activeLanguage).not.toBe(newLanguage);
    });
  });

  describe('#handleRouterEvent', () => {
    beforeEach(() => {
      createTestLocation('/');
    });

    it('router event without language should navigate to path with language', async () => {
      const testUrl = '/test';
      service.init();
      await router.navigateByUrl(testUrl);
      expect(router.url).toBe(`/${service.activeLanguage}${testUrl}`);
    });

    it('router event with available language should navigate to path with that language', async () => {
      const testLanguage = environment.i18n.availableLangs[0];
      const testUrl = `/${testLanguage}/test`;
      service.init();
      await router.navigateByUrl(testUrl);
      expect(router.url).toBe(testUrl);
    });

    it('router event to default root path should return active language path', async () => {
      service.init();
      await router.navigate(['']);
      expect(router.url).toBe(`/${service.activeLanguage}`);
    });
  });
});
