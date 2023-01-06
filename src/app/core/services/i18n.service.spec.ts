import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        getTranslocoTestingModule(),
      ],
    });
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
