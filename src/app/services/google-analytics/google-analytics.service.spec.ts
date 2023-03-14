import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoogleAnalyticsService } from './google-analytics.service';
import { ScriptsService } from '../scripts/scripts.service';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  let scriptService: ScriptsService;
  let configurationServiceStub: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ConfigurationService,
          useClass: configurationServiceStub,
        },
      ],
    });
    service = TestBed.inject(GoogleAnalyticsService);
    scriptService = TestBed.inject(ScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#factory', () => {
    it('call factory should call init method', () => {
      spyOn(service, 'init');
      GoogleAnalyticsService.factory(service)();
      expect(service.init).toHaveBeenCalled();
    });
  });

  describe('#init', () => {
    it('should call #addUniversalAnalyticsScript', () => {
      spyOn(service, 'addUniversalAnalyticsScript');
      service.init();
      expect(service.addUniversalAnalyticsScript).toHaveBeenCalled();
    });

    it('if #googleAnalyticsId is undefined should not call #addUniversalAnalyticsScript', () => {
      spyOnProperty(service, 'googleAnalyticsId').and.returnValue(undefined);
      spyOn(service, 'addUniversalAnalyticsScript');
      service.init();
      expect(service.addUniversalAnalyticsScript).not.toHaveBeenCalled();
    });
  });

  describe('#addUniversalAnalyticsScript', () => {
    it('should call #createScript', () => {
      spyOn(scriptService, 'createScript');
      service.addUniversalAnalyticsScript();
      expect(scriptService.createScript).toHaveBeenCalled();
    });

    it('should call #createScriptWithBody', () => {
      spyOn(scriptService, 'createScriptWithBody');
      service.addUniversalAnalyticsScript();
      expect(scriptService.createScriptWithBody).toHaveBeenCalled();
    });
  });
});
