import { TestBed } from '@angular/core/testing';

import { NotFoundInterceptor } from './not-found.interceptor';

describe('NotFoundInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotFoundInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NotFoundInterceptor = TestBed.inject(NotFoundInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
