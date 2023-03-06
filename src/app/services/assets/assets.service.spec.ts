import { TestBed } from '@angular/core/testing';
import { AssetsService } from './assets.service';

describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getIconSolidPath', () => {
    it('should return icon path', () => {
      const icon = 'icon';
      expect(service.getIconSolidPath(icon)).toEqual(`${service.iconsSolidPath}/${icon}.svg`);
    });
  });
});
