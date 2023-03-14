import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { AssetsService } from './assets.service';

describe('AssetsService', () => {
  let service: AssetsService;
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
