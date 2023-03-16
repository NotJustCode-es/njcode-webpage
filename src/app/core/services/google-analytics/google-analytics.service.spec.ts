import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { ScriptsService } from '@services/scripts/scripts.service';
import { ConfigurationServiceStub } from '@shared/testing/stubs/configuration.stub';
import { Observable } from 'rxjs';
import { GoogleAnalyticsService } from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  let scriptService: ScriptsService;
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
    service = TestBed.inject(GoogleAnalyticsService);
    scriptService = TestBed.inject(ScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#factory', () => {
    it('call factory should call init method', () => {
      spyOn(service, 'init').and.returnValue(new Observable<void>());
      GoogleAnalyticsService.factory(service)();
      expect(service.init).toHaveBeenCalled();
    });
  });

  describe('#init', () => {
    it('should call #addUniversalAnalyticsScript', () => {
      spyOn(service, 'addUniversalAnalyticsScript');
      service.init().subscribe(() => {
        expect(service.addUniversalAnalyticsScript).toHaveBeenCalled();
      });
    });

    it('if #googleAnalyticsId is undefined should not call #addUniversalAnalyticsScript', () => {
      configurationServiceStub.configuration.googleAnalyticsId = '';
      spyOn(service, 'addUniversalAnalyticsScript');
      service.init().subscribe();
      expect(service.addUniversalAnalyticsScript).not.toHaveBeenCalled();
    });
  });

  describe('#addUniversalAnalyticsScript', () => {
    it('should call #createScript', () => {
      spyOn(scriptService, 'createScript');
      service.addUniversalAnalyticsScript(configurationServiceStub.configurationData.googleAnalyticsId);
      expect(scriptService.createScript).toHaveBeenCalled();
    });

    it('should call #createScriptWithBody', () => {
      spyOn(scriptService, 'createScriptWithBody');
      service.addUniversalAnalyticsScript(configurationServiceStub.configuration.googleAnalyticsId);
      expect(scriptService.createScriptWithBody).toHaveBeenCalled();
    });
  });
});
