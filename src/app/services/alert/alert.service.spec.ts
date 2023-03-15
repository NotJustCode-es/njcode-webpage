import { TestBed } from '@angular/core/testing';
import { AlertTypesEnum } from '@core/models/alert-types.enum';
import { AlertService } from './alert.service';

describe('NotificationsService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set message', () => {
    service.alert$.subscribe((value => { expect(value.message).toEqual('success'); }));
    service.setMessage('success');
  });

  it('should set type', () => {
    service.alert$.subscribe((value => { expect(value.type).toEqual(AlertTypesEnum.Success); }));
    service.setMessage(AlertTypesEnum.Success);
  });

  it('should clear message', () => {
    service.alert$.subscribe((value => { expect(value.message).toEqual(''); }));
    service.clearMessage();
  });
});
