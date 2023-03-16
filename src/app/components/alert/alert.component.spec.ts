import {
  ComponentFixture, fakeAsync, TestBed, tick,
} from '@angular/core/testing';
import { AlertComponent } from '@components/alert/alert.component';
import { AlertService } from '@services/alert/alert.service';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    alertService = TestBed.inject(AlertService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear message after alertClearDelay time', fakeAsync(() => {
    spyOn(alertService, 'clearMessage');
    alertService.setMessage('test');
    component.alert$.subscribe();
    tick(component.alertClearDelay);
    expect(alertService.clearMessage).toHaveBeenCalled();
  }));
});
