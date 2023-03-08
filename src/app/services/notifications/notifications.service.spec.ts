import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set success message', () => {
    service.successMessage$.subscribe((value => { expect(value).toEqual('success'); }));
    service.setSuccessMessage('success');
  });

  it('should set error message', () => {
    service.errorMessage$.subscribe((value => { expect(value).toEqual('error'); }));
    service.setErrorMessage('error');
  });

  it('should clear success message', () => {
    service.successMessage$.subscribe((value => { expect(value).toEqual(''); }));
    service.clearSuccessMessage();
  });

  it('should clear error message', () => {
    service.errorMessage$.subscribe((value => { expect(value).toEqual(''); }));
    service.clearErrorMessage();
  });
});
