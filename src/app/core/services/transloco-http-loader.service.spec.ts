import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslocoHttpLoaderService } from './transloco-http-loader.service';

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
});
