import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { TranslocoHttpLoaderService } from '@core/services/transloco-http-loader/transloco-http-loader.service';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';

describe('TranslocoHttpLoaderService', () => {
  let service: TranslocoHttpLoaderService;
  let configurationServiceStub: ConfigurationServiceStub;

  beforeEach(() => {
    configurationServiceStub = new ConfigurationServiceStub();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ConfigurationService,
          useValue: configurationServiceStub,
        },
      ],
    });
    service = TestBed.inject(TranslocoHttpLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTranslation', () => {
    it('should return an Observable<Translation>', () => {
      const { defaultLang } = configurationServiceStub.configurationData.i18n;
      expect(service.getTranslation(defaultLang)).toBeTruthy();
    });
  });
});
