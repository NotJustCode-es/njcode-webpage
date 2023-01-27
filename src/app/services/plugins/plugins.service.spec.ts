import { TestBed } from '@angular/core/testing';
import { PluginsService } from '@services/plugins/plugins.service';

describe('PluginsService', () => {
  let service: PluginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
