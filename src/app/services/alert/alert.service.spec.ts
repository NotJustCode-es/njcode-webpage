import { TestBed } from '@angular/core/testing';
import { AlertsEnum } from '@core/models/alerts.enum';

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
    service.alert$.subscribe((value => { expect(value.type).toEqual(AlertsEnum.Success); }));
    service.setMessage(AlertsEnum.Success);
  });

  it('should clear message', () => {
    service.alert$.subscribe((value => { expect(value.message).toEqual(''); }));
    service.clearMessage();
  });
});
