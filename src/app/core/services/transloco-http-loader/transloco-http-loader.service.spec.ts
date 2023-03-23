import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslocoHttpLoaderService } from '@core/services/transloco-http-loader/transloco-http-loader.service';
import { environment } from '@environments/environment';

describe('TranslocoHttpLoaderService', () => {
  let service: TranslocoHttpLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(TranslocoHttpLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTranslation', () => {
    it('should return an Observable<Translation>', () => {
      const { defaultLang } = environment.i18n;
      expect(service.getTranslation(defaultLang)).toBeTruthy();
    });
  });
});
