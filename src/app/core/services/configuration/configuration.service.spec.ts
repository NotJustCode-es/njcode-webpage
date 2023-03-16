import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import { createTestClientConfiguration } from '@shared/testing/utils/configuration.utils';
import { Observable, switchMap } from 'rxjs';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ConfigurationService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#factory', () => {
    it('call factory should call load method', () => {
      spyOn(service, 'load').and.returnValue(new Observable<ClientConfiguration>());
      ConfigurationService.factory(service)();
      expect(service.load).toHaveBeenCalled();
    });
  });

  describe('http request', () => {
    it('should have correct config', () => {
      service.load().subscribe(value => {
        expect(value).toBeTruthy();
      });
      controller.expectOne(
        { method: 'GET', url: '/api/configurations/' },
      );
    });
  });

  describe('getter', () => {
    it('configurationData should return clientConfiguration', () => {
      const response = createTestClientConfiguration();
      service.load().subscribe(clientConfiguration => {
        expect(service.configurationData).toEqual(clientConfiguration);
      });
      controller.expectOne(() => true).flush(response);
    });

    it('configurationData$ should return clientConfiguration', () => {
      const response = createTestClientConfiguration();
      service.load()
        .pipe(
          switchMap(() => service.configurationData$),
        )
        .subscribe(
          configurationData => expect(configurationData).toEqual(response),
        );
      controller.expectOne(() => true).flush(response);
    });
  });
});
