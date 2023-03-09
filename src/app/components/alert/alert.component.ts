import {
  ChangeDetectionStrategy, Component,
} from '@angular/core';
import { AlertService } from '@services/alert/alert.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  private msBeforeClearing = 5000;

  message$ = this.alertService.message$.pipe(
    tap(() => {
      setTimeout(() => {
        this.alertService.clearMessage();
      }, this.msBeforeClearing);
    }),
  );

  alert$ = this.alertService.alert$;

  constructor(
    private alertService: AlertService,
  ) {}
}
