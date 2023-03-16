import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PluginsService } from '@services/plugins/plugins.service';
import { ScriptsService } from '@services/scripts/scripts.service';

describe('PluginsService', () => {
  let service: PluginsService;
  let scriptsService: ScriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginsService);
    scriptsService = TestBed.inject(ScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loadPlugins', () => {
    it('should call #removeScript and #createScript', fakeAsync(() => {
      spyOn(scriptsService, 'removeScript');
      spyOn(scriptsService, 'createScript');
      service.loadPlugins();
      tick(500);
      expect(scriptsService.removeScript).toHaveBeenCalled();
      expect(scriptsService.createScript).toHaveBeenCalled();
    }));
  });
});
