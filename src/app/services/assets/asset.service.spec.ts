import { TestBed } from '@angular/core/testing';
import { AssetService } from './asset.service';

describe('AssetServiceService', () => {
  let service: AssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetService);
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
