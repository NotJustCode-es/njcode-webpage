import { DOCUMENT } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { i18nRoutes } from '@core/models/i18n-routes';
import { RoutesEnum } from '@core/models/routes.enum';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { I18nService } from '@core/services/i18n/i18n.service';
import { TestComponent } from '@shared/testing/components/test.component';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';
import { DocumentStub } from '@shared/testing/stubs/document.stub';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';
import { Observable } from 'rxjs';

describe('I18nService', () => {
  let service: I18nService;
  let configurationServiceStub: ConfigurationServiceStub;
  let documentStub: DocumentStub;
  let router: Router;

  function createTestLocation(pathname: string): void {
    documentStub.testLocation = {
      pathname,
    } as Location;
  }

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
    documentStub = new DocumentStub();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(i18nRoutes([{
          path: RoutesEnum.Dynamic,
          component: TestComponent,
        }])),
        getTranslocoTestingModule(),
      ],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
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
      const defaultLanguage = configurationServiceStub.configuration.i18n.defaultLang;
      expect(service.defaultLanguage).toEqual(defaultLanguage);
    });
  });

  describe('#availableLanguages', () => {
    it('should return the available languages', () => {
      const availableLanguages = configurationServiceStub.configuration.i18n.availableLangs;
      expect(service.availableLanguages).toEqual(availableLanguages);
    });
  });

  describe('#languageByUrlPath', () => {
    it('should return the language by URL path', () => {
      const testLanguage = configurationServiceStub.configuration.i18n.availableLangs[0];
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
      const testLanguage = configurationServiceStub.configuration.i18n.availableLangs[0];
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
      const defaultLanguage = configurationServiceStub.configuration.i18n.defaultLang;
      expect(service.activeLanguage).toBe(defaultLanguage);
    });
  });

  describe('#factory', () => {
    it('call factory should call init method', () => {
      spyOn(service, 'init').and.returnValue(new Observable<void>());
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
      service.init().subscribe(() => {
        expect(service.setLanguageSubscriptions).toHaveBeenCalled();
      });
    });

    it('should call #setActiveLanguage', () => {
      spyOn(service, 'setActiveLanguage');
      service.init().subscribe(() => {
        expect(service.setActiveLanguage).toHaveBeenCalled();
      });
    });
  });

  describe('#setActiveLanguage', () => {
    it('should set the active language', () => {
      const newLanguage = configurationServiceStub.configuration.i18n.defaultLang;
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
      service.init().subscribe();
      await router.navigateByUrl(testUrl);
      expect(router.url).toBe(`/${service.activeLanguage}${testUrl}`);
    });

    it('router event with available language should navigate to path with that language', async () => {
      const testLanguage = configurationServiceStub.configuration.i18n.availableLangs[0];
      const testUrl = `/${testLanguage}/test`;
      service.init().subscribe();
      await router.navigateByUrl(testUrl);
      expect(router.url).toBe(testUrl);
    });

    it('router event to default root path should return active language path', async () => {
      service.init().subscribe();
      await router.navigate(['']);
      expect(router.url).toBe(`/${service.activeLanguage}`);
    });
  });
});
