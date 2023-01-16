import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setLoading', () => {
    it('should set loading$ to true', () => {
      service.setLoading(true);
      service.isLoading().subscribe(loading => {
        expect(loading).toBeTrue();
      });
    });

    it('should set loading$ to false', () => {
      service.setLoading(false);
      service.isLoading().subscribe(loading => {
        expect(loading).toBeFalse();
      });
    });
  });

  describe('#isLoading', () => {
    it('should return false on setLoading(false)', () => {
      service.setLoading(false);
      service.isLoading().subscribe(loading => {
        expect(loading).toBeFalse();
      });
    });
  });
});
