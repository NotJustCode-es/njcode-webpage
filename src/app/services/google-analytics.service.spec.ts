import { TestBed } from '@angular/core/testing';
import { GoogleAnalyticsService } from './google-analytics.service';
import { ScriptService } from './script.service';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  let scriptService: ScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAnalyticsService);
    scriptService = TestBed.inject(ScriptService);
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
